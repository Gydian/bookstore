<template>
    <div>
        <el-row>
            <el-col :span="20" :offset="2" class="top">
                <span class="header">一共有{{transferResult.length}}条搜索结果:</span>
            </el-col>
        </el-row>
        <el-row> 
            <el-col :span="20" :offset="2" class="center">
                <ul class="bookList">
                    <li v-for="book in transferResult" :key="book.uuid">
                        <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                        <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                        <span class="bookPrice">¥{{book.price}}元
                            <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                        </span>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <el-row> 
            <el-col :span="20" :offset="2">
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:[
        'transferResult'
    ],
    methods:{
        addDirectly(book){
            this.axios.post('/shoppingCart/wqx?bookId='+book.uuid+'&num=1&singlePrice='+
                book.price+'&image='+book.image+'&name='+book.name)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                this.$message({
                        message: '已添加至购物车！',
                        type: 'success'
                    });
        },
        addToCart(book){
            var that=this;
            this.axios.get('/shoppingCart/wqx')
            .then(function (response) {
                console.log(response);
                let res = response.data;
                let tableData = res.data;
                let arry=tableData.filter(o => o.bookId==book.uuid);
                if(arry!=''){
                    that.$message({
                            message: '已经加到购物车了哦！',
                            type: 'error'
                        });
                }
                else{
                    that.addDirectly(book);
                    }
                })
            .catch(function (error) {
                console.log(error);
            });
            
        },
        toDetail(book){
            this.$emit('transferId',book.uuid);
            this.$emit('transferCode',3);
        },
    }
}
</script>
<style scoped>
.top{
    border-top: 1px solid lightgray;
    margin-top: 2%;
}
.center{
    height: 500px;
}
.header{
    display: block;
    float: left;
    font-size: 18px;
    margin: 2%;
}
.bookList li{
    list-style: none;
    width: 10%;
    border: 1px solid #e5e9f2;
    height:auto;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 10px;
    cursor: pointer;
    text-align: center;
}
.bookName{
    font-size: 14px;
    text-align: center;
    display: block;
}
.bookPrice{
    font-size: 14px;
    display: block;
    text-align: center;
    width: 100px;
    padding-left: 15%
}
.bookImg{
    width:90px;
    height:90px;
}
.iconfont{
    font-size: 20px;
    padding-left: 8%;
}
</style>