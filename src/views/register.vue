<template>
    <div class="bg-div">
        <el-row>
            <el-col :xs="{span:24,offset:0}" :sm="{span:15,offset:4}" :lg="{span:12,offset:6}">
                <el-form :model="registerForm" status-icon label-width="100px" class="registerForm" ref="registerForm" :rules='rules'>
                    <el-form-item label="账号" prop="account">
                        <el-input v-model="registerForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="name">
                        <el-input v-model="registerForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass">
                        <el-input v-model="registerForm.pass" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input v-model="registerForm.checkPass" type="password"></el-input>
                    </el-form-item> 

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('registerForm')"  v-loading.fullscreen.lock="fullscreenLoading">提交</el-button>
                        <el-button type="primary" @click="resetForm('registerForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'register',
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
                if (this.registerForm.checkPass !== '') {
                    this.$refs.registerForm.validateField('checkPass')
                }
                callback();
            }
        };
        var validataPass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            }
            else if (value !== this.registerForm.pass) {
                callback(new Error('两次输入密码不一致'));
            }
            else {
                callback();
            }
        }
        return{
            registerForm: {
                account: '',
                pass: '',
                checkPass: '',
                name:''
            },
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
        resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.fullscreenLoading = true;
                    // this.axios.post('/users/user/register?username='+this.registerForm.account+
                    // '&name='+this.registerForm.name+'&password='+this.registerForm.pass
                    this.axios.post('/users/user/register',this.qs.stringify({
                            username: this.registerForm.account,
                            name: this.registerForm.name,
                            password: this.registerForm.pass,
                        })
                    )
                    .then( (respose) => {
                        this.fullscreenLoading = false;
                        console.log(respose);
                        if(respose.data.msg=="用户已存在"){
                            this.$message.error('用户已存在');
                        }else{
                            this.$message.success('注册成功');
                            this.$router.push({ path: '/'});
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
        }
    }
    
}
</script>
<style>
.bg-div{
    height:100%;
}
.registerForm {
        width: 60%;
        margin: 25% auto;
    }
</style>