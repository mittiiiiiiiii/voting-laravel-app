export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<header
				style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}
			/>
			<main>{children}</main>
		</div>
	);
}
