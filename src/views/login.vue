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
            }
        }
    },
    methods:{
        login(){
            this.$router.push({ path: '/main' });
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