import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
	build: {
		target: 'esnext',
		minify: 'esbuild',
		sourcemap: false,
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom', 'react-router-dom'],
					mui: ['@mui/material', '@mui/icons-material'],
					dexie: ['dexie'],
					markdown: ['react-markdown'],
				},
			},
		},
	},
	plugins: [
		react(),
		visualizer({ open: true }),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
			manifest: {
				id: '/',
				name: 'Notes PWA',
				short_name: 'Notes',
				description: 'A simple markdown note-taking app.',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#1976d2',
				orientation: 'portrait',
				icons: [
					{
						src: '/assets/icons/icon-48x48.png',
						sizes: '48x48',
						type: 'image/png',
					},
					{
						src: '/assets/icons/icon-144x144.png',
						sizes: '144x144',
						type: 'image/png',
					},
					{
						src: '/assets/icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
				screenshots: [
					{
						src: '/assets/screenshots/placeholder-wide.png',
						sizes: '1280x720',
						type: 'image/png',
						form_factor: 'wide',
					},
					{
						src: '/assets/screenshots/placeholder-narrow.png',
						sizes: '720x1280',
						type: 'image/png',
						form_factor: 'narrow',
					},
				],
			},
			workbox: {
				cleanupOutdatedCaches: true,
			},
			devOptions: {
				enabled: true,
			},
		}),
	],
});
