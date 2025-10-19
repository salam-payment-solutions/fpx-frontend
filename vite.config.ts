import { defineConfig, loadEnv, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const plugins: PluginOption[] = [vue(), vueJsx(), tailwindcss(), svgLoader()]

    // Only add DevTools in development mode
    if (mode === 'development') {
        plugins.push(vueDevTools())
    }

    return {
        plugins,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
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
