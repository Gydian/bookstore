<template>
    <div>
        <el-tabs class="category-div">
            <el-tab-pane label="全部">
                <div>
                    <ul class="foodList">
                        <!-- <li v-for="food in typeOfFood" :key="food" @click="addOrderList(food)">
                            <span class="foodImg"><img :src="food.goodsImg" width=100%></span>
                            <span class="foodName">{{food.goodsName}}</span>
                            <span class="foodPrice">¥{{food.price}}元</span>
                        </li> -->
                    </ul>
                </div>
            </el-tab-pane>
            <el-tab-pane label="小说">小说</el-tab-pane>
            <el-tab-pane label="育儿">育儿</el-tab-pane>
            <el-tab-pane label="艺术">艺术</el-tab-pane>
            <el-tab-pane label="历史">历史</el-tab-pane>
            <el-tab-pane label="教辅">教辅</el-tab-pane>
            <el-tab-pane label="管理">管理</el-tab-pane>
            <el-tab-pane label="哲学">哲学</el-tab-pane>
            <el-tab-pane label="科技">科技</el-tab-pane>
            <el-tab-pane label="健康">健康</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name:'category',
    data(){
        return{
            
        }
    }
}
</script>
<style>
.category-div{
    margin-left: 2%;
    margin-right: 2%;
}
</style>