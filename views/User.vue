<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-form :inline="true" :rules="rules" ref="form" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handleAdd()" type="primary">
                + 新增
            </el-button>
            <el-form :model="userForm" :inline="true">
                <el-form-item>
                    <el-input v-model="userForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="manage-table">
            <el-table :data="tableData" stripe style="width: 100%" height="90%">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!-- 分页器 -->
            <div class="pager">
                <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
                </el-pagination>
            </div>

        </div>

    </div>

</template>
<script>
import { getUser, addUser, editUser, deleteUser } from "../api";
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                age: [
                    { required: true, message: '请输入年龄' }
                ],
                sex: [
                    { required: true, message: '请选择性别' }
                ],
                birth: [
                    { required: true, message: '请选择出生日期' }
                ],
                addr: [
                    { required: true, message: '请输入地址' }
                ],

            },
            tableData: [],
            modalType: 0,//0表示新增，1表示编辑
            total: 0,//当前数据的总条数
            pageData: {
                page: 1,
                limit: 10
            },
            userForm: {
                name: ''
            }
        }
    },
    methods: {
        // 提交信息
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //    处理表单数据
                    if (this.modalType === 0) {
                        addUser(this.form).then(() => {
                            this.getList()
                        })
                    } else {
                        editUser(this.form).then(() => {
                            this.getList()
                        })
                    }
                    // 清空表单数据
                    this.$refs.form.resetFields()
                    // 关闭弹窗
                    this.dialogVisible = false
                }
            })
        },
        // 点击新增
        handleAdd() {
            this.modalType = 0
            this.dialogVisible = true
        },
        // 关闭弹窗
        handleClose() {
            // 清空表单数据
            this.$refs.form.resetFields();
            // 关闭弹窗
            this.dialogVisible = false
        },
        // 弹窗取消
        cancel() {
            this.handleClose()
        },
        // 编辑
        handleEdit(row) {
            this.modalType = 1
            this.dialogVisible = true
            // 把数据回传，注意需要对数据进行深拷贝，否者会出错
            this.form = JSON.parse(JSON.stringify(row))

        },
        // 删除
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteUser({ id: row.id }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })
                // 重新获取列表接口
                this.getList()

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        // 获取表单数据
        getList() {
            getUser({ params: { ...this.userForm, ...this.pageData } }).then(({ data }) => {
                console.log(data, '999999999999')
                this.tableData = data.list
                this.total = data.count || 0
            })
        },
        //选择页码的回调函数
        handlePage(val) {
            // console.log(val,'val');
            this.pageData.page = val
            this.getList()
        },
        // 列表查询
        onSubmit(){
            this.getList()
        }

    },
    mounted() {
        this.getList()
    }
}
</script>
<style lang="less" scoped>
.manage {
    height: 90%;
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .manage-table {
        position: relative;
        height: calc(100% - 62px);

        .pager {
            position: absolute;
            right: 20px;
            bottom: 0;
        }
    }
}
</style>