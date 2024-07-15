<template>
    <div class="tool-view">
        <el-table :data="tableData" v-loading="tableDataLoading">
            <el-table-column prop="id" label="id">
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="description" label="描述">
            </el-table-column>
            <el-table-column prop="specs" label="规格">
            </el-table-column>
            <el-table-column prop="number" label="数量">
            </el-table-column>
            <el-table-column prop="toolCategory.name" label="分类">
            </el-table-column>
            <el-table-column prop="toolVendor.name" label="供应商">
            </el-table-column>
            <el-table-column label="操作" width="160px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-plus" circle @click="openAddDialog"></el-button>
                    <el-button type="success" icon="el-icon-edit" circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteTool(scope.row.id)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dialogTitle" width="40%" :visible.sync="dialogVisible" :before-close="confirmCloseDialog">
            <el-form :model="tool" status-icon :rules="rules" ref="toolForm" label-width="100px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="tool.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="tool.description" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="规格" prop="specs">
                    <el-input v-model="tool.specs"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="number">
                    <el-input-number v-model="tool.number" :min="1" :max="100000"></el-input-number>
                </el-form-item>
                <el-form-item label="分类" prop="categoryId">
                    <el-select v-model="tool.categoryId" placeholder="请选择分类" @visible-change="getCategoryOptions"
                        :loading="getCategoryOptionsLoading">
                        <el-option v-for="category in categoryOptions" :key="category.id" :label="category.name"
                            :value="category.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商" prop="vendorId">
                    <el-select v-model="tool.vendorId" placeholder="请选择供应商" @visible-change="getVendorOptions"
                        :loading="getVendorOptionsLoading">
                        <el-option v-for="vendor in vendorOptions" :key="vendor.id" :label="vendor.name"
                            :value="vendor.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmCloseDialog">取消</el-button>
                <el-button type="primary" @click="submitForm('toolForm')">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<style scoped>
.tool-view {
    display: flex;
    justify-content: center;
}
</style>

<script>
import axios from '@/axios'

export default {
    data() {
        return {
            tableDataLoading: true,
            tableData: [],
            dialogVisible: false,
            dialogTitle: '',
            tool: {
                id: 0,
                name: "",
                description: "",
                categoryId: "",
                vendorId: "",
                specs: "",
                number: "",
            },
            rules: {
                name: [
                    { required: true, message: '请输入工具名称', trigger: 'blur' }
                ],
                description: [
                    { required: true, message: '请输入工具描述', trigger: 'blur' }
                ],
                specs: [
                    { required: true, message: '请输入工具规格', trigger: 'blur' }
                ],
                number: [
                    { required: true, message: '请输入工具规格', trigger: 'blur' }
                ],
                categoryId: [
                    { required: true, message: '请选择分类', trigger: 'blur' }
                ],
                vendorId: [
                    { required: true, message: '请选择供应商', trigger: 'blur' }
                ],
            },
            categoryOptions: [],
            getCategoryOptionsLoading: false,
            vendorOptions: [],
            getVendorOptionsLoading: false
        }
    },
    methods: {
        confirmCloseDialog() {
            this.$confirm('确认关闭？')
                .then(() => {
                    this.dialogVisible = false
                })
                .catch(() => { });
        },
        openAddDialog() {
            this.dialogTitle = '添加工具'
            this.dialogVisible = true
        },
        getCategoryOptions(show) {
            if (show) {
                this.categoryOptionsLoading = true
                this.categoryOptions = []
                axios.get("/tool-category/list").then(res => {
                    this.categoryOptions = res.data.data
                    this.categoryOptionsLoading = false
                })
            }
        },
        getVendorOptions(show) {
            if (show) {
                this.vendorOptionsLoading = true
                this.vendorOptions = []
                axios.get("/tool-vendor/list").then(res => {
                    this.vendorOptions = res.data.data
                    this.vendorOptionsLoading = false
                })
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.dialogTitle === '添加工具') {
                        axios.post('/tool', { ...this.tool, id: undefined })
                            .then(res => {
                                this.$message.success("添加成功")
                                this.dialogVisible = false
                                this.tableData.push(res.data.data)
                            })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        deleteTool(id) {
            this.$confirm('确认删除？id=' + id)
                .then(() => {
                    axios.delete("/tool", { data: { id } }).then((() => {
                        let index = this.tableData.findIndex(item => item.id === id)
                        this.tableData.splice(index, 1)
                        this.$message.success("删除成功")
                    }))
                })
                .catch(() => { });
        }
    },
    beforeMount() {
        axios.get('/tool/list').then(res => {
            this.tableData = this.tableData.concat(res.data.data)
            this.tableDataLoading = false
        })
    }
}
</script>