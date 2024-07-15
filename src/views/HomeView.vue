<template>
    <div class="home-view">
        <el-card class="box-card">
            <div slot="header">
                <span>{{ isLogin ? '登录' : '注册' }}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="isLogin = !isLogin">
                    {{ isLogin ? '注册' : '登录' }}
                </el-button>
            </div>
            <LoginForm v-if="isLogin"></LoginForm>
            <RegisterForm v-else></RegisterForm>
        </el-card>
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

export default {
    data() {
        return {
            isLogin: true
        }
    },
    components: {
        LoginForm,
        RegisterForm
    }
}
</script>

<style scoped>
.home-view {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(45deg, #0080ff, #12ccc3);
}

.box-card {
    width: 500px;
}
</style>