<template>
    <div class="main">
        <el-row>
            <el-col :span="20" :offset="2">
            <el-button class="addBtn" @click="dialogFormVisible = true">新增</el-button>
                
                <el-dialog title="新增书目" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="商品名称：" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="作者：" :label-width="formLabelWidth">
                            <el-input v-model="form.author" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="出版社：" :label-width="formLabelWidth">
                            <el-input v-model="form.press" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="类别：" :label-width="formLabelWidth">
                            <el-select v-model="form.sort" placeholder="请选择类别">
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
                            <el-input v-model="form.price" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="库存：" :label-width="formLabelWidth">
                            <el-input v-model="form.stock" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="描述：" :label-width="formLabelWidth">
                            <el-input v-model="form.description" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="商品图片：" :label-width="formLabelWidth">
                            <el-upload
                                class="avatar-uploader"
                                action="http://localhost:9010/photo/"
                                :show-file-list="false"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addBook(form)">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="20" :offset="2">
                <el-table :data="dataShow" border :default-sort = "{prop: 'stock', order: 'descending'}"> 
                    <el-table-column prop="image" label="商品" width="150%" align="center">
                        <template slot-scope="scope">
                            <img @click="toEdit(scope.row.uuid)" :src="scope.row.image" alt="" style="width: 50px;height: 50px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="sort" label="类别" align="center"></el-table-column>
                    <el-table-column prop="price" label="价格" align="center"></el-table-column>
                    <el-table-column prop="stock" label="库存" align="center" width="100%" sortable></el-table-column>
                    <el-table-column label="操作" width="100%" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="deleteSingle(scope.row.uuid)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="bottom">  
            <el-col :span="20" :offset="2">
                <el-pagination layout="prev, pager, next" :page-size="1" :total="pageNum" :current-page.sync="currentPage" @current-change="changePage()"></el-pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'bookManage',
    data(){
        return{
            dialogFormVisible: false,
            tableData:[],
            form:{
                bookID:'',
                // fileList:[{name:'',url:''}],
                name:'',
                author:'',
                press:'',
                sort:'',
                price:'',
                stock:'',
                description:'',
                image:'',
            },
            formLabelWidth: '120px',
            // 所有页面的数据
            totalPage: [],
            // 每页显示数量
            pageSize: 6,
            // 共几页
            pageNum: 1,
            // 当前显示的数据
            dataShow: [],
            // 默认当前显示第一页
            currentPage: 1,
            imageUrl: '', 
        }
    },
    methods:{
        toEdit(uuid){
            this.$router.push({ name:"bookDetail",params:{id:uuid}});
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            let fd = new FormData();//通过form数据格式来传
            fd.append('image', file); //传文件
            this.form.image=fd
        },
        // 添加书目的接口
        addBook(form){
            console.log(this.form.image)
            this.fullscreenLoading = true;
            var that = this
            this.axios({
            url: 'books/aBook/?name='+this.form.name+'&author='+this.form.author+
            '&press='+this.form.press+'&sort='+this.form.sort+'&price='+this.form.price+'&stock='+this.form.stock+
            '&description='+this.form.description,
            method: "post",
            data: this.form.image,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            }).then((data) => {
            console.log(data)
            })
            .catch((error)=>{
            console.log(error)
            })
            this.dialogFormVisible=false;
            setTimeout(() => {
                this.getAllBooks()
            }, 500);
        },
        deleteSingle(uuid){
            this.axios.delete('/books/aBook/'+uuid)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            //刷新
            setTimeout(() => {
                this.getAllBooks()
            }, 500);
        },
        getAllBooks(){
            var that = this
            this.axios.get('/books/allBook/all')
            .then(function (response) {
                console.log(response);
                let res = response.data;
                that.tableData = res.data;
                that.pageNum = Math.ceil(that.tableData.length / that.pageSize) || 1;
                for (let i = 0; i < that.pageNum; i++) {
                    that.totalPage[i] = that.tableData.slice(that.pageSize * i, that.pageSize * (i + 1))
                }
                that.dataShow = that.totalPage[0];
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        changePage(){
            this.dataShow = this.totalPage[this.currentPage-1];
        }
    },
    mounted:function(){
        this.getAllBooks()
    }
}
</script>
<style scoped>
.main{
    overflow: scroll;
    width: 100%;
    height:650px;
}
.bottom{
    margin-top: 1%;
}
.addBtn{
    margin: 1%;
    float: right;
}
</style> 
