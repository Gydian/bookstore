<template>
    <div>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-table :data="tableData" border class="cart-div"> 
                    <el-table-column prop="choice" label="选择" align="center" width="100%">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.choice"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop="image" label="商品" width="150%" align="center">
                        <template slot-scope="scope">
                            <img @click="toDetail(scope.row)" :src="scope.row.image" alt="" style="width: 50px;height: 50px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="num" label="数量" width="100%" align="center"></el-table-column>
                    <el-table-column prop="singlePrice" label="价格" align="center"></el-table-column>
                    <el-table-column label="操作" width="100%" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="deleteSingle(scope.row)">删除</el-button>
                            <el-button type="text" size="small" @click="add(scope.row)">增加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="total"> 
                    <span>数量：</span> {{totalCount}} 
                    <span>金额：¥</span> {{totalMoney}} <span>元</span>
                </div>
                <div class="below-btn">
                    <el-button @click="deleteAll">全部清空</el-button>
                    <el-button @click="checkout">结账</el-button>
                    <!-- type有danger，warning，success等type -->
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'shoppingCart',
    data(){
        return{
            tableData:[],
            totalCount:0,
            totalMoney:0,
            order:[],
        }
    },
    props:[
        
    ],
    methods:{
        toDetail(book){
            this.$emit('transferId',book.bookId);
            this.$emit('transferComponent',3);
        },
        add(book){
            let arry=this.tableData.filter(o => o.uuid==book.uuid);
            arry[0].num++;
            this.axios.put('/shoppingCart/'+book.uuid+'?num='+book.num)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.getTotal();
        },
        deleteSingle(book){
            this.axios.delete('/shoppingCart/'+book.uuid)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.tableData=this.tableData.filter(o => o.uuid!=book.uuid);
            this.getTotal();
        },
        deleteAll(){
            this.tableData=[];
            this.totalCount=0;
            this.totalMoney=0;
            //数据库
            this.axios.delete('/shoppingCart/allBook/'+localStorage.name)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getTotal(){
            this.totalCount=0;
            this.totalMoney=0;
            //进行数量和价格的汇总计算
            this.tableData.forEach((Element)=>{
                this.totalCount+=Element.num;
                this.totalMoney+=Element.singlePrice*Element.num;
            });
            this.totalMoney = this.totalMoney.toFixed(2)
        },
        checkout(){
            this.$emit('transferComponent',4);
            this.order=this.tableData.filter(o => o.choice==true);
            console.log(this.tableData)
            console.log(this.order)
            this.$emit('addOrder',this.order);
            this.$emit('backToCart',"cart");
        }
    },
    mounted:function(){
        var that = this;
        console.log(localStorage.name)
        this.axios.get('/shoppingCart/'+localStorage.name)
            .then(function (response) {
                console.log(response);
                let res = response.data;
                that.tableData = res.data;
                that.getTotal();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>
<style scoped lang="less">
.cart-div{
    margin-top: 4%;
}
.total{
    padding: 1%;
    background-color: #ffffff;
    border-bottom: 1px solid rgb(228, 227, 227);
    border-right: 1px solid rgb(228, 227, 227);
    border-left: 1px solid rgb(228, 227, 227);
}
.below-btn{
    /deep/.el-button{
        width: 10%;
        margin-bottom: 4%;
        padding: 10px;
        border-radius: 5px;
    }
}
.below-btn button{
    width: 10%;
    margin: 2%;
}
</style>