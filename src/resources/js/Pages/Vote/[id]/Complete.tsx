import { router } from "@inertiajs/react";

export default function CompletePage() {
    const handleHome = () => {
        router.get("/vote/top");
    }

    return (
        <div className="complete-container">
            <h1 className="page-title">投票が完了しました！</h1>
            <div className="flex gap-2 mt-4 justify-center">
                <button
                    type="button"
                    className="theme-add-btn"
                    onClick={handleHome}
                >
                    トップページに戻る
                </button>
            </div>
        </div>
    );
}
