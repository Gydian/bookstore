<template>
    <div>
        <div class="detail">
            <el-row>
                <el-col :span="24" v-for="one in book" :key="one">
                    <div class="block">
                        <el-image :src="one.image" class="image">
                        <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                        </div>
                        </el-image>
                        <div>
                            <span class="header">{{one.name}}</span>
                            <span class="author">{{one.author}}</span>
                            <span class="content">{{one.description}}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="bottom" v-for="one in book" :key="one">
                    <div class="infoPanel">
                        <span class="otherInfo">价格：{{one.price}}</span>
                        <span class="otherInfo">出版社：{{one.press}}</span>
                        <span class="otherInfo">类别：{{one.sort}}</span>
                        <span class="otherInfo">余量：{{one.stock}}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-button type="primary" class="btn" @click="addToCart()">加到购物车</el-button>
        <el-button type="primary" class="btn" @click="checkout()">直接购买</el-button>
    </div>
</template>
<script>
export default {
    name:'bookDetail',
    data(){
        return{
            book:[],
            order:[],
        }
    },
    props:[
        'bookid'
    ],
    mounted:function(){
        var that = this;
        this.axios.get('/books/aBook/'+that.bookid)
            .then(function (response) {
                console.log(response);
                let res = response.data;
                that.book = res.data;
                console.log(that.book);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods:{
        addToCart(){
            // this.$emit('transferBook',book);//直接加到数据库
            this.$message({
                message: '已添加至购物车！',
                type: 'success'
            });
        },
        checkout(){
            this.$emit('changeComponent',4);
            this.order=[{uuid:this.book[0].uuid,name:this.book[0].name,price:this.book[0].price,count:1,image:this.book[0].image}];
            this.$emit('buy',this.order);
            this.$emit('backToDetail',"detail");
        }
    }
}
</script>
<style scoped>
.detail{
    height:500px;
    overflow:scroll;
    margin-top: 3%;
    margin-bottom: 1%;
    margin-left: 10%;
    margin-right: 10%;
    border: 1px solid lightgray;
}
.image{
    width:50%;
    height:30%;
    float: left;
}
.bottom{
    border-top: 1px solid lightgray;
    margin-bottom: 3%
}
.header{
    font-size: 32px;
    display: block;
    padding: 2%;
}
.author{
    display: block;
    font-size: 18px;
}
.content{
    display: block;
    font-size: 18px;
}
.otherInfo{
    display: block;
    font-size: 14px;
}
.infoPanel{
    margin-top: 3%
}
.btn{
    width: 10%;
}
</style>