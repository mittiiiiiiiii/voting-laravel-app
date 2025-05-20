import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import "@/sass/style.css";

export default function NewPage() {

    type ThemeForm = {
        title: string;
        description?: string;
        deadline?: string;
    };

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

	const onSubmit = (data: ThemeForm) => {
		router.post("/vote/new", data);
	};

	return (
		<div className="tasks-container">
			<div className="tasks-box">
				<h1 className="tasks-title">投票テーマ作成</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="tasks-form">
					<div>
						<label htmlFor="title" className="tasks-label">
							タイトル（必須）
						</label>
						<input
							id="title"
							type="text"
							{...register("title", { required: "タイトルは必須です" })}
							className="tasks-input"
							placeholder="例: 好きな色は？"
						/>
						{errors.title && (
							<span className="form-error">{errors.title.message}</span>
						)}
					</div>
					<div>
						<label htmlFor="description" className="tasks-label">
							説明
						</label>
						<input
							id="description"
							type="text"
							{...register("description")}
							className="tasks-input"
						/>
					</div>
					<div>
						<label htmlFor="deadline" className="tasks-label">
							締切日時
						</label>
						<input
							id="deadline"
							type="datetime-local"
							{...register("deadline")}
							className="tasks-input"
						/>
					</div>
					<div className="flex gap-2 mt-4">
						<button type="submit" className="tasks-add-btn">
							保存
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
