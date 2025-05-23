import path from 'node:path';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

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
            input: ['resources/js/app.js', 'resources/js/sass/style.css'],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
