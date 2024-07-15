<template>
    <div class="user-view">
        <el-card class="box-card" v-loading="loading" v-if="user">
            <div slot="header" class="clearfix">
                <span>用户信息</span>
            </div>
            <el-form :model="user" status-icon :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="user.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="admin">
                    <el-radio-group v-model="user.admin">
                        <el-radio :label="true">管理员</el-radio>
                        <el-radio :label="false">普通用户</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="部门" prop="department">
                    <el-input v-model="user.department"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="user.phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>

</template>

<style scoped>
.user-view {
    display: flex;
    justify-content: center;
}

.box-card {
    flex-basis: 700px;
}
</style>

<script>
import axios from '@/axios'

export default {
    data() {
        return {
            loading: true,
            user: {
                id: 0,
                username: '',
                admin: false,
                phone: '',
                department: '',
            },
            rules: {
                phone: [
                    { required: true, message: '请填写联系电话', trigger: 'blur' }
                ],
                department: [
                    { required: true, message: '请填写部门名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.patch('/user/profile', this.user).then((res) => {
                        this.$message.success("修改成功")
                        Object.assign(this.user, res.data.data)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    beforeMount() {
        axios.get('/user/profile').then(res => {
            Object.assign(this.user, res.data.data)
            console.log(this.user)
            this.loading = false
        })
    }
}
</script>