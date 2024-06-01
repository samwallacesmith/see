import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		modules: {
			scopeBehaviour: 'local', // This is the default setting
			generateScopedName: '[name]__[local]___[hash:base64:5]', // Customize class name generation
		},
	},
	envPrefix: 'VITE_',
})
