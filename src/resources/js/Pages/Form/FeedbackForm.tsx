import { useForm } from "react-hook-form";
import "@/sass/style.css";

export default function FeedbackForm() {
	type FeedbackFormType = {
		title: string;
		category: string;
		description: string;
		email?: string;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FeedbackFormType>({
		defaultValues: {
			title: "",
			category: "フィードバック",
			description: "",
			email: "",
		},
	});

	const onSubmit = (data: FeedbackFormType) => {
		console.log("送信内容", data);
	};

	const handleCancel = () => {
		console.log("キャンセルボタンが押されました");
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-start justify-center py-10">
			<div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
				<h1 className="text-center text-2xl font-bold mb-8">フィードバック・お問い合わせ</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<label htmlFor="title" className="block font-semibold mb-1">
							タイトル（必須）
						</label>
						<input
							id="title"
							type="text"
							{...register("title", { required: "タイトルは必須です" })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
							placeholder="例: バグ報告、要望など"
						/>
						{errors.title && (
							<span className="text-red-500 text-sm mb-2 block">{errors.title.message}</span>
						)}
					</div>
					<div>
						<label htmlFor="email" className="block font-semibold mb-1">
							メールアドレス（任意）
						</label>
						<input
							id="email"
							type="email"
							{...register("email", {
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "メールアドレスの形式が正しくありません",
								},
							})}
							className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
							placeholder="例: example@email.com"
						/>
						{errors.email && (
							<span className="text-red-500 text-sm mb-2 block">{errors.email.message}</span>
						)}
					</div>
					<div>
						<label htmlFor="category" className="block font-semibold mb-1">
							目的（必須）
						</label>
						<select
							id="category"
							{...register("category", { required: "目的を選択してください" })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
						>
							<option value="フィードバック">フィードバック</option>
							<option value="バグ報告">バグ報告</option>
							<option value="要望">要望</option>
							<option value="コンタクト">コンタクト</option>
						</select>
						{errors.category && (
							<span className="text-red-500 text-sm mb-2 block">{errors.category.message}</span>
						)}
					</div>
					<div>
						<label htmlFor="description" className="block font-semibold mb-1">
							概要（必須）
						</label>
						<textarea
							id="description"
							{...register("description", { required: "概要は必須です" })}
							className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
							placeholder="内容を詳しくご記入ください"
							rows={5}
						/>
						{errors.description && (
							<span className="text-red-500 text-sm mb-2 block">{errors.description.message}</span>
						)}
					</div>
					<div className="flex gap-2 mt-4 justify-center">
						<button
							type="submit"
							className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition"
						>
							送信
						</button>
						<button
							type="button"
							onClick={handleCancel}
							className="bg-gray-400 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-md transition"
						>
							キャンセル
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
