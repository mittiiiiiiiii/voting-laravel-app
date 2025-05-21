import ProfileButton from "@/components/profile";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<header
				style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}
			>
				<ProfileButton />
			</header>
			<main>{children}</main>
		</div>
	);
}
