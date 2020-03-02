<template>
    <div>
        <el-row>
            <el-col :span="20" :offset="2" class="top">
                <div class="block">
                    <el-image :src="src" class="image">
                    <div slot="placeholder" class="image-slot">
                        加载中<span class="dot">...</span>
                    </div>
                    </el-image>
                    <div>
                        <span>标题</span>
                        <span>作者</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2" class="bottom">
                <div>
                    <span>作者</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'bookDetail',
    data(){
        return{
            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }
    }
}
</script>
<style scoped>
.top{
    margin-top: 3%;
    border: 1px solid lightgray;
    border-bottom: none;
}
.image{
    width:50%;
    float: left;
}
.bottom{
    border: 1px solid lightgray;
}
</style>