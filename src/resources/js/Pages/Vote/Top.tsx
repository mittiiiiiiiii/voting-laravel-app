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
	user_id: number;
	created_at: string;
};

export default function TopPage() {
	const { themes, authUserId } = usePage<{
		themes: Theme[];
		authUserId: number;
	}>().props;

	const [filter, setFilter] = useState<"all" | "in_progress" | "closed">("all");
	const [showMyThemes, setShowMyThemes] = useState<boolean>(false);
	const [sortOption, setSortOption] = useState<
		"created_asc" | "created_desc" | "deadline_asc" | "deadline_desc"
	>("deadline_asc");

	const filteredThemes = themes.filter((theme) => {
		if (showMyThemes && theme.user_id !== authUserId) {
			return false;
		}
		if (filter === "in_progress") {
			return !theme.is_closed;
		}
		if (filter === "closed") {
			return theme.is_closed;
		}
		return true;
	});

	// const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	// console.log("authUserId:", authUserId);

	const sortedThemes = [...filteredThemes].sort((a, b) => {
		switch (sortOption) {
			case "created_asc":
				return (
					new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
				); // 作成日: 昇順
			case "created_desc":
				return (
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
				); // 作成日: 降順
			case "deadline_asc":
				return (
					new Date(a.deadline || 0).getTime() -
					new Date(b.deadline || 0).getTime()
				); // 締め切り: 昇順
			case "deadline_desc":
				return (
					new Date(b.deadline || 0).getTime() -
					new Date(a.deadline || 0).getTime()
				); // 締め切り: 降順
			default:
				return 0;
		}
	});

	const handleAddTask = () => {
		router.get("/vote/new");
	};

	const handleVote = (themeId: number) => {
		router.get(`/vote/${themeId}/choice`); // 投票ページに遷移
	};

	const handleEdit = (themeId: number) => {
		router.get(`/vote/${themeId}/edit`); // 編集ページに遷移
	};

	return (
		<div className="theme-container">
			<div className="theme-box">
				<h1 className="page-title">投票一覧</h1>
				<div className="filter-buttons">
					<button
						type="button"
						onClick={() => setFilter("all")}
						className={`filter-btn ${filter === "all" ? "active" : ""}`}
					>
						すべて
					</button>
					<button
						type="button"
						onClick={() => setFilter("in_progress")}
						className={`filter-btn ${filter === "in_progress" ? "active" : ""}`}
					>
						進行中のみ
					</button>
					<button
						type="button"
						onClick={() => setFilter("closed")}
						className={`filter-btn ${filter === "closed" ? "active" : ""}`}
					>
						締め切りのみ
					</button>
					<button
						type="button"
						onClick={() => setShowMyThemes(!showMyThemes)}
						className={`filter-btn ${showMyThemes ? "active" : ""}`}
					>
						自分が作成したテーマ
					</button>
				</div>
				<div className="sort-dropdown">
					<label htmlFor="sort">並べ替え:</label>
					<select
						id="sort"
						value={sortOption}
						onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
					>
						<option value="created_asc">作成日: 昇順</option>
						<option value="created_desc">作成日: 降順</option>
						<option value="deadline_asc">締め切り: 昇順</option>
						<option value="deadline_desc">締め切り: 降順</option>
					</select>
				</div>
				<ul className="theme-list">
					{sortedThemes.map((theme) => (
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
							<div className="button-group">
								<button
									type="button"
									onClick={() => handleVote(theme.id)}
									className="theme-vote-btn"
								>
									投票
								</button>
								{theme.user_id === authUserId && (
									<button
										type="button"
										onClick={() => handleEdit(theme.id)}
										className="theme-edit-btn theme-vote-btn"
									>
										編集
									</button>
								)}
							</div>
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
