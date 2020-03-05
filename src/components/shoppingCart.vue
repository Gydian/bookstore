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
                            <img  :src="scope.row.image" alt="" style="width: 50px;height: 50px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="count" label="数量" width="100%" align="center"></el-table-column>
                    <el-table-column prop="price" label="价格" align="center"></el-table-column>
                    <el-table-column label="操作" width="100%" fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="deleteSingle(scope.row)">删除</el-button>
                            <el-button type="text" size="small" @click="add(scope.row)">增加</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="total"> 
                    <span>数量：</span> {{totalCount}} &nbsp &nbsp &nbsp
                    <span>金额：¥</span> {{totalMoney}} <span>元</span>
                </div>
                <div class="below-btn">
                    <el-button @click="deleteAll">全部清空</el-button>
                    <el-button @click="checkout()">结账</el-button>
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
            tableData:[
                {
                    uuid:3,
                    image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582633222938&di=e35ff1eaeae03cf6a9490ad957a2e7e2&imgtype=0&src=http%3A%2F%2Fpics3.baidu.com%2Ffeed%2F2fdda3cc7cd98d10f1d4501f7aae7e0a7bec9036.jpeg%3Ftoken%3D443af596fdf466f79ccd90c425b61da0%26s%3DAD44834FC672B7D413C40CB203005006',
                    name:'河山大好',
                    count:1,
                    price:33,
                    choice:false
                }
            ],
            totalCount:0,
            totalMoney:0,
            order:[],
        }
    },
    props:[
        
    ],
    methods:{
        add(book){
            //判断是否已经存在于商品列表
            let isExist=false;
            for(let i=0;i<this.tableData.length;i++){
                if(book.uuid==this.tableData[i].uuid){
                    isExist=true;
                }
            }
            //根据isExist编写业务逻辑
            if(isExist){
                let arry=this.tableData.filter(o => o.uuid==book.uuid);
                arry[0].count++;
                //数据库
            }else if(book.uuid!=''){
                let newBook={uuid:book.uuid,name:book.name,price:book.price,count:1,image:book.image,choice:false};
                this.tableData.push(newBook);
                //数据库
            }
            this.getTotal();
        },
        deleteSingle(book){
            this.tableData=this.tableData.filter(o => o.uuid!=book.uuid);
            //数据库
        },
        deleteAll(){
            this.tableData=[];
            this.totalCount=0;
            this.totalMoney=0;
            //数据库
        },
        getTotal(){
            this.totalCount=0;
            this.totalMoney=0;
            //进行数量和价格的汇总计算
            this.tableData.forEach((Element)=>{
                this.totalCount+=Element.count;
                this.totalMoney+=Element.price*Element.count;
            });
        },
        checkout(){
            this.$emit('transferComponent',4);
            this.order=this.tableData.filter(o => o.choice==true);
            this.$emit('addOrder',this.order);
            // this.tableData=this.tableData.filter(o => o.choice!=true);//确认下单后直接从数据库中删除
        }
    },
    beforeMount:function(){
        
    }
}
</script>
<style scoped>
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
    margin-top: 3%
}
.below-btn button{
    width: 8%
}
</style>