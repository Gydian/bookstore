<template>
    <div>
        <el-tabs class="category-div">
            <el-tab-pane label="全部">
                <div>
                    <ul class="bookList">
                        <li v-for="book in allbooks" :key="book">
                            <span class="" @click="toDetail(book)"><img :src="book.image" width=100%></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane label="小说">
                <div>
                    <ul class="bookList">
                        <li v-for="book in novel" :key="book">
                            <span class="" @click="toDetail(book)"><img :src="book.image" width=100%></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane label="育儿">育儿</el-tab-pane>
            <el-tab-pane label="艺术">艺术</el-tab-pane>
            <el-tab-pane label="历史">历史</el-tab-pane>
            <el-tab-pane label="教辅">教辅</el-tab-pane>
            <el-tab-pane label="管理">管理</el-tab-pane>
            <el-tab-pane label="哲学">哲学</el-tab-pane>
            <el-tab-pane label="科技">科技</el-tab-pane>
            <el-tab-pane label="健康">健康</el-tab-pane>
            <!-- all novel parenting art history education management philosophy technology health -->
        </el-tabs>
    </div>
</template>
<script>
export default {
    name:'category',
    data(){
        return{
            allbooks:[],
            novel:[],
        }
    },
    props:[
        
    ],
    methods:{
        addToCart(book){
            this.$emit('transferBook',book);
            this.$message({
                message: '已添加至购物车！',
                type: 'success'
            });
        },
        toDetail(book){
            this.$emit('transferCode',3);
        },
    },
    mounted:function(){
        var that = this;
        this.axios.get('/books/allBook/all')
            .then(function (response) {
                console.log(response);
                let res = response.data;
                that.allbooks = res.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        //novel
        this.axios.get('/books/allBook/all')
            .then(function (response) {
                console.log(response);
                let res = response.data;
                that.novel = res.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>
<style scoped>
.category-div{
    margin-left: 2%;
    margin-right: 2%;
}
.bookImage{
    width: 10%
}
.bookList li{
    list-style: none;
    width: 13%;
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
    font-size: 18px;
    text-align: center;
}
.bookPrice{
    font-size: 16px;
    display: block;
    text-align: center;
}
.iconfont{
    font-size: 24px;
    padding-left: 10%;
}
</style>