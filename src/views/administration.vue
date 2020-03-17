<template>
    <div>
        <el-row class="top">
            <el-col :xs="6" :sm="6" :md="6" :lg="6"> 
                <el-image :src="logoSrc" class="logo-image" id="category">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" id="menu" class="menu">
                <el-menu class="el-menu-vertical-demo" :default-active="this.$router.path" router>
                    <el-menu-item index="/administration/bookManage">
                        <i class="el-icon-document"></i>
                        <span slot="title">书目管理</span>
                    </el-menu-item>
                    <el-menu-item index='/administration/accountManage'>
                        <i class="el-icon-setting"></i>
                        <span slot="title">账号管理</span>
                    </el-menu-item> 
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>数据统计</span>
                        </template>
                        <el-menu-item-group title="账号统计表">
                            <el-menu-item index="/administration/registerStatistic">注册统计</el-menu-item>  
                        </el-menu-item-group>
                        <el-menu-item-group title="书目统计表">
                            <el-menu-item index="/administration/totalBookStatistic">总数统计</el-menu-item>  
                            <el-menu-item index="/administration/newBookStatistic">上新统计</el-menu-item>  
                            <el-menu-item index="/administration/salesStatistic">销量统计</el-menu-item>  
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <router-view/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'administration',
    data(){
        return{
            logoSrc:'./static/logoBCL.png',
            activeIndex: '/administration/bookManage'

        }
    },
    mounted:function(){
         var screenHeight = document.body.clientHeight;
        var screenWidth = document.body.clientWidth;
        document.getElementById("menu").style.height = screenHeight + "px";
    }
}
</script>
<style scoped>
.top{
    border-bottom: 1px solid lightgray;
}
.logo-image{
    width: 30%;
}
.menu{
    border: 1px solid lightgray;
    border-top: none;
    overflow:scroll;
    margin-bottom: 2%;
}
.el-menu{
    border: none;
}
</style>