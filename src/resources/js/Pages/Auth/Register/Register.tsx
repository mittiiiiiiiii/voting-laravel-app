import type { UserData } from "@/types/FormData";
import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import "@/sass/style.css";

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserData>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: UserData) => {
		console.log("ボタンが押されたよー", data);
		router.post("/register", data);
	};

	return (
		<div className="form-container">
			<div className="form-box">
				<h1 className="page-title">ユーザー登録ページ</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						{...register("name", { required: "名前は必須です" })}
						placeholder="名前"
						className="form-input"
					/>
					{errors.name && (
						<span className="form-error">{errors.name.message}</span>
					)}
					<input
						type="email"
						{...register("email", { required: "メールアドレスは必須です" })}
						placeholder="メールアドレス"
						className="form-input"
					/>
					{errors.email && (
						<span className="form-error">{errors.email.message}</span>
					)}
					<input
						type="password"
						{...register("password", { required: "パスワードは必須です" })}
						placeholder="パスワード"
						className="form-input"
					/>
					{errors.password && (
						<span className="form-error">{errors.password.message}</span>
					)}
					<button type="submit" className="form-button">
						登録
					</button>
				</form>
				<p className="form-bottom-text">
					ログインページは
					<a href="/login" className="navigation-link">
						こちら
					</a>
				</p>
			</div>
		</div>
	);
}
