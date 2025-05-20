export type UserData = {
	name: string;
	email: string;
	password: string;
};

export type UserProps = {
	user: {
		name: string;
		email: string;
	};
};

export type Task = {
	id: number;
	title: string;
	description?: string;
	status: "not_started" | "in_progress" | "completed";
	due_date?: string;
	userId?: number;
};

export type TaskProps = {
	tasks: Task[];
};
