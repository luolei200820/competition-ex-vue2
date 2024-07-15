<template>
    <el-container class="dashboard-view">
        <el-aside width="200px">
            <DashboardMenu></DashboardMenu>
        </el-aside>
        <el-container>
            <el-header class="dashboard-header">
                <span>退出登录&nbsp;</span>
                <el-button icon="el-icon-right" circle @click="logout"></el-button>
            </el-header>
            <el-main class="dashboard-main">
                <router-view></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>

<style scoped>
.dashboard-view {
    width: 100vw;
    height: 100vh;
}

.dashboard-header,
.dashboard-main {
    border-bottom: solid 1px #e6e6e6;
}

.dashboard-header {
    display: flex;
    align-items: center;
    justify-content: end;
}
</style>


<script>
// import axios from '@/axios';
import DashboardMenu from '@/components/DashboardMenu.vue'

export default {
    data() {
        return {
        };
    },
    methods: {
        logout() {
            localStorage.removeItem("token")
            this.$message.success("退出登录成功")
            this.$router.push("/")
        }
    },
    components: {
        DashboardMenu
    }
}
</script>