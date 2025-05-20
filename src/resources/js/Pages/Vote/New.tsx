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
