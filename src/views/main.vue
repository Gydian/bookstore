<template>
    <div>
        <el-row class="top">
            <el-col :xs="6" :sm="6" :md="6" :lg="6"> 
                <el-image :src="logoSrc" class="logo-image">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="10"> 
                <div>
                <el-input v-model="input" placeholder="请输入搜索内容" prefix-icon="el-icon-search" class="search-input"></el-input>
                </div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="4"> 
                <el-button class="shoppingCart-btn" type="primary" v-loading.fullscreen.lock="fullscreenLoading">购物车</el-button>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="4"> 
                <el-image :src="userSrc" class="user-image">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </el-col>
        </el-row>

        <el-row>
            <el-col>
                <el-tabs>
                    <el-tab-pane label="育儿">
                        <div>
                            <ul class="foodList">
                                <!-- <li v-for="food in typeOfFood" :key="food" @click="addOrderList(food)">
                                    <span class="foodImg"><img :src="food.goodsImg" width=100%></span>
                                    <span class="foodName">{{food.goodsName}}</span>
                                    <span class="foodPrice">¥{{food.price}}元</span>
                                </li> -->
                            </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="小说">小说</el-tab-pane>
                    <el-tab-pane label="艺术">艺术</el-tab-pane>
                    <el-tab-pane label="历史">历史</el-tab-pane>
                    <el-tab-pane label="教辅">教辅</el-tab-pane>
                    <el-tab-pane label="管理">管理</el-tab-pane>
                    <el-tab-pane label="哲学">哲学</el-tab-pane>
                    <el-tab-pane label="科技">科技</el-tab-pane>
                    <el-tab-pane label="健康">健康</el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'main',
    data(){
        return {
            fullscreenLoading: false,
            input:'',
            logoSrc:'http://img2.imgtn.bdimg.com/it/u=168577944,2704766384&fm=26&gp=0.jpg',
            userSrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582559980684&di=456abe524d8dd996422714c67a8f3fe6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F06%2F20180406192512_xfnyw.jpeg'
        }
    },
    methods:{

    }
}
</script>
<style scoped>
.logo-image{
    width: 30%;
}
.top{
    margin-top: 2%
}
.shoppingCart-btn{
    float: right;
}
.search-input{
    width: 60%;
}
.user-image{
    width: 50%;
}
</style>