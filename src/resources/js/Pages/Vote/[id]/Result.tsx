import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
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

	const { theme, results } = usePage<{ theme: Theme; results: Result[] }>()
		.props;

	const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
	const resultsWithColors = results.map((result, index) => ({
		...result,
		fill: colors[index % colors.length],
	}));

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
		<div className="complete-container">
			<h1 className="page-title">{theme.title} の投票結果</h1>
			<div className="result-container">
				<BarChart
					width={600}
					height={400}
					data={resultsWithColors}
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5,
					}}
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
			</div>
			<div className="flex gap-2 mt-4 justify-center">
				<button type="button" className="theme-add-btn" onClick={handleHome}>
					トップページに戻る
				</button>
			</div>
		</div>
	);
}
