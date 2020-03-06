<template>
    <div>
        <el-tabs class="category-div">
            <el-tab-pane label="全部">
                <div>
                    <ul class="bookList">
                        <li v-for="book in allbooks" :key="book">
                            <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
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
                            <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane label="育儿">
                <div>
                    <ul class="bookList">
                        <li v-for="book in parenting" :key="book">
                            <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane label="艺术">
                <div>
                    <ul class="bookList">
                        <li v-for="book in art" :key="book">
                            <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane label="历史"><div>
                    <ul class="bookList">
                        <li v-for="book in history" :key="book">
                            <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div></el-tab-pane>
            <el-tab-pane label="教辅"><div>
                    <ul class="bookList">
                        <li v-for="book in education" :key="book">
                            <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div></el-tab-pane>
            <el-tab-pane label="管理"><div>
                    <ul class="bookList">
                        <li v-for="book in management" :key="book">
                            <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div></el-tab-pane>
            <el-tab-pane label="哲学"><div>
                    <ul class="bookList">
                        <li v-for="book in philosophy" :key="book">
                            <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div></el-tab-pane>
            <el-tab-pane label="科技"><div>
                    <ul class="bookList">
                        <li v-for="book in technology" :key="book">
                            <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div></el-tab-pane>
            <el-tab-pane label="健康"><div>
                    <ul class="bookList">
                        <li v-for="book in health" :key="book">
                            <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                            <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                            <span class="bookPrice">¥{{book.price}}元
                                <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                            </span>
                        </li>
                    </ul>
                </div></el-tab-pane>
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
            parenting:[],
            art:[],
            history:[],
            education:[],
            management:[],
            philosophy:[],
            technology:[],
            health:[],
        }
    },
    props:[
        
    ],
    methods:{
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
        }
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
        this.axios.get('/books/allBook/novel')
            .then(function (response) {
                console.log(response);
                let res = response.data;
                that.novel = res.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        //parenting
        this.axios.get('/books/allBook/parenting')
            .then(function (response) {
                // console.log(response);
                let res = response.data;
                that.parenting = res.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        //art
        this.axios.get('/books/allBook/art')
            .then(function (response) {
                // console.log(response);
                let res = response.data;
                that.art = res.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        //history
        this.axios.get('/books/allBook/history')
            .then(function (response) {
                // console.log(response);
                let res = response.data;
                that.history = res.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        //education
        this.axios.get('/books/allBook/education')
            .then(function (response) {
                // console.log(response);
                let res = response.data;
                that.education = res.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        //management
        this.axios.get('/books/allBook/management')
            .then(function (response) {
                // console.log(response);
                let res = response.data;
                that.management = res.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        //philosophy
        this.axios.get('/books/allBook/philosophy')
            .then(function (response) {
                // console.log(response);
                let res = response.data;
                that.philosophy = res.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        //technology
        this.axios.get('/books/allBook/technology')
            .then(function (response) {
                // console.log(response);
                let res = response.data;
                that.technology = res.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        //health
        this.axios.get('/books/allBook/health')
            .then(function (response) {
                // console.log(response);
                let res = response.data;
                that.health = res.data;
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