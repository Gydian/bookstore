<template>
    <div>
        <el-tabs class="category-div">
            <el-tab-pane label="全部">
                <div>
                    <ul class="bookList">
                        <li v-for="book in books" :key="book">
                            <span class="" @click="toDetail(book)"><img :src="book.bookImg" width=100%></span>
                            <span class="bookName" @click="toDetail(book)">{{book.bookName}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane label="小说">小说</el-tab-pane>
            <el-tab-pane label="育儿">育儿</el-tab-pane>
            <el-tab-pane label="艺术">艺术</el-tab-pane>
            <el-tab-pane label="历史">历史</el-tab-pane>
            <el-tab-pane label="教辅">教辅</el-tab-pane>
            <el-tab-pane label="管理">管理</el-tab-pane>
            <el-tab-pane label="哲学">哲学</el-tab-pane>
            <el-tab-pane label="科技">科技</el-tab-pane>
            <el-tab-pane label="健康">健康</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name:'category',
    data(){
        return{
            books:[{
              bookId:1,
              bookImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582630125376&di=b1034e8a884a7bca835c1394adb4c54e&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Fbmiddle%2Fd614cf54gy1gbj1cdlsdej20k00f0q7k.jpg",
              bookName:'人间失格',
              price:28
          }, {
              bookId:2,
              bookImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582630286690&di=a5f3489d9d3e3227bae051b6df27f4c7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F14%2F20181214235112_jbiio.thumb.700_0.jpg",
              bookName:'月亮与六便士',
              price:15
          }],
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
        }
    },
    mounted:function(){
        // this.axios.get('')
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
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