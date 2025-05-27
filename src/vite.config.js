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
        host: '127.0.0.1',
        port: 5173,
        origin: 'http://127.0.0.1:5173'
    },
    plugins: [
        laravel({
            input: ['resources/js/app.tsx', 'resources/js/sass/style.css'],
            refresh: true,
        }),
        tailwindcss(),
    ],
});
