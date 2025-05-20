import { usePage } from "@inertiajs/react";
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

    return (
        <div className="theme-container">
            <div className="theme-box">
                <h1 className="page-title">{theme.title}</h1>
                <p>{theme.description}</p>
                <ul className="choice-list">
                    {choices.map((choice) => (
                        <li key={choice.id} className="choice-item">
                            {choice.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
