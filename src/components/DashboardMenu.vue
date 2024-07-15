<template>
    <el-menu :default-active="$route.path" class="dashboard-menu" router>
        <el-menu-item index="/dashboard/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户信息</span>
        </el-menu-item>

        <el-submenu index="manage-info">
            <template slot="title">
                <span>信息管理</span>
            </template>
            <el-menu-item index="/dashboard/tool">工具</el-menu-item>
            <el-menu-item index="/dashboard/tool-category">工具分类</el-menu-item>
            <el-menu-item index="/dashboard/tool-vendor">工具供应商</el-menu-item>
        </el-submenu>


        <el-submenu index="tool-borrow-return">
            <template slot="title">
                <span>工具借用管理</span>
            </template>

            <el-menu-item-group title="借用">
                <el-menu-item index="/dashboard/borrow">借用申请</el-menu-item>
                <el-menu-item index="/dashboard/borrow-approvement">借用审批</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group title="归还">
                <el-menu-item index="/dashboard/return">归还申请</el-menu-item>
                <el-menu-item index="/dashboard/return-approvement">归还审批</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

        <!-- <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item> -->
    </el-menu>
</template>

<style scoped>
.dashboard-menu {
    height: 100%;
}
</style>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>