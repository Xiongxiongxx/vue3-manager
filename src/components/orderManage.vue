<script setup lang="ts">
import { ElDialog } from 'element-plus';
import { getGoodsList,getUserList, getOrdersList, addOrder,deleteOrder } from '../../utils/api'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

let goodsList = ref([] as any[]) // 商品数据
let personList = ref([] as any[]) // 人员数据
let tableData = ref([] as any[])
let total = ref(0)
// 搜索表单
let form = reactive({
    goodId: '',
    personId: '',
})
let currentPage = ref(1) // 当前页
let pageSize = ref(10) // 每页条数
let dialogFormVisible = ref(false) // 是否显示添加商品dialog
// 添加订单表单
let dialogForm = reactive({
    goodId: '',
    personId:''
})

// 获取订单列表
const getOrders = () => {
    const data = {
        goodId: form.goodId,
        personId: form.personId,
        currentPage: currentPage.value,
        pageSize: pageSize.value
    }
    getOrdersList(data).then(res => {
        total.value = res.total
        tableData.value = []
        tableData.value.push(...res.list)
    })
}
getOrders()
// 获取商品列表
const getGoods = () => {
    const data = {
        name: '',
        classify: '',
        currentPage: 0,
        pageSize: 0
    }
    getGoodsList(data).then(res => {
        goodsList.value.push(...res.list)
    })
}
getGoods()
// 获取人员列表
const getUser = () => {
    const data = {
        name: '',
        gender: '',
        position: '',
        currentPage: 0,
        pageSize: 0
    }
    getUserList(data).then(res => {
        personList.value.push(...res.list)
    })
}
getUser()

// 删除
const handleClick = (row) => {
    deleteOrder({ id: row.id }).then(res => {
        ElMessage.success('删除成功')
        getOrders()
    })
}
// 更改每页条数
const handleSizeChange = (e) => {
    pageSize.value = e
    getOrders()
}
// 翻页
const handleCurrentChange = (e) => {
    currentPage.value = e
    getOrders()
}

// 确认添加
const addConfirm = () => {
    addOrder(dialogForm).then(res => {
        ElMessage.success('添加成功')
        dialogFormVisible.value = false
        getOrders()
    })
}

// 搜索
const searchOrders = () => {
    currentPage.value = 1
    getOrders()
}
// 重置搜索条件
const reset = () => {
    form.goodId = ''
    form.personId = ''
    searchOrders()
}
</script>

<template>
    <div class="form-box goods">
       <el-form :inline="true" :model="form">
            <el-form-item label="商品" label-width="120px">
                <el-select v-model="form.goodId" placeholder="请选择商品">
                    <el-option class="goods-select"  v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id">
                        <img class="select-img" :src="item.img" alt="">
                        <span class="select-text">{{ item.name }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售人员" label-width="120px">
                <el-select v-model="form.personId" placeholder="请选择销售人员">
                    <el-option v-for="item in personList" :key="item.id" :label="item.name" :value="item.id">
                        <span>{{ item.name }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
    <div class="btns">
        <el-button @click="searchOrders" type="primary">搜索</el-button>
        <el-button @click="reset" type="success">重置</el-button>
        <el-button @click="dialogFormVisible = true" type="warning">添加订单</el-button>
    </div>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="orderId" label="订单号" width="" />
            <el-table-column label="图片" width="180">
                <template #default="scope">
                    <img :src="scope.row.img" alt="" style="width: 50px;">
                </template>
            </el-table-column>
            <el-table-column prop="goodName" label="名称" width="" />
            <el-table-column prop="price" label="价格" width="" />
            <el-table-column prop="personName" label="销售员" width="" />
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
    <el-dialog v-model="dialogFormVisible" title="添加订单">
        <el-form :model="dialogForm">
            <el-form-item label="商品" label-width="80px">
                <el-select v-model="dialogForm.goodId" placeholder="请选择商品">
                    <el-option class="goods-select"  v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id">
                        <img class="select-img" :src="item.img" alt="">
                        <span class="select-text">{{ item.name }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="销售人员" label-width="80px">
                <el-select v-model="dialogForm.personId" placeholder="请选择销售人员">
                    <el-option v-for="item in personList" :key="item.id" :label="item.name" :value="item.id">
                        <span>{{ item.name }}</span>
                    </el-option>
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

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
.select-img{
    width:20px;
        margin-right: 10px;
}

</style>
<style lang="less">
.goods {
    .el-form-item__label {
        width: 80px !important;
    }
}
.goods-select{
    display: flex;
    flex-direction: row;
    align-items: center;
}

</style>
