<script setup lang="ts">
import LeftNav from 'comps/leftNav.vue'
import dataDisplay from '@/components/dataDisplay.vue';
import userManage from '@/components/userManage.vue';
import goodsManage from '@/components/goodsManage.vue';
import orderManage from '@/components/orderManage.vue';
import Header from '@/components/header.vue';
// 组件列表
const compsList = {
	dataDisplay: markRaw(dataDisplay), // 数据展示
	userManage: markRaw(userManage), // 人员管理
	goodsManage: markRaw(goodsManage), // 商品管理
	orderManage: markRaw(orderManage), // 订单中心
}

// 动态展示的组件
const activeCom = reactive({ com: dataDisplay })
// 展示右侧组件
const toComp = (data) => {
	activeCom.com = compsList[data]
}
</script>

<template>
	<Header />
	<div class="content">
		<LeftNav @toComp="toComp" />
		<div class="right-box">
			<component :is="activeCom.com"></component>
		</div>
	</div>

</template>

<style scoped lang="less">
.header {
	width: 100%;
	padding: 10px 20px;
	background-color: antiquewhite;
	box-sizing: border-box;

	.avatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 10px;
	}
	.change-pwd{
		    margin-left: 20px;
    font-size: 12px;
    color: #999;
	&:hover {
			cursor: pointer;
		}
	}
	.exit-box {
		margin-left: 20px;
		.exit-icon {
			color: #999;
			font-size: 14px;
		}

		.exit {
			color: #999;
			margin-left: 6px;
			font-size: 12px;

		}

		&:hover {
			cursor: pointer;
		}
	}



}

.content {
	display: flex;
	flex-direction: row;
}

.right-box {
	flex-grow: 1;
	margin: 10px 20px;
	padding: 10px;
	box-sizing: border-box;
	// background: #f5f2f2;
	min-height: 100vh;
}
</style>
