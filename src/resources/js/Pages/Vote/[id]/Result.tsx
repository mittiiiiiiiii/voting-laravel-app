import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import axios from "axios";

export default function ResultPage() {
	type Result = {
		choice: string;
		votes: number;
		fill: string;
	};

	type Theme = {
		id: number;
		title: string;
		choices: Array<{ id: number; text: string }>;
	};

	const { theme, results, userChoice, choices } = usePage<{
		theme: Theme;
		results: Result[];
		userChoice: string | null;
		choices: Array<{ id: number; text: string }>;
	}>().props;

	// コメントフォームの状態
	const [commentContent, setCommentContent] = useState("");
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [replyTo, setReplyTo] = useState<number | null>(null);

	type Comment = {
		id: number;
		user: { id: number; name: string } | null;
		content: string;
		is_anonymous: boolean;
		is_deleted: boolean;
		created_at: string;
		replies: Comment[];
	};

	const [comments, setComments] = useState<Comment[]>([]);
	const [loadingComments, setLoadingComments] = useState(true);

	useEffect(() => {
		setLoadingComments(true);
		axios
			.get(`/comments?theme_id=${theme.id}`)
			.then((res) => {
				setComments(res.data);
			})
			.catch(() => setComments([]))
			.finally(() => setLoadingComments(false));
	}, [theme.id]);

	const barColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
	const pieColors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c2c2f0"];

	const resultsWithColors = results.map((result, index) => ({
		...result,
		fill: barColors[index % barColors.length],
	}));

	const pieResultsWithColors = results
		.filter((result) => result.votes > 0)
		.map((result, index) => ({
			...result,
			fill: pieColors[index % pieColors.length],
		}));

	const renderCustomLabel = (entry: Result) => {
		return `${entry.choice}: ${entry.votes}`;
	};

	// 時間があればWebSocketに変更したい
	useEffect(() => {
		const interval = setInterval(() => {
			router.reload();
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	const handleHome = () => {
		router.get("/vote/top");
	};

	const handleCommentSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!commentContent.trim()) return;

		// フロントエンドのみなので、コンソールに出力
		console.log("コメント送信:", {
			content: commentContent,
			is_anonymous: isAnonymous,
			theme_id: theme.id,
			parent_id: replyTo,
			user_choice: userChoice
		});

		// フォームをリセット
		setCommentContent("");
		setIsAnonymous(false);
		setReplyTo(null);
	};

	// コメント表示用コンポーネント
	const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
		<div className={`mb-4 ml-${depth * 6}`}>
			<div className="flex items-center gap-2">
				<span className="font-semibold text-gray-800 text-sm">
					{comment.is_anonymous ? "匿名" : comment.user?.name ?? "(不明)"}
				</span>
				<span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleString()}</span>
			</div>
			<div className="mt-1 text-gray-700 text-sm">
				{comment.is_deleted ? <span className="italic text-gray-400">(削除済み)</span> : comment.content}
			</div>
			{/* リプライ（子コメント） */}
			{comment.replies && comment.replies.length > 0 && (
				<div className="mt-2 border-l-2 border-gray-200 pl-4">
					{comment.replies.map((reply) => (
						<CommentItem key={reply.id} comment={reply} depth={depth + 1} />
					))}
				</div>
			)}
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
			<h1 className="text-center text-2xl font-bold mb-6">
				{theme.title} の投票結果
			</h1>
			{userChoice && (
				<div className="my-4 text-lg text-center text-gray-700">
					<p>
						あなたが投票した選択肢:{" "}
						<strong className="text-blue-700">{userChoice}</strong>
					</p>
				</div>
			)}
			<div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full mb-8">
				<BarChart
					width={600}
					height={400}
					data={resultsWithColors}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="choice" />
					<YAxis allowDecimals={false} />
					<Tooltip />
					<Legend />
					<Bar
						dataKey="votes"
						name="投票数"
						isAnimationActive={true}
						label={{ position: "top" }}
					/>
				</BarChart>
				<PieChart width={450} height={450}>
					<Pie
						data={pieResultsWithColors}
						dataKey="votes"
						nameKey="choice"
						cx="50%"
						cy="50%"
						outerRadius={150}
						fill="#8884d8"
						label={renderCustomLabel}
					>
						{pieResultsWithColors.map((entry) => (
							<Cell key={entry.choice} fill={entry.fill} />
						))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</div>
			<div className="flex gap-2 mt-4 justify-center">
				<button
					type="button"
					className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition"
					onClick={handleHome}
				>
					トップページに戻る
				</button>
			</div>

			{/* コメント投稿フォーム */}
			<div className="bg-white rounded-lg shadow-sm p-6 mb-6 max-w-2xl mx-auto w-full">
				<form onSubmit={handleCommentSubmit}>
					{replyTo && (
						<div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
							<p className="text-sm text-blue-700">
								コメント #{replyTo} に返信しています
								<button
									type="button"
									onClick={() => setReplyTo(null)}
									className="ml-2 text-blue-500 hover:text-blue-700 underline"
								>
									キャンセル
								</button>
							</p>
						</div>
					)}

					<div className="mb-4">
						<label htmlFor="comment-content" className="block text-sm font-medium text-gray-700 mb-2">
							コメント
						</label>
						<textarea
							id="comment-content"
							value={commentContent}
							onChange={(e) => setCommentContent(e.target.value)}
							placeholder={replyTo ? `コメント #${replyTo} に返信を入力してください...` : "コメントを入力してください..."}
							className="w-full p-3 border border-gray-300 rounded-lg resize-none"
							rows={4}
							required
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="anonymous-checkbox" className="flex items-center">
							<input
								id="anonymous-checkbox"
								type="checkbox"
								checked={isAnonymous}
								onChange={(e) => setIsAnonymous(e.target.checked)}
								className="mr-2"
							/>
							<span className="text-sm text-gray-700">匿名で投稿する</span>
						</label>
					</div>

					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
					>
						コメントを投稿
					</button>
				</form>
			</div>

			{/* コメント表示ゾーン */}
			<div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto w-full">
				{loadingComments ? (
					<div className="text-center text-gray-400 py-8">コメントを読み込み中...</div>
				) : comments.length === 0 ? (
					<div className="text-center text-gray-500 py-8">
						まだコメントがありません。最初のコメントを投稿してみましょう！
					</div>
				) : (
					<div>
						{comments.map((comment) => (
							<div key={comment.id} className="mb-4">
								<CommentItem comment={comment} />
								{comment.replies && comment.replies.length > 0 && (
									<div>
										{comment.replies.map((reply) => (
											<div key={reply.id} className="mb-4">
												<CommentItem comment={reply} />
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
