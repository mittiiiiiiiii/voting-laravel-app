import { router, usePage } from "@inertiajs/react";
import "@/sass/style.css";
import type { TaskProps } from "@/types/FormData";
import { useState } from "react";

export default function Tasks() {
	// const { tasks } = usePage<TaskProps>().props;

	// const [filter, setFilter] = useState<
	// 	"all" | "not_started" | "in_progress" | "completed"
	// >("all");

	// const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	return (
		<div className="tasks-container">
			<div className="tasks-box">
				<h1 className="tasks-title">投票一覧</h1>
				    <ul className="tasks-list">
				</ul>
			</div>
		</div>
	);
}
