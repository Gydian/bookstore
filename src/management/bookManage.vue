<template>
    <div>
        <el-row class="top">
            <el-col :span="4" :offset="18">
                <el-button>新增</el-button>
            </el-col>
        </el-row>
        <el-row class="center">
            <el-col :span="20" :offset="2">
                <el-table :data="tableData" border :default-sort = "{prop: 'stock', order: 'descending'}"> 
                    <el-table-column prop="image" label="商品" width="150%" align="center">
                        <template slot-scope="scope">
                            <img @click="toEdit(scope.row)" :src="scope.row.image" alt="" style="width: 50px;height: 50px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="sort" label="类别" align="center"></el-table-column>
                    <el-table-column prop="singlePrice" label="价格" align="center"></el-table-column>
                    <el-table-column prop="stock" label="库存" align="center" width="100%"></el-table-column>
                    <el-table-column label="操作" width="100%" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="deleteSingle(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="bottom">
        </el-row>
    </div>
</template>
<script>
export default {
    name:'bookManage',
    data(){
        return{
            tableData:[],
        }
    },
    methods:{
        toEdit(){

        }
    }
}
</script>
<style scoped>

</style> 
