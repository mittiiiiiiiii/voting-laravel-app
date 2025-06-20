import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export default function ResultPage() {
	type Result = {
		choice: string;
		votes: number;
		fill: string;
	};

	type Theme = {
		id: number;
		title: string;
	};

	const { theme, results, userChoice } = usePage<{
		theme: Theme;
		results: Result[];
		userChoice: string | null;
	}>().props;

	const barColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
	const pieColors = ["#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#c2c2f0"];

	const resultsWithColors = results.map((result, index) => ({
		...result,
		fill: barColors[index % barColors.length],
	}));

	const pieResultsWithColors = results
		.filter((result) => result.votes > 0)
		.map((result, index) => ({
			...result,
			fill: pieColors[index % pieColors.length],
		}));

	const renderCustomLabel = (entry: Result) => {
		return `${entry.choice}: ${entry.votes}`;
	};

	// 時間があればWebSocketに変更したい
	useEffect(() => {
		const interval = setInterval(() => {
			router.reload();
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	const handleHome = () => {
		router.get("/vote/top");
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
			<h1 className="text-center text-2xl font-bold mb-6">{theme.title} の投票結果</h1>
			{userChoice && (
				<div className="my-4 text-lg text-center text-gray-700">
					<p>
						あなたが投票した選択肢: <strong className="text-blue-700">{userChoice}</strong>
					</p>
				</div>
			)}
			<div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full mb-8">
				<BarChart
					width={600}
					height={400}
					data={resultsWithColors}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="choice" />
					<YAxis allowDecimals={false} />
					<Tooltip />
					<Legend />
					<Bar
						dataKey="votes"
						name="投票数"
						isAnimationActive={true}
						label={{ position: "top" }}
					/>
				</BarChart>
				<PieChart width={450} height={450}>
					<Pie
						data={pieResultsWithColors}
						dataKey="votes"
						nameKey="choice"
						cx="50%"
						cy="50%"
						outerRadius={150}
						fill="#8884d8"
						label={renderCustomLabel}
					>
						{pieResultsWithColors.map((entry) => (
							<Cell key={entry.choice} fill={entry.fill} />
						))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</div>
			<div className="flex gap-2 mt-4 justify-center">
				<button type="button" className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition" onClick={handleHome}>
					トップページに戻る
				</button>
			</div>
		</div>
	);
}
