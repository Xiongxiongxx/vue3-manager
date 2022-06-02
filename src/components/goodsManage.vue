<script setup lang="ts">
import { ElDialog } from 'element-plus';
import { getGoodsList, addGood, deleteGood, getGoodsClassify } from '../../utils/api'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

let tableData = ref([] as any[]) // 表格数据
let classifyList = ref([] as any[])

// 搜索表单
let form = reactive({
    name: '',
    classify: [],
})
let currentPage = ref(1) // 当前页
let pageSize = ref(10) // 每页条数
let total = ref(0) // 总条数
let dialogFormVisible = ref(false) // 是否显示添加商品dialog
// 添加人员表单
let dialogForm = reactive({
    img: '',
    name: '',
    classify: [],
    price: '',
    isNew: '0',
})
let showForm = ref(false) // 是否显示搜索框

// 获取商品分类
const getClassify = () => {
    getGoodsClassify().then(res => {
        let obj = res
        classifyListFormat(obj)
        classifyList.value = obj
        showForm.value = true


    })
}
getClassify()
const classifyListFormat = (data) => {
    data.forEach(item => {
        item.label = item.name
        item.value = item.id
        if (item.children) {
            classifyListFormat(item.children)
        }
    });
}
// 获取商品列表
const getGoods = () => {
    const data = {
        name: form.name,
        classify: form.classify.join(','),
        currentPage: currentPage.value,
        pageSize: pageSize.value
    }
    getGoodsList(data).then(res => {
        total.value = res.total
        tableData.value = []
        tableData.value.push(...res.list)
    })
}
getGoods()

// 删除
const handleClick = (row) => {
    deleteGood({ id: row.id }).then(res => {
        ElMessage.success('删除成功')
        getGoods()
    })
}
// 更改每页条数
const handleSizeChange = (e) => {
    pageSize.value = e
    getGoods()
}
// 翻页
const handleCurrentChange = (e) => {
    currentPage.value = e
    getGoods()
}

// 确认添加
const addConfirm = () => {
    const data = {
        img: dialogForm.img,
        name: dialogForm.name,
        classify: dialogForm.classify.join(','),
        price: dialogForm.price,
        isNew: dialogForm.isNew,
    }
    addGood(data).then(res => {
        ElMessage.success('添加成功')
        dialogFormVisible.value = false
        getGoods()
    })
}
// 搜索-选择分类
const searchHandleChange = (value) => {
    form.classify = value
}
// 搜索
const searchGoods = () => {
    currentPage.value = 1
    getGoods()
}
// 重置搜索条件
const reset = () => {
    form.name = ''
    form.classify = []
    searchGoods()
}
// 新品格式化
const isNewFormat = (row) => {
    if (row.isNew == 0) {
        return '否'
    } else {
        return '是'
    }
}

let noTreeObj = reactive({}) // 解析树形结构
// 解析树形结构用来格式化分类
const classifyFormat = (row) => {
    let classify = row.classify.split(',')
    let str = ''
    noTreeClassify(classifyList.value)
    classify.forEach(item => {
        str += noTreeObj[item] + '/'
    })
    str = str.slice(0, str.length - 1)

    return str
}

const noTreeClassify = (data) => {
    data.forEach(item => {
        noTreeObj[item.id] = item.label
        if (item.children) {
            noTreeClassify(item.children)
        }
    })
}
// 选择分类
const dialogHandleChange = (value) => {
    dialogForm.classify = value
}
let bseUrl = import.meta.env.VITE_BASE_URL // 请求bseUrl
let action = bseUrl + '/api/upload' // 图片上传接口

// 上传商品图片成功回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    dialogForm.img = response.data.url
    // dialogForm.img = URL.createObjectURL(uploadFile.raw!)
}
// 上传前的校验
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type == 'gif' || rawFile.type == 'Gif') {
        ElMessage.error('不能上传Gif')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('上传图片大小不能超过2M')
        return false
    }
    return true
}
</script>

<template>
    <div class="form-box goods" v-if="showForm">
        <el-form :inline="true" :model="form">
            <el-form-item label="商品名称">
                <el-input v-model="form.name" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="商品分类">
                <el-cascader v-model="form.classify" :options="classifyList" @change="searchHandleChange" placeholder="请选择商品分类" />
            </el-form-item>
        </el-form>
    </div>
    <div class="btns">
        <el-button @click="searchGoods" type="primary">搜索</el-button>
        <el-button @click="reset" type="success">重置</el-button>
        <el-button @click="dialogFormVisible = true" type="warning">添加商品</el-button>
    </div>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="图片" width="180">
                <template #default="scope">
                    <img :src="scope.row.img" alt="" style="width: 50px;">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" width="" />
            <el-table-column prop="classify" :formatter="classifyFormat" label="分类" width="" />
            <el-table-column prop="price" label="价格" width="" />
            <el-table-column prop="isNew" :formatter="isNewFormat" label="新品" width="" />
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
    <el-dialog v-model="dialogFormVisible" title="添加商品">
        <el-form :model="dialogForm">
            <el-form-item label="图片" label-width="60px">
                <el-upload class="avatar-uploader" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="dialogForm.img" :src="dialogForm.img" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="名称" label-width="60px">
                <el-input v-model="dialogForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="分类" label-width="60px">
                <el-cascader v-model="dialogForm.classify" :options="classifyList" @change="dialogHandleChange" placeholder="请选择商品分类" />
            </el-form-item>
            <el-form-item label="新品" label-width="60px">
                <el-radio-group v-model="dialogForm.isNew" class="ml-4">
                    <el-radio label="0" size="large">否</el-radio>
                    <el-radio label="1" size="large">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="价格" label-width="60px">
                <el-input v-model="dialogForm.price" autocomplete="off" />
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
</style>
<style lang="less">
.goods{
    	.el-form-item__label {
		width: 80px !important;
	}
}
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
