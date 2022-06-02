import { defineStore } from 'pinia'

type userType = {
	token: string,
	username: string,
}

export const userStore = defineStore('userStore',{
	state: (): userType =>{
		return {
			token: '',
			username: ''
		}
	},
	getters:{

	},
	// 支持同步和异步
	actions:{

	},
	// 开启数据缓存
	persist:{
		enabled: true,
		strategies:[
			{
				key: 'user',
				storage: localStorage, // 默认是存储在session,可设置成存储在localStorage
				paths: ['token','username'] // 配置需要存储的数据
			}
		]
	}
})