<template>
    <div class="detail">
        <el-row>
            <el-col :span="20" :offset="2" v-for="one in book" :key="one.uuid">
                <div class="block">
                    <el-image :src="one.image" class="image">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                    </el-image>
                </div>
                <div class="middle">
                    <span class="header">{{one.name}}</span>
                    <span class="author">{{one.author}}</span>
                    <span class="content">{{one.description}}</span>
                </div>
                <div class="infoPanel">
                    <span class="otherInfo">价格：{{one.price}}</span>
                    <span class="otherInfo">出版社：{{one.press}}</span>
                    <span class="otherInfo">类别：{{one.sort}}</span>
                    <span class="otherInfo">余量：{{one.stock}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-button class="btn">编辑</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'bookDetail',
    data(){
        return{
            book:[],
            changeInfo:{
                name:''
            }
        }
    },
    mounted:function(){
        console.log(this.$route.params.id)
        var that = this;
        this.axios.get('/books/aBook/'+this.$route.params.id)
            .then(function (response) {
                console.log(response);
                let res = response.data;
                that.book = res.data;
                console.log(that.book)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>
<style scoped>
.detail{
    height:650px;
    overflow:scroll;
}
.image{
    width:40%;
    height:20%;
    float: left;
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
    margin-top: 15%
}
.middle{
    margin-top: 5%;
}
.btn{
    width: 20%;
    margin-top: 2%;
}
</style>