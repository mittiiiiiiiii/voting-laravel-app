import { router, usePage } from "@inertiajs/react";
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
    const { theme, choices } = usePage<{ theme: Theme; choices: Choice[] }>().props;

    const handleCancel = () => {
        console.log("キャンセルボタンが押されたよー");
        router.visit("/vote/top");
    };

    return (
        <div className="theme-container">
            <div className="theme-box">
                <h1 className="page-title">{theme.title}</h1>
                <div className="theme-details">
                    <p className="theme-description">{theme.description}</p>
                    <p className="theme-deadline text-blue">
                        締切: {theme.deadline ? new Date(theme.deadline).toLocaleString() : "なし"}
                    </p>
                </div>
                <ul className="choice-list">
                    {choices.map((choice) => (
                        <li key={choice.id} className="choice-item">
                            {choice.text}
                        </li>
                    ))}
                </ul>
                <div className="flex gap-2 mt-4 justify-center">
                    <button type="submit" className="theme-add-btn">
                        保存
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="theme-cancel-btn"
                    >
                        キャンセル
                    </button>
                </div>
            </div>
        </div>
    );
}
