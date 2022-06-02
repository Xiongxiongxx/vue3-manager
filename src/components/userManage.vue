<script setup lang="ts">
import { ElDialog } from 'element-plus';
import { getUserList, addUser, deleteUser } from '../../utils/api'
let tableData = ref([] as any[]) // 表格数据
// 搜索表单
let form = reactive({
	name: '',
	gender: '',
	position: '',
})
let currentPage = ref(1) // 当前页
let pageSize = ref(10) // 每页条数
let total = ref(0) // 总条数
let dialogFormVisible = ref(false) // 是否显示dialog
// 添加人员表单
let dialogForm = reactive({
	name: '',
	gender: '',
	position: '',
})
// 获取人员列表
const getUser = () => {
	const data = {
		name: form.name,
		gender: form.gender,
		position: form.position,
		currentPage: currentPage.value,
		pageSize: pageSize.value
	}
	getUserList(data).then(res => {
		total.value = res.total
		tableData.value = []
		tableData.value.push(...res.list)
	})
}
getUser()
// 删除
const handleClick = (row) => {
	deleteUser({ id: row.id }).then(res => {
		ElMessage.success('删除成功')
		getUser()
	})
}
// 更改每页条数
const handleSizeChange = (e) => {
	pageSize.value = e
	getUser()
}
// 翻页
const handleCurrentChange = (e) => {
	currentPage.value = e
	getUser()
}

// 确认添加
const addConfirm = () => {
	addUser(dialogForm).then(res => {
		ElMessage.success('添加成功')
		dialogFormVisible.value = false
		getUser()
	})
}
// 搜索
const searchUser = () => {
	currentPage.value = 1
	getUser()
}
// 重置搜索条件
const reset = () => {
	form.name = ''
	form.gender = ''
	form.position = ''
	searchUser()
}
// 性别格式化
const genderFormat = (row)=>{
	if(row.gender == 1){
		return '女'
	}else{
		return '男'
	}
}
// 职位格式化
const positionFormat = (row)=>{
	if(row.position == 1){
		return '店员'
	}else{
		return '店长'
	}
}
</script>

<template>
	<div class="form-box">
		<el-form :inline="true" :model="form">
			<el-form-item label="姓名">
				<el-input v-model="form.name" placeholder="请输入姓名" />
			</el-form-item>
			<el-form-item label="性别">
				<el-select v-model="form.gender" placeholder="请选择性别">
					<el-option label="男" value="0" />
					<el-option label="女" value="1" />
				</el-select>
			</el-form-item>
			<el-form-item label="职位">
				<el-select v-model="form.position" placeholder="请选择职位">
					<el-option label="店长" value="0" />
					<el-option label="店员" value="1" />
				</el-select>
			</el-form-item>
		</el-form>
	</div>
	<div class="btns">
		<el-button @click="searchUser" type="primary">搜索</el-button>
		<el-button @click="reset" type="success">重置</el-button>
		<el-button @click="dialogFormVisible = true" type="warning">添加人员</el-button>
	</div>
	<div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="name" label="姓名" width="" />
			<el-table-column prop="gender" :formatter="genderFormat" label="性别" width="" />
			<el-table-column prop="position" :formatter="positionFormat" label="职位" width="" />
			<el-table-column prop="orders" label="订单数" width="" />
			<el-table-column prop="sales" label="销售额" width="" />
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					<el-popconfirm @confirm="handleClick(scope.row)" title="确认删除？">
						<template #reference>
							<el-button type="danger">删除</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<div class="pager">
			<div class="demo-pagination-block">
				<el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20]" layout="total,sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
			</div>
		</div>

	</div>
	<el-dialog v-model="dialogFormVisible" title="添加人员">
		<el-form :model="dialogForm">
			<el-form-item label="姓名" label-width="60px">
				<el-input v-model="dialogForm.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="性别" label-width="60px">
				<el-select v-model="dialogForm.gender" placeholder="请选择性别">
					<el-option label="男" value="0" />
					<el-option label="女" value="1" />
				</el-select>
			</el-form-item>
			<el-form-item label="职位" label-width="60px">
				<el-select v-model="dialogForm.position" placeholder="请选择职位">
					<el-option label="店长" value="0" />
					<el-option label="店员" value="1" />
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="addConfirm">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<style scoped lang="less">
.btns {
	text-align: center;
	margin-bottom: 20px;
}

.pager {
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
}
</style>
<style lang="less">
.form-box {
	.el-form-item__label {
		width: 50px !important;
	}
}
</style>
