<template>
    <div>
        <el-row >
            <el-col :span="20" :offset="2" class="address">
                <span class="tip-span">选择收货地址：</span>
                <ul class="addressList">
                    <li v-for="address in dataShow" :key="address.index" @click="chooseAddr(address)"
                    :class="{active:address.index==current}">
                        <el-button>
                            <span class="name">{{address.name}}&nbsp :</span>
                            <span class="phoneNum">{{address.phoneNum}}</span>
                            <span class="userAddr">{{address.usrAddr}}</span>
                        </el-button>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2" class="pagination">
                <el-pagination layout="prev, pager, next" :page-size="1" :total="pageNum" :current-page.sync="currentPage" @current-change="changePage()"></el-pagination>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-table :data="order" border > 
                    <el-table-column prop="image" label="商品" width="150%" align="center">
                        <template slot-scope="scope">
                            <img  :src="scope.row.image" alt="" style="width: 50px;height: 50px">
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
                <div class="below"> 
                    <div class="totalAccount">
                        <span>数量：</span> {{totalCount}} &nbsp &nbsp &nbsp
                        <span>金额：¥</span> {{totalMoney}} <span>元</span>
                    </div>
                </div>
                <div class="below-btn">
                    <el-button @click="back">取消</el-button>
                    <el-button @click="placeOrder">下单</el-button>
                    <!-- type有danger，warning，success等type -->
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'orderPage',
    data(){
        return{
            addressList:[
                {
                    index:1,
                    name:'gyd',
                    phoneNum:'1026613163',
                    usrAddr:'湖北省荆州市荆州区'
                },
                {
                    index:2,
                    name:'ysh',
                    phoneNum:'1368324087',
                    usrAddr:'湖北省黄冈市麻城区'
                },
                {
                    index:3,
                    name:'ysh',
                    phoneNum:'1368324087',
                    usrAddr:'湖北省黄冈市麻城区'
                },
                {
                    index:4,
                    name:'ysh',
                    phoneNum:'1368324087',
                    usrAddr:'湖北省黄冈市麻城区'
                },
                {
                    index:5,
                    name:'ysh',
                    phoneNum:'1368324087',
                    usrAddr:'湖北省黄冈市麻城区'
                },
                {
                    index:6,
                    name:'ysh',
                    phoneNum:'1368324087',
                    usrAddr:'湖北省黄冈市麻城区'
                },
            ],
            totalCount:0,
            totalMoney:0,
            order:[],
            // 所有页面的数据
            totalPage: [],
            // 每页显示数量
            pageSize: 5,
            // 共几页
            pageNum: 1,
            // 当前显示的数据
            dataShow: "",
            // 默认当前显示第一页
            currentPage: 0,
            address:'',
            current:0,
        }
    },
    props:[
        'orderAdd',
        'backToWhich'
    ],
    methods:{
        getTotal(){
            this.totalCount=0;
            this.totalMoney=0;
            //进行数量和价格的汇总计算
            this.order.forEach((Element)=>{
                this.totalCount+=Element.num;
                this.totalMoney+=Element.singlePrice*Element.num;
            });
            this.totalMoney = this.totalMoney.toFixed(2)
        },
        add(book){
            let arry=this.order.filter(o => o.uuid==book.uuid);
            arry[0].num++;
            this.getTotal();
        },
        deleteSingle(book){
            this.order=this.order.filter(o => o.uuid!=book.uuid);
            this.getTotal();
        },
        back(){
            if(this.backToWhich=="cart"){
                this.$emit('back',2);
            }
            else if(this.backToWhich=="detail"){
                this.$emit('back',3);
            }
        },
        chooseAddr(address){
            this.address=address;
            console.log(this.address)
            this.current = address.index;
        },
        placeOrder(){
            if(this.address==''||this.address==null){
                this.$message({
                    message: '请选择收货地址',
                    type: 'warning'
                });
            }
            else{
                if(this.order==''){
                    this.$message({
                        message: '请添加下单物品',
                        type: 'warning'
                    });
                }else{
                    var that=this;
                    this.axios.post('/orders/order?name='+this.address.name+'&location='
                    +this.address.usrAddr+'&phone='+this.address.phoneNum,this.order)
                    .then(function (response) {
                        console.log(response);
                        that.$message({
                            message: '下单成功',
                            type: 'success'
                        });
                        that.back();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            }
        },
        changePage(){
            this.dataShow = this.totalPage[this.currentPage-1];
        },
    },
    mounted:function(){
        this.order=this.orderAdd
        this.getTotal();
        // console.log(this.order)
        //获取地址

        //分页
        this.pageNum = Math.ceil(this.addressList.length / this.pageSize) || 1;
        for (let i = 0; i < this.pageNum; i++) {
            this.totalPage[i] = this.addressList.slice(this.pageSize * i, this.pageSize * (i + 1))
        }
        this.dataShow = this.totalPage[0];
    }
}



</script>
<style scoped lang="less">
.address{
    border: 1px solid #e5e9f2;
    border-bottom: none;
    margin-top: 2%
}
.addressList li{
    list-style: none;
    height:auto;
    overflow: auto;
    background-color: #fff;
    padding: 0px;
    float: left;
    margin: 1%;
    margin-top: 5%;
    cursor: pointer;
    text-align: center;
    /deep/.el-button{
        border: 1px solid #e5e9f2;;
        border-radius: 0;
        padding: 5px;
        font-size: 14px;
        color: rgb(39, 37, 37);
        font-weight: 400;
    }
    /deep/.el-button:hover{
        background-color: rgb(231, 228, 228);
    }
}
.active {
    /deep/.el-button{
        background-color: rgb(231, 228, 228);
    }
}
.userAddr{
    display: block;
    padding: 4px;
}
.phoneNum{
    display: block;
    margin-top: 10%;
    padding: 4px;
}
.name{
    float: left;
    padding: 2px;
}
.tip-span{
        display: block;
        float: left;
        margin:2%;
        color: rgb(34, 32, 32);
}
.pagination{
    border: 1px solid #e5e9f2;
    border-top: none;
}
.below{
    padding: 1%;
    background-color: #ffffff;
    border-bottom: 1px solid rgb(228, 227, 227);
    border-right: 1px solid rgb(228, 227, 227);
    border-left: 1px solid rgb(228, 227, 227);
}
.totalAccount{
    margin-left: 70%;
    margin-top: 1%;
}
.below-btn{
    margin-top: 3%;
    /deep/.el-button{
        width: 8%;
        margin-bottom: 2%;
        padding: 10px;
        border-radius: 5px;
    }
}
</style>