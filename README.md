mock数据启动：
    npm run mocks
    npm run dev

对应node项目地址：https://github.com/Xiongxiongxx/koa-project.git

测试环境启动（本项目配置的proxy对应的node项目）:
    npm run test

生产环境启动（对应的node项目）
    npm run prod

## 相关配置

ui框架：
    npm install element-plus --save
配置element plus
    npm install -D unplugin-vue-components unplugin-auto-import

    ```js
    // vite.config.ts
    import AutoImport from 'unplugin-auto-import/vite'
    import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

    export default {
      plugins: [
        // ...
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
      ],
    }
    ```

setup语法糖不需要引入{ref, reactive}等的插件：
    npm i unplugin-auto-import -D

    ```js
    // vite.config.ts
    import AutoImport from 'unplugin-auto-import/vite'

    export default {
      plugins: [
        // ...
        AutoImport({
          imports: ['vue', 'vue-router'], // 自动导入vue和vue-router
			dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
        }),
      ],
    }
    ```

引入path:
    npm i @types/node

    ```js
    // vite.config.ts
    import { resolve } from "path";
    resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
			"comps": resolve(__dirname, "src/components"),
		},
		extensions: ['.js', '.json', '.ts', '.vue'],
	}
    ```

bus插件：
    npm install mitt -S

    untils/bus.ts

store插件：
    npm install pinia

store持久化存储：
    npm i pinia-plugin-persist --save

 mock数据：
    npm i mocks
    npm i dyson

 axios:
    npm i axios

 .env环境配置文件：
    .env.development：开发环境的配置文件
    .env.production：生产环境的配置文件
    在package.json里配置--mode 



