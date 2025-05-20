import { router, usePage } from "@inertiajs/react";
import "@/sass/style.css";
import type { TaskProps } from "@/types/FormData";
import { useState } from "react";

type Theme = {
	id: number;
	title: string;
	description?: string;
	deadline?: string;
	is_closed: boolean;
};

export default function TopPage() {
	const { themes } = usePage<{ themes: Theme[] }>().props;

	// const [filter, setFilter] = useState<
	// 	"all" | "not_started" | "in_progress" | "completed"
	// >("all");

	// const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const handleAddTask = () => {
		router.get("/vote/new");
	};

	const handleVote = (themeId: number) => {
		router.get(`/vote/${themeId}/choice`); // 投票ページに遷移
	};

	return (
		<div className="theme-container">
			<div className="theme-box">
				<h1 className="page-title">投票一覧</h1>
				<ul className="theme-list">
					{themes.map((theme) => (
						<li key={theme.id} className="theme-item">
							<div>
								<h2>{theme.title}</h2>
								<p>{theme.description}</p>
								<p>
									締切:{" "}
									{theme.deadline
										? new Date(theme.deadline).toLocaleString()
										: "なし"}
								</p>
								<p>{theme.is_closed ? "終了済み" : "進行中"}</p>
							</div>
							<button
								type="button"
								onClick={() => handleVote(theme.id)}
								className="theme-vote-btn"
								disabled={theme.is_closed}
							>
								投票
							</button>
						</li>
					))}
				</ul>
				<button type="button" onClick={handleAddTask} className="theme-add-btn">
					投票フォームを追加
				</button>
			</div>
		</div>
	);
}
