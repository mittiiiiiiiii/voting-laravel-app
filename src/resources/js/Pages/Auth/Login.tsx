import { Link, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
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
		router.post("/auth/login", data);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center text-blue-600">ログインページ</h1>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<input
						type="email"
						{...register("email", { required: "メールアドレスは必須です" })}
						placeholder="メールアドレス"
						className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-shadow"
					/>
					{errors.email && (
						<span className="text-red-500 text-sm mb-2 block">{errors.email.message}</span>
					)}
					<input
						type="password"
						{...register("password", { required: "パスワードは必須です" })}
						placeholder="パスワード"
						className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-shadow"
					/>
					{errors.password && (
						<span className="text-red-500 text-sm mb-2 block">{errors.password.message}</span>
					)}
					<button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition-colors mt-2 hover:bg-blue-700">
						ログイン
					</button>
				</form>
				<p className="mt-4 text-center text-sm">
					アカウントをお持ちでない方は
					<a href="/auth/register" className="text-blue-700 underline ml-1 hover:text-blue-900">
						こちら
					</a>
				</p>
			</div>
		</div>
	);
}
