<template>
    <div>
        <el-row class="top">
            <el-col :xs="6" :sm="6" :md="6" :lg="6"> 
                <el-image :src="logoSrc" class="logo-image" id="category" @click="changeCode(1)">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="10"> 
                <div>
                <el-input v-model="input" placeholder="请输入搜索内容" prefix-icon="el-icon-search" class="search-input"></el-input>
                <el-button type="primary" @click="search(input)">搜索</el-button>
                </div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="4"> 
                <el-button id="shoppingCart" class="shoppingCart-btn" type="primary" @click="changeCode(2)">购物车</el-button>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="4"> 
                <el-image :src="userSrc" class="user-image" @click="personal()">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
                <!-- <avatar username="Jane Doe"></avatar> -->
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <category v-if="componentExchangeCode == 1 && hackReset==true" @transferCode="changeCode" @transferId="transferId"></category>
                <shopping-cart v-if="componentExchangeCode == 2" @transferComponent="changeCode" @addOrder="addOrder" @backToCart="backToWhich"></shopping-cart>
                <book-detail v-if="componentExchangeCode == 3" :bookid="bookid" @changeComponent="changeCode" @buy="addOrder" @backToDetail="backToWhich"></book-detail>
                <add-order v-if="componentExchangeCode == 4" :orderAdd="order" @back="changeCode" :backToWhich='backVar'></add-order>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// import Avatar from 'vue-avatar/dist/Avatar'
import category from '../components/category'
import shoppingCart from '../components/shoppingCart'
import bookDetail from '../components/bookDetail'
import addOrder from '../components/addOrder'

export default {
    name:'main',
    data(){
        return {
            input:'',
            logoSrc:'http://img2.imgtn.bdimg.com/it/u=168577944,2704766384&fm=26&gp=0.jpg',
            userSrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582559980684&di=456abe524d8dd996422714c67a8f3fe6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201804%2F06%2F20180406192512_xfnyw.jpeg',
            componentExchangeCode:1,
            hackReset:true,
            order:[],
            bookid:'',
            backVar:''
        }
    },
    methods:{
        changeCode(code) {
            this.componentExchangeCode = code;
        },
        personal(){
            this.$router.push({ path: '/personal' });
        },
        search(input){
            input=this.input;
            console.log(input)
            //请求
            //刷新
            this.hackReset = false;
	      	this.$nextTick(() => {
	       		this.hackReset = true
	      	})
        },
        addOrder(data){
            this.order=data;
        },
        transferId(data){
            this.bookid=data;
        },
        backToWhich(data){
            this.backVar=data;
        }
    },
    created:function(){
        //请求

    },
    components:{
        category,
        shoppingCart,
        bookDetail,
        addOrder
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
    width: 30%;
}
</style>