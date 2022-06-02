<script setup lang="ts">
import { storeToRefs } from "pinia"
import { userStore } from "../store";
import { Right } from '@element-plus/icons-vue'
import { modifyPwd } from '../../utils/api'
const router = useRouter();
const store = userStore();
let { token, username } = storeToRefs(store);
let form = reactive({
    oldPwd: '',
    newPwd: ''
})
let dialogFormVisible = ref(false)
// 退出登录
const exit = () => {
    token.value = ''
    router.push({ path: '/login' })
}
// 修改密码
const modifyConfirm = () => {
    modifyPwd({username:username.value, ...form}).then(res => {
        ElMessage.success('修改成功，请重新登录')
        setTimeout(() => {
            router.push({ path: '/login' })
        }, 1000)
    })
}
</script>

<template>
    <div class="header">
        <div class="row">
            <img src="../assets/avatar.jpeg" alt="" class="avatar">
            <p>{{ username }}</p>
            <p @click="dialogFormVisible = true" class="change-pwd">修改密码</p>
            <div @click="exit" class="exit-box row">
                <el-icon class="exit-icon">
                    <Right />
                </el-icon>
                <p class="exit">退出登录</p>
            </div>

        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="修改密码">
        <el-form :model="form">
            <el-form-item label="原密码" label-width="60px">
                <el-input v-model="form.oldPwd" autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" label-width="60px">
                <el-input v-model="form.newPwd" autocomplete="off" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="modifyConfirm">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped lang="less">
.header {
    width: 100%;
    padding: 10px 50px;
    background-color: #cbdbe5;
    box-sizing: border-box;
    .row{
        justify-content: flex-end;
    }
    .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .change-pwd {
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
</style>
