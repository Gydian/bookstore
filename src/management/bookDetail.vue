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
            <el-col :span="20" :offset="2" v-for="one in book" :key="one.uuid">
                <el-button class="btn" @click="showEdit(one)">编辑</el-button>

                <el-dialog title="编辑内容" :visible.sync="dialogFormVisible" @closed="reloadPage">
                    <el-form :model="changeInfo">
                        <el-form-item label="商品名称：" :label-width="formLabelWidth">
                            <el-input v-model="changeInfo.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="作者：" :label-width="formLabelWidth">
                            <el-input v-model="changeInfo.author" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="出版社：" :label-width="formLabelWidth">
                            <el-input v-model="changeInfo.press" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="类别：" :label-width="formLabelWidth">
                            <el-select v-model="changeInfo.sort" placeholder="请选择类别">
                            <el-option label="小说" value="novel"></el-option>
                            <el-option label="育儿" value="parenting"></el-option>
                            <el-option label="艺术" value="art"></el-option>
                            <el-option label="历史" value="history"></el-option>
                            <el-option label="教辅" value="education"></el-option>
                            <el-option label="管理" value="management"></el-option>
                            <el-option label="哲学" value="philosophy"></el-option>
                            <el-option label="科技" value="technology"></el-option>
                            <el-option label="健康" value="health"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="价格：" :label-width="formLabelWidth">
                            <el-input v-model="changeInfo.price" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="库存：" :label-width="formLabelWidth">
                            <el-input v-model="changeInfo.stock" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="描述：" :label-width="formLabelWidth">
                            <el-input v-model="changeInfo.description" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="商品图片：" :label-width="formLabelWidth">
                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                                :file-list="changeInfo.image">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item> -->
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="editBook()">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'bookDetail',
    data(){
        return{
            dialogFormVisible: false,
            formLabelWidth: '120px',
            book:[],
            changeInfo:{
                name:'',
                author:'',
                press:'',
                sort:'',
                price:'',
                stock:'',
                description:'',
                image:'',
            }
        }
    },
    methods:{
        showEdit(one){
            this.dialogFormVisible = true;
            this.changeInfo = one;
        },
        editBook(){
            this.axios.put('/books/aBook'+this.$route.params.id)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.reloadPage;
            this.dialogFormVisible = false;
        },
        reloadPage(){
            var that = this;
            console.log(this.$route.params.id)
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
        },
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