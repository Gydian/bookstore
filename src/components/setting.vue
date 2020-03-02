<template>
    <div>
        <el-button style="float:right" type="text" @click="dialogFormVisible = true">添加收货地址</el-button>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="收货人：" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" :label-width="formLabelWidth">
            <el-input v-model="form.telnumber" autocomplete="off"></el-input>
            </el-form-item>
        <!-- <el-form-item label="所在地区" :label-width="formLabelWidth">
         <el-select v-model="form.province" placeholder="请选择省份/地区">
            <el-option label="安徽省" value="anhui"></el-option>
            <el-option label="北京" value="beijing"></el-option>
            <el-option label="重庆" value="chongqing"></el-option>
            <el-option label="福建省" value="fujian"></el-option>
         </el-select>
         <div v-if="form.province == 'beijing'">
             <el-select v-model="form.city" placeholder="请选择城市">
                <el-option label="1" value="anhui"></el-option>
                <el-option label="2" value="beijing"></el-option>
                <el-option label="3" value="chongqing"></el-option>
                <el-option label="4" value="fujian"></el-option>
            </el-select>
         </div>
         
         <el-select v-model="form.county" placeholder="请选择县">
            <el-option label="安徽省" value="anhui"></el-option>
            <el-option label="北京" value="beijing"></el-option>
            <el-option label="重庆" value="chongqing"></el-option>
            <el-option label="福建省" value="fujian"></el-option>
         </el-select>
         <el-select v-model="form.community" placeholder="请选择街道">
            <el-option label="安徽省" value="anhui"></el-option>
            <el-option label="北京" value="beijing"></el-option>
            <el-option label="重庆" value="chongqing"></el-option>
            <el-option label="福建省" value="fujian"></el-option>
         </el-select>
        </el-form-item> -->
            <el-form-item label="详细地址：" :label-width="formLabelWidth">
            <el-input v-model="form.region" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>

        <div>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="收货人"
                    width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 5px">{{ scope.row.name }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="手机号码"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.telnumber }}</span>
                </template>
                </el-table-column>
                <el-table-column
                    label="详细地址"
                    width="240">
                <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="dialogFormVisible = true">编辑</el-button>

                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>

        </div>

        <div>
            <el-pagination
                :page-size="20"
                :pager-count="11"
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>

    </div>
    
</template>

<script>
export default {
    data(){
        return{
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          telnumber: '',
          region: '',

        //   province: '',
        //   city: '',
        //   county: '',
        //   community: '',


          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',

        tableData: [{
          name: 'ysh',
          telnumber: '12345678901',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          name: 'ysh',
          telnumber: '12345678901',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          name: 'ysh',
          telnumber: '12345678901',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          name: 'ysh',
          telnumber: '12345678901',
          address: '上海市普陀区金沙江路 1518 弄',
        }]

        

        };
    },
    methods:{
        handleEdit(index, row) {
        console.log(index, row);
      },
        handleDelete(index, row) {
            this.$confirm('是否要删除此条收货地址?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
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
        console.log(index, row);
      }
    }
}
</script>
<style>

</style>