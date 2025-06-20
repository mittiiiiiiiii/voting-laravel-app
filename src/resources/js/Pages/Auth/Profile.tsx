import { router, usePage } from "@inertiajs/react";
import { useForm } from "react-hook-form";
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
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center text-blue-600">プロフィール</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type="text"
						{...register("name", { required: "名前は必須です" })}
						placeholder="名前"
						className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-shadow"
					/>
					{errors.name && (
						<span className="text-red-500 text-sm mb-2 block">{errors.name.message}</span>
					)}
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
						{...register("password")}
						placeholder="パスワード（変更時のみ入力）"
						className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none mb-1 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-shadow"
					/>
					{errors.password && (
						<span className="text-red-500 text-sm mb-2 block">{errors.password.message}</span>
					)}
					<div className="flex gap-2 mt-4 justify-center">
						<button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition-colors hover:bg-blue-700">
							保存
						</button>
						<button
							type="button"
							onClick={Logouthandle}
							className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md transition-colors hover:bg-red-700"
						>
							ログアウト
						</button>
						<button
							type="button"
							onClick={handleCancel}
							className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-md transition-colors hover:bg-gray-600"
						>
							キャンセル
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}