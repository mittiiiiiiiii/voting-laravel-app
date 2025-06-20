import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "@/sass/style.css";

export default function EditPage() {
	type Choice = {
		id: string;
		text: string;
	};

	type ThemeForm = {
		title: string;
		description?: string;
		deadline?: string;
		choices: Choice[];
	};

	const { theme, choices: initialChoices } = usePage<{
		theme: {
			id: number;
			title: string;
			description?: string;
			deadline?: string;
		};
		choices: Choice[];
	}>().props;

	const [choices, setChoices] = useState<Choice[]>(initialChoices);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ThemeForm>({
		defaultValues: {
			title: theme.title,
			description: theme.description,
			deadline: theme.deadline,
		},
	});

	const handleAddChoice = () => {
		setChoices([...choices, { id: crypto.randomUUID(), text: "" }]);
	};

	const handleRemoveChoice = (id: string) => {
		setChoices(choices.filter((choice) => choice.id !== id));
	};

	const onSubmit = (data: ThemeForm) => {
		data.choices = choices;
		router.post(`/vote/${theme.id}/edit`, data);
	};

	const handleCancel = () => {
		router.get("/vote/top");
	};

	const handledelete = (themeId: number) => {
		if (confirm("本当に削除しますか？")) {
			router.post(`/vote/${themeId}/delete`);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-start justify-center py-10">
			<div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
				<h1 className="text-center text-2xl font-bold mb-8">投票テーマ編集</h1>
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
							placeholder="例: 好きな色は？"
						/>
						{errors.title && (
							<span className="text-red-500 text-sm mb-2 block">
								{errors.title.message}
							</span>
						)}
					</div>
					<div>
						<label htmlFor="description" className="block font-semibold mb-1">
							説明
						</label>
						<input
							id="description"
							type="text"
							{...register("description")}
							className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
						/>
					</div>
					<div>
						<label htmlFor="deadline" className="block font-semibold mb-1">
							締切日時
						</label>
						<input
							id="deadline"
							type="datetime-local"
							{...register("deadline")}
							className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
						/>
					</div>
					<div>
						<h2 className="font-semibold mb-2">選択肢</h2>
						{choices.map((choice) => (
							<div key={choice.id} className="flex items-center gap-2 mb-2">
								<label htmlFor={`choice-${choice.id}`} className="sr-only">
									選択肢
								</label>
								<input
									id={`choice-${choice.id}`}
									type="text"
									value={choice.text}
									onChange={(e) => {
										const updatedChoices = choices.map((c) =>
											c.id === choice.id ? { ...c, text: e.target.value } : c,
										);
										setChoices(updatedChoices);
									}}
									className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
									placeholder={`選択肢 ${choices.indexOf(choice) + 1}`}
								/>
								<button
									type="button"
									onClick={() => handleRemoveChoice(choice.id)}
									className="bg-gray-400 hover:bg-red-500 text-white text-xs px-2 py-1 rounded transition"
								>
									✕
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={handleAddChoice}
							className="bg-blue-500 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition"
						>
							＋ 選択肢を追加
						</button>
					</div>
					<div className="flex gap-2 mt-4 justify-center">
						<button
							type="submit"
							className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition"
						>
							保存
						</button>
						<button
							type="button"
							onClick={() => handledelete(theme.id)}
							className="bg-red-400 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition"
						>
							削除
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
