import path from 'node:path';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

const pageEntries = globSync('resources/js/Pages/**/*.tsx')
const input = [
    'resources/js/app.tsx',
    'resources/sass/app.scss',
    ...pageEntries,
]

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
    server: {
        host: true,
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true,
        },
    },
    plugins: [
        laravel({
            input,
            refresh: true,
        }),
        tailwindcss(),
    ],
});
