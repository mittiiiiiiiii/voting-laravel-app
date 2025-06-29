import Header from "@/components/Header";
import ProfileButton from "@/components/profile";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Header />
			<main>{children}</main>
		</div>
	);
}
