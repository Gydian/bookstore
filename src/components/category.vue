<template>
    <div>
        <el-row>
            <el-tabs class="category-div">
                <el-tab-pane label="全部">
                    <div class="panel">
                        <ul class="bookList">
                            <li v-for="book in allbooks" :key="book.uuid">
                                <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                                <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                                <span class="bookPrice">¥{{book.price}}元
                                    <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <el-row> 
                        <el-col :span="20" :offset="2">
                            <el-pagination :page-size="1" layout="prev, pager, next" :total="allNum"
                            :current-page.sync="currentPage.allbooks" @current-change="changePage(allbooks,allPage)"></el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="小说">
                    <div  class="panel">
                        <ul class="bookList">
                            <li v-for="book in novel" :key="book.uuid">
                                <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                                <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                                <span class="bookPrice">¥{{book.price}}元
                                    <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <el-row> 
                        <el-col :span="20" :offset="2">
                            <el-pagination :page-size="1" layout="prev, pager, next" :total="novelNum"
                            :current-page.sync="currentPage.novel" @current-change="changePage(novel,novelPage)"></el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="育儿">
                    <div class="panel">
                        <ul class="bookList">
                            <li v-for="book in parenting" :key="book.uuid">
                                <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                                <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                                <span class="bookPrice">¥{{book.price}}元
                                    <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <el-row> 
                        <el-col :span="20" :offset="2">
                            <el-pagination :page-size="1" layout="prev, pager, next" :total="parentingNum"
                            :current-page.sync="currentPage.parenting" @current-change="changePage(parenting,parentingPage)"></el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="艺术">
                    <div class="panel">
                        <ul class="bookList">
                            <li v-for="book in art" :key="book.uuid">
                                <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                                <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                                <span class="bookPrice">¥{{book.price}}元
                                    <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <el-row> 
                        <el-col :span="20" :offset="2">
                            <el-pagination :page-size="1" layout="prev, pager, next" :total="artNum" 
                            :current-page.sync="currentPage.art" @current-change="changePage(art,artPage)"></el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="历史">
                    <div class="panel">
                        <ul class="bookList">
                            <li v-for="book in history" :key="book.uuid">
                                <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                                <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                                <span class="bookPrice">¥{{book.price}}元
                                    <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <el-row> 
                        <el-col :span="20" :offset="2">
                            <el-pagination :page-size="1" layout="prev, pager, next" :total="historyNum"
                            :current-page.sync="currentPage.history" @current-change="changePage(history,historyPage)"></el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="教辅">
                    <div class="panel">
                        <ul class="bookList">
                            <li v-for="book in education" :key="book.uuid">
                                <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                                <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                                <span class="bookPrice">¥{{book.price}}元
                                    <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <el-row> 
                        <el-col :span="20" :offset="2">
                            <el-pagination :page-size="1" layout="prev, pager, next" :total="educationNum"
                            :current-page.sync="currentPage.education" @current-change="changePage(education,educationPage)"></el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="管理">
                    <div class="panel">
                        <ul class="bookList">
                            <li v-for="book in management" :key="book.uuid">
                                <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                                <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                                <span class="bookPrice">¥{{book.price}}元
                                    <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <el-row> 
                        <el-col :span="20" :offset="2">
                            <el-pagination :page-size="1" layout="prev, pager, next" :total="managementNum" 
                            :current-page.sync="currentPage.management" @current-change="changePage(management,managementPage)"></el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="哲学">
                    <div class="panel">
                        <ul class="bookList">
                            <li v-for="book in philosophy" :key="book.uuid">
                                <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                                <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                                <span class="bookPrice">¥{{book.price}}元
                                    <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <el-row> 
                        <el-col :span="20" :offset="2">
                            <el-pagination :page-size="1" layout="prev, pager, next" :total="philosophyNum" 
                            :current-page.sync="currentPage.philosophy" @current-change="changePage(philosophy,philosophyPage)"></el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="科技">
                    <div class="panel">
                        <ul class="bookList">
                            <li v-for="book in technology" :key="book.uuid">
                                <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                                <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                                <span class="bookPrice">¥{{book.price}}元
                                    <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <el-row> 
                        <el-col :span="20" :offset="2">
                            <el-pagination :page-size="1" layout="prev, pager, next" :total="technologyNum" 
                            :current-page.sync="currentPage.technology" @current-change="changePage(technology,technologyPage)"></el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="健康">
                    <div class="panel">
                        <ul class="bookList">
                            <li v-for="book in health" :key="book.uuid">
                                <span @click="toDetail(book)"><img :src="book.image" class="bookImg"></span>
                                <span class="bookName" @click="toDetail(book)">{{book.name}}</span>
                                <span class="bookPrice">¥{{book.price}}元
                                    <i @click="addToCart(book)" class="iconfont icon-gouwuchekong"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <el-row> 
                        <el-col :span="20" :offset="2">
                            <el-pagination :page-size="1" layout="prev, pager, next" :total="healthNum"
                            :current-page.sync="currentPage.health" @current-change="changePage(health,healthPage)"></el-pagination>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <!-- all novel parenting art history education management philosophy technology health -->
            </el-tabs>
        </el-row>
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
            // 所有页面的数据
            allPage: [],
            novelPage:[],
            parentingPage:[],
            artPage:[],
            historyPage:[],
            educationPage:[],
            managementPage:[],
            philosophyPage:[],
            technologyPage:[],
            healthPage:[],
            // 每页显示数量
            pageSize: 21,
            // 共几页
            allNum: 1,
            novelNum:1,
            parentingNum:1,
            artNum:1,
            historyNum:1,
            educationNum:1,
            managementNum:1,
            philosophyNum:1,
            technologyNum:1,
            healthNum:1,
            // 默认当前显示第一页
            currentPage: {
                allbooks:1,
                novel:1,
                parenting:1,
                art:1,
                history:1,
                education:1,
                management:1,
                philosophy:1,
                technology:1,
                health:1,
            },
        }
    },
    props:[
    ],
    methods:{
        addToCart(book){
            var that=this;
            this.axios.get('/shoppingCart/'+localStorage.name)
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
            this.axios.post('/shoppingCart/'+localStorage.name+'?bookId='+book.uuid+'&num=1&singlePrice='+
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
        changePage(dataShow,totalPage){
            if(dataShow==this.allbooks){
                this.allbooks = totalPage[this.currentPage.allbooks-1];
            }
            else if(dataShow==this.novel){
                this.novel = totalPage[this.currentPage.novel-1];
            }
            else if(dataShow==this.parenting){
                this.parenting = totalPage[this.currentPage.parenting-1];
            }
            else if(dataShow==this.art){
                this.art = totalPage[this.currentPage.art-1];
            }
            else if(dataShow==this.history){
                this.history = totalPage[this.currentPage.history-1];
            }
            else if(dataShow==this.education){
                this.education = totalPage[this.currentPage.education-1];
            }
            else if(dataShow==this.management){
                this.management = totalPage[this.currentPage.management-1];
            }
            else if(dataShow==this.philosophy){
                this.philosophy = totalPage[this.currentPage.philosophy-1];
            }
            else if(dataShow==this.technology){
                this.technology = totalPage[this.currentPage.technology-1];
            }
            else if(dataShow==this.health){
                this.health = totalPage[this.currentPage.health-1];
            }
        },
        pagination(totalPage, bookData, pageNum){
            pageNum = Math.ceil(bookData.length / this.pageSize) || 1;
            // console.log(pageNum)
            for (let i = 0; i < pageNum; i++) {
                totalPage[i] = bookData.slice(this.pageSize * i, this.pageSize * (i + 1))
            }
            // 当前显示的内容
            bookData = totalPage[0];
            return [bookData,pageNum];
        }
    },
    mounted:function(){
        var that = this;
        this.axios.get('/books/allBook/all')
            .then(function (response) {
                // console.log(response);
                let res = response.data;
                that.allbooks = res.data;
                var data = that.pagination(that.allPage, that.allbooks,that.allNum);
                that.allbooks=data[0]
                // console.log(data[0]);
                that.allNum=data[1]
            })
            .catch(function (error) {
                console.log(error);
            });
        //novel
        this.axios.get('/books/allBook/novel')
            .then(function (response) {
                // console.log(response);
                let res = response.data;
                that.novel = res.data;
                var data = that.pagination(that.novelPage, that.novel,that.novelNum);
                that.novel=data[0]
                that.novelNum=data[1]
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
                var data = that.pagination(that.parentingPage, that.parenting,that.parentingNum);
                that.parenting=data[0]
                that.parentingNum=data[1]
                console.log(that.parenting)
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
                var data = that.pagination(that.artPage, that.art,that.artNum);
                that.art=data[0]
                that.artNum=data[1]
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
                var data = that.pagination(that.historyPage, that.history,that.historyNum);
                that.history=data[0]
                that.historyNum=data[1]
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
                var data = that.pagination(that.educationPage, that.education,that.educationNum);
                that.education=data[0]
                that.educationNum=data[1]
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
                var data = that.pagination(that.managementPage, that.management,that.managementNum);
                that.management=data[0]
                that.managementNum=data[1]
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
                var data = that.pagination(that.philosophyPage, that.philosophy,that.philosophyNum);
                that.philosophy=data[0]
                that.philosophyNum=data[1]
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
                var data = that.pagination(that.technologyPage, that.technology,that.technologyNum);
                that.technology=data[0]
                that.technologyNum=data[1]
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
                var data = that.pagination(that.healthPage, that.health,that.healthNum);
                that.health=data[0]
                that.healthNum=data[1]
            })
            .catch(function (error) {
                console.log(error);
            });
        //分页
        
    }
}
</script>
<style scoped>
.category-div{
    margin-left: 2%;
    margin-right: 2%;
}
.bookList li{
    list-style: none;
    width: 12%;
    border: 1px solid #e5e9f2;
    height:145px;
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
    padding-left: 20%
}
.bookImg{
    width:100px;
    height:90px;
}
.iconfont{
    font-size: 20px;
    padding-left: 8%;
}
.panel{
    height:510px
}
</style>