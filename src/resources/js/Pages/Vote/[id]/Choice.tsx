import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import "@/sass/style.css";

type Choice = {
	id: number;
	text: string;
};

type Theme = {
	id: number;
	title: string;
	description?: string;
	deadline?: string;
	is_closed: boolean;
	choices: Choice[];
};

export default function ChoicePage() {
	const { theme, choices } = usePage<{ theme: Theme; choices: Choice[] }>()
		.props;
	const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

	const handleCancel = () => {
		console.log("キャンセルボタンが押されたよー");
		router.get("/vote/top");
	};

	const handleChoiceClick = (id: number) => {
		setSelectedChoice(id);
	};

	const handleChoiceKeyDown = (
		event: React.KeyboardEvent<HTMLButtonElement>,
		id: number,
	) => {
		if (event.key === "Enter" || event.key === " ") {
			setSelectedChoice(id);
		}
	};

	const handleVote = () => {
		console.log("id", theme.id);
		router.post(`/vote/${theme.id}/choice`, { choice_id: selectedChoice });
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-start justify-center py-10">
			<div className="w-full max-w-xl bg-white rounded-lg shadow-md p-8">
				<h1 className="text-center text-2xl font-bold mb-6">{theme.title}</h1>
				<div className="mb-6 p-4 bg-gray-100 rounded-md">
					<p className="text-base text-gray-700 mb-1">{theme.description}</p>
					<p className="text-sm text-blue-700 font-bold">締切: {theme.deadline ? new Date(theme.deadline).toLocaleString() : "なし"}</p>
				</div>
				<ul className="space-y-2 mb-8">
					{choices.map((choice) => (
						<li key={choice.id}>
							<button
								type="button"
								className={`w-full text-left px-4 py-3 rounded-md border border-gray-300 bg-gray-50 transition cursor-pointer text-base font-medium hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 ${selectedChoice === choice.id ? "bg-blue-600 text-white border-blue-600" : ""}`}
								onClick={() => handleChoiceClick(choice.id)}
								onKeyDown={(event) => handleChoiceKeyDown(event, choice.id)}
							>
								{choice.text}
							</button>
						</li>
					))}
				</ul>
				<div className="flex gap-2 mt-4 justify-center">
					<button type="button" className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition" onClick={handleVote}>
						投票する
					</button>
					<button
						type="button"
						onClick={handleCancel}
						className="bg-gray-400 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-md transition"
					>
						キャンセル
					</button>
				</div>
			</div>
		</div>
	);
}
