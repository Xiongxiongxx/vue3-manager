import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 9090,
		proxy: {
			"/sit": {
				target: 'http://127.0.0.1:8000',
				changeOrigin: true,
				rewrite: path => {
					return path.replace(/^\/sit/, '');
				}
			}
		}

	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
			"comps": resolve(__dirname, "src/components"),
		},
		extensions: ['.js', '.json', '.ts', '.vue'],
	},
	plugins: [
		vue(),
		AutoImport({
			imports: ['vue', 'vue-router'], // 自动导入vue和vue-router
			dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
			resolvers: [ElementPlusResolver()],
		}),
	],
})
