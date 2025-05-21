import { router, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import "@/sass/style.css";
import type { UserData, UserProps } from "@/types/FormData";

export default function ProfilePage() {
	const { user } = usePage<UserProps>().props;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserData>({
		defaultValues: {
			name: user.name || "",
			email: user.email || "",
			password: "",
		},
	});

	const onSubmit = (data: UserData) => {
		router.post("/auth/profile", data);
	};

	const Logouthandle = () => {
		if (confirm("本当にログアウトしますか？")) {
			router.post("/auth/logout");
		}
	};

	const handleCancel = () => {
		router.get("/vote/top");
	};

	return (
		<div className="form-container">
			<div className="form-box">
				<h1 className="page-title">プロフィール</h1>
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
						{...register("password")}
						placeholder="パスワード（変更時のみ入力）"
						className="form-input"
					/>
					{errors.password && (
						<span className="form-error">{errors.password.message}</span>
					)}
					<button type="submit" className="form-button">
						保存
					</button>
					<button
						type="button"
						onClick={Logouthandle}
						className="theme-logout-btn"
					>
						ログアウト
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className="theme-cancel-btn"
					>
						キャンセル
					</button>
				</form>
			</div>
		</div>
	);
}
