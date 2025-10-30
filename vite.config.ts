import { defineConfig, loadEnv, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const plugins: PluginOption[] = [vue(), vueJsx(), tailwindcss(), svgLoader()]

    // Only add DevTools in development mode
    if (mode === 'development') {
        plugins.push(
            vueDevTools({
                launchEditor: 'code',
            }),
        )
    }

    return {
        plugins,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        build: {
            // Reduce memory usage during build
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ['vue', 'vue-router', 'pinia'],
                        ui: ['reka-ui', 'lucide-vue-next'],
                        utils: ['axios', 'date-fns', 'zod'],
                    },
                },
            },
            // Reduce concurrent processing
            chunkSizeWarningLimit: 1000,
            // Disable source maps in production to save memory
            sourcemap: mode === 'development',
        },
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_URL, // backend server
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    }
})
