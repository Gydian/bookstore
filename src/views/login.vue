<template>
    <div :style="bg">
        <el-row>
            <el-col :xs="10" :sm="12" :md="14" :lg="16">
                <div id="logo-div">
                </div>
            </el-col>
            <el-col :xs="14" :sm="12" :md="10" :lg="8" class="input-div">
                <div id="input-div" >
                    <el-card class="box-card" id="loginBox">
                        <div>
                            <span>账号：</span>
                            <el-input v-model="ID" placeholder="请输入账号" class="loginInupt"></el-input>
                        </div>
                        <div>
                            <span>密码：</span>
                            <el-input v-model="PWD" placeholder="请输入密码" class="loginInupt" show-password></el-input>
                        </div>
                        <el-button type="primary" @click="login()" v-loading.fullscreen.lock="fullscreenLoading">
                            登录</el-button>
                        <el-button type="primary" @click="register()">注册</el-button>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
    name:'login',
    data(){
        return{
            ID:'',
            PWD:'',
            fullscreenLoading: false,
            bg:{
                backgroundImage: "url(" + require("../assets/login.png") + ") ",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
        }
    },
    methods:{
        ...mapMutations(['setToken']),
        login() {
            // this.$router.push({ path: '/main' });
            let _this = this;
            if (this.ID == '' || this.PWD == '') {
                this.$alert('请输入账号或者密码', '提示', {
                    confirmButtonText: '确定'
                });
            }
            else {
                this.fullscreenLoading = true;
                this.axios.get('/users/user/login?username='+this.ID+'&password='+this.PWD)
                    .then((response) => {
                        this.fullscreenLoading = false;
                        console.log(response);
                        if (response.data.code == 200) {
                            //保存token username
                            _this.$message.success('登录成功');
                            _this.token = response.data.data[0].token;
                            _this.userName = this.ID;
                            _this.position = response.data.data[0].position
                            _this.setToken({ token: _this.token , name:_this.userName, position:_this.position})
                            console.log(localStorage)

                            // 验证token
                            var storage = window.localStorage;
                            if (this.$store.state.token) {
                                if(response.data.data[0].position=="ordinaryuser"){
                                    this.$router.push({ path: '/main' });
                                }else if(response.data.data[0].position=="administrator"){
                                    this.$router.push({ path:'/administration/bookManage' });
                                }
                            } else {
                                this.$router.push({ path: '/' });
                            }
                        }
                        else {
                            this.$alert(response.data.msg, '提示', {
                                confirmButtonText: '确定'
                            });
                        }
                    })
                    .catch((error) => {
                        this.fullscreenLoading = false;
                        console.log(error);
                    });

                
                }
            },
        register(){
            this.$router.replace('/register');
        }
    },
    mounted: function () {
        var screenHeight = document.body.clientHeight;
        var screenWidth = document.body.clientWidth;
        document.getElementById("logo-div").style.height = screenHeight + "px";
        document.getElementById("input-div").style.height = screenHeight + "px";
        document.getElementById("loginBox").style.width = 80 + "%";
    }
}
</script>
<style>
.input-div{
    background-color:rgba(0, 0, 0, 0.2);
    height: 100%
}
.box-card {
    margin-top: 40%;
    margin-left: 10%
}
.box-card div {
    margin: 20px 0;
}
.loginInupt {
    display: inline-block;
    width: 80%;
}


</style>