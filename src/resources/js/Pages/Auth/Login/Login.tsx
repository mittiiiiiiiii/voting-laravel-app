import { router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import "@/sass/style.css";
import type { UserData } from "@/types/FormData";

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserData>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: UserData) => {
		console.log("ボタンが押されたよー", data);
		router.post("/login", data);
	};

	return (
		<div className="form-container">
			<div className="form-box">
				<h1 className="page-title">ログインページ</h1>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
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
						ログイン
					</button>
				</form>
				<p className="form-bottom-text">
					アカウントをお持ちでない方は
					<a href="/register" className="navigation-link">
						こちら
					</a>
				</p>
			</div>
		</div>
	);
}
