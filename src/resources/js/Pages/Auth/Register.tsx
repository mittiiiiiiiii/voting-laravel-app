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
		router.post("/auth/register", data);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-blue-600 text-center text-xl font-bold mb-6">
					ユーザー登録ページ
				</h1>
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
					<input
						type="password"
						{...register("password", { required: "パスワードは必須です" })}
						placeholder="パスワード"
						className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
					/>
					{errors.password && (
						<span className="text-red-500 text-sm mb-2 block">
							{errors.password.message}
						</span>
					)}
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-2 transition"
					>
						登録
					</button>
				</form>
				<p className="mt-4 text-center text-sm">
					ログインページは
					<a
						href="/auth/login"
						className="text-blue-700 underline ml-1 hover:text-blue-900"
					>
						こちら
					</a>
				</p>
			</div>
		</div>
	);
}
