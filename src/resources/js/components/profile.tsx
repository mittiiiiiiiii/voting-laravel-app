import { router } from "@inertiajs/react";

export default function ProfileButton() {
	const handleProfile = () => {
		console.log("プロフィールのボタンが押されたよー");
		router.get("/auth/profile");
	};

	return (
		<button type="button" onClick={handleProfile} className="profile-edit-btn">
			プロフィール
		</button>
	);
}
