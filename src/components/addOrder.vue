<template>
    <div>
        <el-row >
            <el-col :span="20" :offset="2" class="address">
                <span class="tip-span">选择收货地址：</span>
                <ul class="addressList">
                    <li v-for="address in addressList" :key="address">
                        <span class="name">{{address.name}}&nbsp :</span>
                        <span class="phoneNum">{{address.phoneNum}}</span>
                        <span class="userAddr">{{address.usrAddr}}</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2" class="pagination">
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2">
                <el-table :data="orderAdd" border class="cart-div"> 
                    <el-table-column prop="image" label="商品" width="150%" align="center">
                        <template slot-scope="scope">
                            <img  :src="scope.row.image" alt="" style="width: 50px;height: 50px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
                    <el-table-column prop="count" label="数量" width="100%" align="center"></el-table-column>
                    <el-table-column prop="price" label="价格" align="center"></el-table-column>
                </el-table>
                <div class="below"> 
                    <el-pagination
                        layout="prev, pager, next"
                        :total="1000">
                    </el-pagination>
                    <div class="totalAccount">
                        <span>数量：</span> {{totalCount}} &nbsp &nbsp &nbsp
                        <span>金额：¥</span> {{totalMoney}} <span>元</span>
                    </div>
                </div>
                <div class="below-btn">
                    <el-button>取消</el-button>
                    <el-button>下单</el-button>
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
                    name:'gyd',
                    phoneNum:'1026613163',
                    usrAddr:'湖北省荆州市荆州区'
                },
                {
                    name:'ysh',
                    phoneNum:'1368324087',
                    usrAddr:'湖北省黄冈市麻城区'
                }
            ],
            totalCount:0,
            totalMoney:0
        }
    },
    props:[
        'orderAdd',
    ],
    methods:{
        getTotal(){
            this.totalCount=0;
            this.totalMoney=0;
            //进行数量和价格的汇总计算
            this.orderAdd.forEach((Element)=>{
                this.totalCount+=Element.count;
                this.totalMoney+=Element.price*Element.count;
            });
        },
    },
    mounted:function(){
        this.getTotal();
    }
}
</script>
<style scoped>
.address{
    border: 1px solid #e5e9f2;
    border-bottom: none;
    margin-top: 2%
}
.addressList li{
    list-style: none;
    width: 13%;
    border: 1px solid #e5e9f2;
    height:auto;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 10px;
    margin-top: 5%;
    cursor: pointer;
    text-align: center;
}
.userAddr{
    display: block;
}
.phoneNum{
    display: block;
    margin-top: 10%
}
.name{
    float: left;
}
.tip-span{
        display: block;
        float: left;
        margin:2%
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
    margin-top: 3%
}
.below-btn{
    margin-top: 3%
}
.below-btn button{
    width: 8%
}
</style>