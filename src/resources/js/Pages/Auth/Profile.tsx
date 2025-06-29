import { router, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import "@/sass/style.css";
import type { UserData, UserProps } from "@/types/FormData";

export default function ProfilePage() {
	const { user, errors: inertiaErrors = {} } = usePage<UserProps & { errors?: { [key: string]: string } }>().props;

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
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-center text-xl font-bold mb-6">プロフィール</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						{...register("name", { required: "名前は必須です" })}
						placeholder="名前"
						className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
					/>
					{errors.name && (
						<span className="text-red-500 text-sm mb-2 block">
							{errors.name.message}
						</span>
					)}
					{inertiaErrors.name && (
						<span className="text-red-500 text-sm mb-2 block">
							{inertiaErrors.name}
						</span>
					)}
					<input
						type="email"
						{...register("email", { required: "メールアドレスは必須です" })}
						placeholder="メールアドレス"
						className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
					/>
					{errors.email && (
						<span className="text-red-500 text-sm mb-2 block">
							{errors.email.message}
						</span>
					)}
					{inertiaErrors.email && (
						<span className="text-red-500 text-sm mb-2 block">
							{inertiaErrors.email}
						</span>
					)}
					<input
						type="password"
						{...register("password")}
						placeholder="パスワード（変更時のみ入力）"
						className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
					/>
					{errors.password && (
						<span className="text-red-500 text-sm mb-2 block">
							{errors.password.message}
						</span>
					)}
					{inertiaErrors.password && (
						<span className="text-red-500 text-sm mb-2 block">
							{inertiaErrors.password}
						</span>
					)}
					<div className="flex gap-4 justify-center mt-4">
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
						>
							保存
						</button>
						<button
							type="button"
							onClick={Logouthandle}
							className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
						>
							ログアウト
						</button>
						<button
							type="button"
							onClick={handleCancel}
							className="bg-gray-400 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition"
						>
							キャンセル
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
