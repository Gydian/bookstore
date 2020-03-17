<template>
    <div>
        <el-row class="top-row"> 
            <el-image :src="logoSrc" class="logo-image" id="category" @click="index()">
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </el-row>
        <el-row>
            <el-col :span="4">
                <div class="left-nav" id="left-nav">
                    <ul>
                        <li @click="changeCode(1)">
                            <i class="icon iconfont icon-geren"></i>
                            <div>个人资料</div>
                        </li>
                        <li @click="changeCode(2)"> 
                            <i class="icon iconfont icon-shezhi"></i>
                            <div>购买记录</div>
                        </li>
                        <li @click="changeCode(3)">
                            <i class="icon iconfont icon-goumaijilu"></i>
                            <div>设置</div>
                        </li>
                    </ul>
                </div>
            </el-col>
            <el-col :span="20" class="scroll">
                <per-document v-if="componentExchangeCode == 1"></per-document>
                <order v-if="componentExchangeCode == 2"></order>
                <setting v-if="componentExchangeCode == 3"></setting>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import perDocument from '../components/perDocument'
import order from '../components/order'
import setting from '../components/setting'

export default {
    name:'personal',
    components:{
        perDocument,
        order,
        setting,

    },
    data(){
        return{
            logoSrc:'./static/logoBCL.png',
            componentExchangeCode:1,
        }
    },
    methods:{
        index(){
            this.$router.push({ path: '/main' });
        },
        changeCode(code) {
            this.componentExchangeCode = code;
        },
    },
    mounted: function () {
        var screenHeight = document.body.clientHeight;
        document.getElementById("left-nav").style.height = screenHeight + "px";

        var storage = window.localStorage;
        console.log(storage)
    }
}
</script>
<style scoped>
.logo-image{
    width: 6%;
    float: left;
    margin: 1%;
}
.top-row{
    border-bottom: 1px solid gray;
}
.left-nav{
    color:#fff;
    font-size: 10px;
    height: 100%;
    background-color: #1D8ce0;
    float: left;
}

.iconfont{
    font-size: 24px;
}

.left-nav ul{
    padding: 0px;
    margin: 0px;
}

.left-nav li{
    list-style: none;
    text-align: center;
    bottom: 1px solid #20a0ff;
    padding: 10px;
    margin-top: 10%;
}
.scroll{
    overflow: scroll;
}
</style>