import { router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "@/sass/style.css";

export default function NewPage() {
	type ThemeForm = {
		title: string;
		description?: string;
		deadline?: string;
		choices: { id: string; text: string }[]; // 選択肢の型
	};

	// 初期値に一意のIDを追加
	const [choices, setChoices] = useState([
		{ id: crypto.randomUUID(), text: "" },
	]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ThemeForm>({
		defaultValues: {
			title: "",
			description: "",
			deadline: "",
		},
	});

	const handleAddChoice = () => {
		setChoices([...choices, { id: crypto.randomUUID(), text: "" }]); // 新しい選択肢を追加
	};

	const handleRemoveChoice = (id: string) => {
		setChoices(choices.filter((choice) => choice.id !== id)); // 指定した選択肢を削除
	};

	const onSubmit = (data: ThemeForm) => {
		data.choices = choices; // 選択肢をフォームデータに追加
		router.post("/vote/new", data);
	};

	const handleCancel = () => {
		console.log("キャンセルボタンが押されたよー");
		router.get("/vote/top");
	};

	return (
		<div className="theme-container">
			<div className="theme-box">
				<h1 className="page-title">投票テーマ作成</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="theme-form">
					<div>
						<label htmlFor="title" className="theme-label">
							タイトル（必須）
						</label>
						<input
							id="title"
							type="text"
							{...register("title", { required: "タイトルは必須です" })}
							className="theme-input"
							placeholder="例: 好きな色は？"
						/>
						{errors.title && (
							<span className="form-error">{errors.title.message}</span>
						)}
					</div>
					<div>
						<label htmlFor="description" className="theme-label">
							説明
						</label>
						<input
							id="description"
							type="text"
							{...register("description")}
							className="theme-input"
						/>
					</div>
					<div>
						<label htmlFor="deadline" className="theme-label">
							締切日時
						</label>
						<input
							id="deadline"
							type="datetime-local"
							{...register("deadline")}
							className="theme-input"
						/>
					</div>
					<div>
						<h2>選択肢</h2>
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
									className="theme-input"
									placeholder={`選択肢 ${choices.indexOf(choice) + 1}`}
								/>
								<button
									type="button"
									onClick={() => handleRemoveChoice(choice.id)}
									className="choice-remove-btn"
								>
									✕
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={handleAddChoice}
							className="choice-add-btn"
						>
							＋ 選択肢を追加
						</button>
					</div>
					<div className="flex gap-2 mt-4 justify-center">
						<button type="submit" className="theme-add-btn">
							保存
						</button>
						<button
							type="button"
							onClick={handleCancel}
							className="theme-cancel-btn"
						>
							キャンセル
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
