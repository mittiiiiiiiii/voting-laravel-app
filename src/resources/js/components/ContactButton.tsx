import { useCallback } from "react";
import { router } from "@inertiajs/react";

export default function ContactButton() {
	const handleClick = useCallback(() => {
		router.get("/form/contact");
	}, []);

	const handleHover = (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>, color: string) => {
		e.currentTarget.style.background = color;
	};

	return (
		<button
			onClick={handleClick}
			type="button"
			className="profile-edit-btn ml-4"
			style={{
				background: "#fff",
				color: "#2563eb",
				border: "1.5px solid #2563eb",
			}}
			onMouseOver={e => handleHover(e, "#f3f4f6")}
			onMouseOut={e => handleHover(e, "#fff")}
			onFocus={e => handleHover(e, "#f3f4f6")}
			onBlur={e => handleHover(e, "#fff")}
		>
			お問い合わせ
		</button>
	);
}
