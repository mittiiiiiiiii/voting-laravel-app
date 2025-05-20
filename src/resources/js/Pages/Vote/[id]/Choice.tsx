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
    const { theme, choices } = usePage<{ theme: Theme; choices: Choice[] }>().props;
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

    const handleCancel = () => {
        console.log("キャンセルボタンが押されたよー");
        router.visit("/vote/top");
    };

    const handleChoiceClick = (id: number) => {
        setSelectedChoice(id);
    };

    const handleChoiceKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, id: number) => {
        if (event.key === "Enter" || event.key === " ") {
            setSelectedChoice(id);
        }
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
                        <li key={choice.id}>
                            <button
                                type="button"
                                className={`choice-button ${selectedChoice === choice.id ? "selected" : ""}`}
                                onClick={() => handleChoiceClick(choice.id)}
                                onKeyDown={(event) => handleChoiceKeyDown(event, choice.id)}
                            >
                                {choice.text}
                            </button>
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
