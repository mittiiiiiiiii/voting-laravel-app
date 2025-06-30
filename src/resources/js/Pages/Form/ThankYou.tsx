import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import "@/sass/style.css";

export default function ThankYou({ category }: { category: string }) {
	const [countdown, setCountdown] = useState(3);

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1);
		}, 1000);

		const redirectTimer = setTimeout(() => {
			router.get("/vote/top");
		}, 3000);

		return () => {
			clearInterval(timer);
			clearTimeout(redirectTimer);
		};
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8 text-center">
				<h1 className="text-2xl font-bold mb-4">
					ご協力いただきありがとうございました！
				</h1>
				<p className="text-gray-600">
					{category}が送信されました。
					<br />
					{countdown}秒後に投票トップページへ移動します。
				</p>
			</div>
		</div>
	);
}
