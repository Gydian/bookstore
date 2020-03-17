<template>
    <div>
        <h2 class="textPos">新增管理员账户</h2>
        <el-row>
            <el-col :xs="{span:24,offset:0}" :sm="{span:15,offset:4}" :lg="{span:12,offset:6}">
                <el-form :model="addAccountForm" status-icon label-width="100px" class="addAccountForm" ref="addAccountForm" :rules='rules'>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="addAccountForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="addAccountForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input v-model="addAccountForm.pass" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input v-model="addAccountForm.checkPass" type="password"></el-input>
                    </el-form-item> 

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('addAccountForm')"  v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
                        <el-button @click="resetForm('addAccountForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'accountManage',
    data(){
        var checkAccount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'));
            }
            else {
                callback();
            }
        };
        var validName=(rule,value,callback)=>{
            if(!value){
                return callback(new Error('昵称不可为空'));
            }else{
                callback();
            }
        };
        var validataPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error('请输入密码'));
            }
            else{
                if (this.addAccountForm.checkPass !== '') {
                    this.$refs.addAccountForm.validateField('checkPass')
                }
                callback();
            }
        };
        var validataPass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            }
            else if (value !== this.addAccountForm.pass) {
                callback(new Error('两次输入密码不一致'));
            }
            else {
                callback();
            }
        }

        return{
            dialogFormVisible: false,
            addAccountForm: {
                account:'',
                name: '',
                pass:'',
                checkPass:'',
            },
            // formLabelWidth: '60px',
            fullscreenLoading: false,
            rules: {
                pass: [
                    { validator: validataPass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validataPass2, trigger: 'blur' }
                ],
                account: [
                    { validator: checkAccount, trigger: 'blur' }
                ],
                name: [
                    { validator: validName, trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        resetForm(accountForm){
             this.$refs[accountForm].resetFields();
        },
        // 添加接口
        submitForm(accountForm){
            this.$refs[accountForm].validate((valid) => {
                if (valid) {
                    this.fullscreenLoading = true;
                    this.axios.post('/users/administrator/register',this.qs.stringify({
                            username: this.addAccountForm.account,
                            name: this.addAccountForm.name,
                            password: this.addAccountForm.pass,
                        })
                    )
                    .then( (respose) => {
                        this.fullscreenLoading = false;
                        console.log(respose);
                        if(respose.data.msg=="用户已存在"){
                            this.$message.error('用户已存在');
                        }else{
                            this.$message.success('添加成功');
                        }
                    })
                    .catch( (error) => {
                        this.fullscreenLoading = false;
                        console.log(error);
                    } )
                }
                else{
                    console.log('error submit');
                    return false;
                }
            })
            this.dialogFormVisible = false;
        }
    }
}
</script>
<style scoped>
.textPos{
    margin-left: 10px auto;
}
    .addAccountForm {
        width: 60%;
        margin: 5% auto;
    }
</style>