<template>
    <div>
        <el-row>
            <el-button @click="dialogFormVisible = true">新增</el-button>
                
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
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                                :file-list="image">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addBook(form)">确 定</el-button>
                    </div>
                </el-dialog>
        </el-row>

        <el-row>
            <el-col :span="20" :offset="2">
                <el-table :data="tableData" border class="cart-div"> 
                    <el-table-column prop="image" label="商品" width="150%" align="center">
                        <template slot-scope="scope">
                            <img @click="toEdit(scope.row)" :src="scope.row.image" alt="" style="width: 50px;height: 50px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="sort" label="类别" align="center"></el-table-column>
                    <el-table-column prop="singlePrice" label="价格" align="center"></el-table-column>
                    <el-table-column label="操作" width="100%" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="deleteSingle(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
            formLabelWidth: '120px'
        }
    },
    methods:{
        toEdit(){
            
        },
        // 添加书目的接口 有问题
        addBook(form){
            // this.axios.post('books/aBook/?name='+this.form.name+'&author='+this.form.author+
            // '&press='+this.form.press+'&sort='+this.form.sort+'&price='+this.form.price+'&stock='+this.form.stock+
            // '&description='+this.form.description+'&image='+this.form.image)
            //     .then(function (response) {
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });

            // this.fullscreenLoading = true;
            // this.axios.post('/books/aBook',this.qs.stringify({
            //         name: this.form.name,
            //         author: this.form.author,
            //         press: this.form.press,
            //         sort: this.form.sort,
            //         price: this.form.price,
            //         stock: this.form.stock,
            //         description: this.form.description,
            //         image: this.form.image,
            //     })
            // )
            // .then( (respose) => {
            //     this.fullscreenLoading = false;
            //     console.log(respose);
            //     if(respose.data.msg=="上传成功"){
            //         this.$message.success('添加成功');
            //     }else{
            //         this.$message.error('添加失败');
            //         // this.$router.push({ path: '/'});
            //     }
            // })
            // .catch( (error) => {
            //     this.fullscreenLoading = false;
            //     console.log(error);
            // } )
            this.dialogFormVisible = false;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
}
</script>
<style scoped>

</style> 
