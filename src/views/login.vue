<script setup lang="ts">
import { register, login } from '../../utils/api'
import { storeToRefs } from "pinia"
import { userStore } from "../store";

const store = userStore();
let { token, username } = storeToRefs(store);
const router = useRouter();

const tabList = reactive([
    { index: 0, text: '登录' },
    { index: 1, text: '注册' }
])
// 选择登录or注册
let activeIndex = ref(0)
const handleSelect = (idx) => {
    activeIndex.value = idx
}
// 登陆注册
let loginUsername = ref('')
let regUsername = ref('')
let loginPwd = ref('')
let regPwd = ref('')
let email = ref('')
// 注册
const registerClick = () => {
    if (!regUsername.value) {
        ElMessage.error('请输入用户名')
        return
    }
    if (!regPwd.value) {
        ElMessage.error('请输入密码')
        return
    }
    if (!email.value) {
        ElMessage.error('请输入邮箱')
        return
    }
    const regEmail = /^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{0,}$/;
    if (!regEmail.test(email.value)) {
        ElMessage.error('邮箱格式错误')
        return
    }
    register({
        username: regUsername.value,
        password: regPwd.value,
        email: email.value
    }).then(res => {
        ElMessage.success('注册成功，请登录')
    })
}

// 登录
const loginClick = () => {
    if (!loginUsername.value) {
        ElMessage.error('请输入用户名')
        return
    }
    if (!loginPwd.value) {
        ElMessage.error('请输入密码')
        return
    }
    login({
        username: loginUsername.value,
        password: loginPwd.value,
    }).then(res => {
        token.value = res.token;
        username.value = res.username;
        ElMessage.success('登陆成功')
        setTimeout(() => {
            router.push({ path: '/home' });
        }, 1000)
    })
}
</script>

<template>
    <div class="login-main center">
        <div class="login-box">
            <div class="tabs row">
                <div @click="handleSelect(index)" :class="['tab-item', activeIndex == index ? 'active-tab' : '']" v-for="(item, index) in tabList" :key="index">{{ item.text }}</div>
            </div>
            <div v-show="activeIndex == 0" class="column">
                <el-input v-model="loginUsername" placeholder="请输入账号" />
                <form>
                    <el-input v-model="loginPwd" type="password" placeholder="请输入密码" />
                </form>
                <el-button @click="loginClick" type="primary">登录</el-button>
            </div>
            <div v-if="activeIndex == 1" class="column">
                <el-input v-model="regUsername" placeholder="请输入账号" />
                <form>
                    <el-input v-model="regPwd" type="password" placeholder="请输入密码" />
                </form>
                <el-input v-model="email" placeholder="请输入邮箱" />
                <el-button @click="registerClick" type="primary">注册</el-button>
            </div>
        </div>

    </div>
</template>

<style lang="less">
.login-main {
    width: 100%;
    height: 100vh;
    background: url('../assets/bg.jpg') no-repeat;
    background-size: cover;

    .tabs {
        align-items: center;
        justify-content: space-around;
    }

    .tab-item {
        padding: 0 0 20px;
        width: 30%;
        text-align: center;
        color: #fff;
        border-bottom: 2px solid transparent;
        margin-bottom: 30px;
        font-size: 18px;
    }

    .tab-item:hover {
        cursor: pointer;
    }

    .active-tab {
        color: #409eff;
        border-bottom: 2px solid #409eff;
    }

    .login-box {
        width: 30%;
        padding: 30px 20px;
        background: rgba(225, 225, 225, 0.5);
        border-radius: 20px;

        form {
            width: 100%;
        }

        .el-input__wrapper {
            margin-bottom: 30px;
            height: 40px;
            background: rgba(0, 0, 0, 0.6);

            .el-input__inner {
                color: #fff;
            }
        }

        .el-button {
            width: 100%;
        }
    }
}
</style>
