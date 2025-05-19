/// <reference types="vite/client" />
import Layout from "@/Layout";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
	title: (title) => `${appName} / ${title}`,
	resolve: (name) =>
		resolvePageComponent(
			`./Pages/${name}.tsx`,
			import.meta.glob("./Pages/**/*.tsx"),
		),
	setup({ el, App, props }) {
		const root = createRoot(el);
		root.render(
			<Layout>
				<App {...props} />
			</Layout>,
		);
	},
	progress: {
		color: "#4B5563",
	},
});
