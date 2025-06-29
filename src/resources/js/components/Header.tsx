import ProfileButton from "@/components/profile";
import ContactButton from "@/components/ContactButton";

export default function Header() {
	return (
		<header
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "1rem",
				background: "#2563eb",
				color: "white",
			}}
		>
			<h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
				投票アプリ
			</h1>
			<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
				<ContactButton />
				<ProfileButton />
			</div>
		</header>
	);
}
