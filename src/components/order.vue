<template>
  <div>
    <div class="t_pos">
    <el-table
      :data="tableData"
      border
      :default-sort = "{prop: 'date', order: 'descending'}">

      <el-table-column
        prop="img"
        label="商品"
        align="center"
        width="150">
        <template slot-scope="scope">
          <img :src="scope.row.img" width="40" height="40" class="head_pic"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量"
        align="center">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        align="center">
      </el-table-column>
      <el-table-column
        prop="date"
        label="购买时间"
        align="center"
        sortable>
      </el-table-column>
    </el-table>
    </div>
  </div>

</template>


<script>
export default {
    data() {
      return {
        //数据从数据库中读
        tableData: [],
        // tableData: [{
        //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //   name: '中国诗词',
        //   num: '2',
        //   price: '13.84',
        //   date: '2016-05-02'
        // }, {
        //   img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        //   name: '语文教材',
        //   num: '1',
        //   price: '25.41',
        //   date: '2016-05-04'
        // }, {
        //   img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        //   name: '迪士尼幼儿英语',
        //   num: '2',
        //   price: '38.00',
        //   date: '2016-05-01'
        // }, {
        //   img: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        //   name: '英汉词典',
        //   num: '23',
        //   price: '52.10',
        //   date: '2016-05-03'
        // }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      }
    },

    mounted:function(){
      var that = this;
        // 根据用户名获取订单数据
        console.log(localStorage.name)
        this.axios.get('/orders/order/'+localStorage.name)
            .then(function (response) {
                console.log(response);
                let res = response.data;
                that.tableData = res.data;
                console.log(that.tableData);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}
</script>


<style>
.t_pos{
  overflow: scroll;
  height: 600px;
  width: 80%;
  border: 1px solid lightgray;
  margin-top: 1%;
}
</style>
