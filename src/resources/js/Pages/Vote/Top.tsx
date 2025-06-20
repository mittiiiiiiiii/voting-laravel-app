import { router, usePage } from "@inertiajs/react";
import "@/sass/style.css";
import type { TaskProps } from "@/types/FormData";
import { useState } from "react";

type Theme = {
	id: number;
	title: string;
	description?: string;
	deadline?: string;
	is_closed: boolean;
	user_id: number;
	created_at: string;
};

export default function TopPage() {
	const { themes, authUserId } = usePage<{
		themes: Theme[];
		authUserId: number;
	}>().props;

	const [filter, setFilter] = useState<"all" | "in_progress" | "closed">("all");
	const [showMyThemes, setShowMyThemes] = useState<boolean>(false);
	const [sortOption, setSortOption] = useState<
		"created_asc" | "created_desc" | "deadline_asc" | "deadline_desc"
	>("deadline_asc");

	const filteredThemes = themes.filter((theme) => {
		if (showMyThemes && theme.user_id !== authUserId) {
			return false;
		}
		if (filter === "in_progress") {
			return !theme.is_closed;
		}
		if (filter === "closed") {
			return theme.is_closed;
		}
		return true;
	});

	// const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	// console.log("authUserId:", authUserId);

	const sortedThemes = [...filteredThemes].sort((a, b) => {
		switch (sortOption) {
			case "created_asc":
				return (
					new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
				); // 作成日: 昇順
			case "created_desc":
				return (
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
				); // 作成日: 降順
			case "deadline_asc":
				return (
					new Date(a.deadline || 0).getTime() -
					new Date(b.deadline || 0).getTime()
				); // 締め切り: 昇順
			case "deadline_desc":
				return (
					new Date(b.deadline || 0).getTime() -
					new Date(a.deadline || 0).getTime()
				); // 締め切り: 降順
			default:
				return 0;
		}
	});

	const handleAddTask = () => {
		router.get("/vote/new");
	};

	const handleVote = (themeId: number) => {
		router.get(`/vote/${themeId}/choice`); // 投票ページに遷移
	};

	const handleEdit = (themeId: number) => {
		router.get(`/vote/${themeId}/edit`); // 編集ページに遷移
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-start justify-center py-10">
			<div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
				<h1 className="text-center text-2xl font-bold mb-8">投票一覧</h1>
				<div className="flex flex-wrap gap-2 mb-4 justify-center">
					<button
						type="button"
						onClick={() => setFilter("all")}
						className={`px-4 py-2 rounded-md border border-blue-500 transition
							${
								filter === "all"
									? "bg-blue-500 text-white"
									: "bg-white text-blue-500 hover:bg-blue-100"
							}
						`}
					>
						すべて
					</button>
					<button
						type="button"
						onClick={() => setFilter("in_progress")}
						className={`px-4 py-2 rounded-md border border-blue-500 transition
							${
								filter === "in_progress"
									? "bg-blue-500 text-white"
									: "bg-white text-blue-500 hover:bg-blue-100"
							}
						`}
					>
						進行中のみ
					</button>
					<button
						type="button"
						onClick={() => setFilter("closed")}
						className={`px-4 py-2 rounded-md border border-blue-500 transition
							${
								filter === "closed"
									? "bg-blue-500 text-white"
									: "bg-white text-blue-500 hover:bg-blue-100"
							}
						`}
					>
						締め切りのみ
					</button>
					<button
						type="button"
						onClick={() => setShowMyThemes(!showMyThemes)}
						className={`px-4 py-2 rounded-md border border-blue-500 transition
							${
								showMyThemes
									? "bg-blue-500 text-white"
									: "bg-white text-blue-500 hover:bg-blue-100"
							}
						`}
					>
						自分が作成したテーマ
					</button>
				</div>
				<div className="flex items-center gap-2 mb-6">
					<label htmlFor="sort" className="text-gray-700">
						並べ替え:
					</label>
					<select
						id="sort"
						value={sortOption}
						onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
						className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-400"
					>
						<option value="created_asc">作成日: 昇順</option>
						<option value="created_desc">作成日: 降順</option>
						<option value="deadline_asc">締め切り: 昇順</option>
						<option value="deadline_desc">締め切り: 降順</option>
					</select>
				</div>
				<ul className="space-y-4 mb-8">
					{sortedThemes.map((theme) => (
						<li
							key={theme.id}
							className="flex justify-between items-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition"
						>
							<div>
								<h2 className="text-lg font-bold text-gray-800 mb-1">
									{theme.title}
								</h2>
								<p className="text-sm text-gray-600 mb-1">
									{theme.description}
								</p>
								<p className="text-xs text-gray-500 mb-1">
									締切:{" "}
									{theme.deadline
										? new Date(theme.deadline).toLocaleString()
										: "なし"}
								</p>
								<p
									className={`text-sm font-bold ${theme.is_closed ? "text-gray-400" : "text-blue-600"}`}
								>
									{theme.is_closed ? "終了済み" : "進行中"}
								</p>
							</div>
							<div className="flex gap-2 items-center">
								<button
									type="button"
									onClick={() => handleVote(theme.id)}
									className="bg-blue-500 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition"
								>
									投票
								</button>
								{theme.user_id === authUserId && (
									<button
										type="button"
										onClick={() => handleEdit(theme.id)}
										className="bg-orange-400 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-md transition"
									>
										編集
									</button>
								)}
							</div>
						</li>
					))}
				</ul>
				<button
					type="button"
					onClick={handleAddTask}
					className="w-full max-w-xs mx-auto block bg-green-500 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
				>
					投票フォームを追加
				</button>
			</div>
		</div>
	);
}
