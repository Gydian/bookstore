<template>
    <div>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-button style="float:right" type="text" @click="handleAdd">添加收货地址</el-button>
                <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" @closed="reloadPage">
                    <el-form :model="form">
                        <el-form-item label="收货人：" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码：" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="详细地址：" :label-width="formLabelWidth">
                        <el-input v-model="form.location" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <div v-if="dialogStatus=='addAddr'">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addDo(form)">确 定</el-button>
                        </div>
                        <div v-else>
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="handleEdit()">确 定</el-button>
                        </div>
                    </div>
                </el-dialog>

                
                    <el-table :data="tableData" border style="width: 90%" class="cart-div">
                        <el-table-column
                            prop="name"
                            label="收货人"
                            align="center"
                            width="100%">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="手机号码"
                            align="center"
                            width="150%">
                        </el-table-column>
                        <el-table-column
                            prop="location"
                            label="详细地址"
                            align="center">
                        </el-table-column>
                        <el-table-column label="操作" width="100%" fixed="right" align="center">
                            <template slot-scope="scope">
                                

                                <el-button
                                type="text"
                                size="small"
                                @click="editShow(scope.row, scope.$index)">编辑</el-button>

                                <el-button
                                size="small"
                                type="text"
                                @click="handleDelete(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                

            </el-col>
        </el-row>
        
    </div>
</template>

<script>
export default {
    name:'setting',
    data(){
        return{
            
            tableData: [],

            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
            id:'',
            name: '',
            phone: '',
            location: '',
            },
            formLabelWidth: '120px',

            titleMap: {
                addAddr:'新增地址',
                editAddr:'编辑地址',
            },
            dialogStatus:"",

        };
    },
    methods:{
        // 显示编辑地址
        editShow(row, _index){
            this.formIndex = _index;        // 记录索引
            this.form = row;             //记录数据
            this.dialogFormVisible = true;
            this.dialogStatus = "editAddr";
        },
        // 确认编辑成功
        handleEdit() {
            // this.dialogFormVisible = false;
            // let _index = this.formIndex;    
            // this.tableData[_index] = form;    //根据索引赋值到list制定到数
            var info = this.tableData[this.formIndex];
            console.log(info);
            this.axios.put('/addresses/'+info.uuid+'?name='+this.form.name+
                '&phone='+this.form.phone+'&location='+this.form.location+'&username='+localStorage.name)
                .then(function (response) {
                    console.log(11111);
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.reloadPage;
            this.dialogFormVisible = false;

            
            
        },
        // 刷新界面
        reloadPage(){
            
            var that = this;
            console.log(localStorage.name)
            this.axios.get('/addresses/'+localStorage.name)
                .then(function (response) {
                    console.log(response);
                    let res = response.data;
                    that.tableData = res.data;
                    console.log(that.tableData);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        // 删除某行地址
        handleDelete(info) {
            this.$confirm('是否要删除此条收货地址?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

                this.delete(info);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
            });
        },
        delete(info){
            // 数据库操作
                var that = this;
                this.axios.delete('/addresses/'+info.uuid)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.tableData=this.tableData.filter(o => o.uuid!=info.uuid);
        },
        // 显示添加地址
        handleAdd() {
            // this.formIndex = "";        // 有问题
            // this.form = "";             // 有问题
            this.dialogFormVisible = true;
            this.dialogStatus = "addAddr";
        },
        // 确认添加地址
        addDo(form){
            
            // this.fullscreenLoading = true;
            // this.axios.post('/addresses/'+localStorage.name+'?name='+this.form.name+
            //     '&phone='+this.form.phone+'&location='+this.form.location)
            //     .then(function (response) {
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
            // this.dialogFormVisible = false;

            var re = new RegExp('^[1][3,4,5,7,8][0-9]{9}$');
            if(re.test(this.form.phone)){
                this.fullscreenLoading = true;
                this.axios.post('/addresses/'+localStorage.name+'?name='+this.form.name+
                '&phone='+this.form.phone+'&location='+this.form.location)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.dialogFormVisible = false;
            }else{
                alert('电话号码格式不正确！');
            }
        },

        
        
    },
    // 根据username获取收货地址信息
    mounted:function(){
      var that = this;
        //获取收货地址
        console.log(localStorage.name)
        this.axios.get('/addresses/'+localStorage.name)
            .then(function (response) {
                console.log(response);
                let res = response.data;
                that.tableData = res.data;
                console.log(11);
                console.log(that.tableData);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>
<style scoped>


.cart-div{
    margin-top: 4%;
    /* margin-right: 10%; */
}
</style>