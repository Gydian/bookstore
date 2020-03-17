<template>
    <div>
        <el-row>
            <el-col class="chooseTime" :span="20" :offset="2">
                <span>选择查看时间：</span>
                <!-- <el-date-picker v-model="value" type="daterange" range-separator="至" :picker-options="DatePicker"
                    start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd hh:mm:ss">
                </el-date-picker> -->
                <el-date-picker v-model="value" type="date" placeholder="选择日期" value-format="yyyy-MM-dd hh:mm:ss"
                    :picker-options="pickerOptions">
                </el-date-picker>
                <el-button @click="confirmTime">确定</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="20" :offset="2">
                <span>{{spanValue}}前一周的书目种数折线图如下：</span>
                <div class="echarts-div" id="chart"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import echarts from 'echarts';

export default {
    name:'totalBookStatistic',
    data(){
        return{
            value:'',
            spanValue:'',
            chartValue:[],
            timeGroup:[],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
        }
    },
    methods:{
        loadEcharts(){
            const option= {
                legend: {
                    data: ['书籍种数', '站点二'],
                    textStyle: {
                        color: '#fff',
                        fontSize:'10px',
                    },
                    x: 'left',  
                },
                xAxis: {
                    type: 'category',   // 还有其他的type
                    data: [this.timeGroup[6], this.timeGroup[5], this.timeGroup[4], 
                    this.timeGroup[3], this.timeGroup[2], this.timeGroup[1], this.timeGroup[0]],   // x轴数据
                    // name: '日期',   // x轴名称
                    // x轴名称样式
                    nameTextStyle: {
                        fontWeight: 600,
                        fontSize: 18
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: '#083651',
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#0477B5',
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    // name: '水位',   // y轴名称
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            width:'0',
                            color: '#002541',//y轴的颜色
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#0477B5',//y坐标轴的刻度值的颜色
                        }
                    },
                    splitLine: {   //分割线的颜色、类型：虚线和实线
                        show: true,
                        lineStyle:{
                            color:'#083651',
                            type:'solid',
                        }
                    }
                },
                tooltip: {
                    trigger: 'axis'   // axis   item   none三个值
                },
                grid: {
                    x: 60,
                    y: 60,
                    x2: 60,
                    y2: 30
                },
                series: [
                    {   name: '站点一',
                        // data: [1, 2, 1.5, 4, 2, 1, 3],
                        data: [this.chartValue[6], this.chartValue[5], this.chartValue[4], this.chartValue[3],
                         this.chartValue[2], this.chartValue[1], this.chartValue[0]],
                        itemStyle : {
                            normal : {
                                color:'#89F3C9',  //图例的icon图标颜色
                                lineStyle:{
                                    color:'#89F3C9'    //折线的颜色
                                }
                            }
                        },
                        type: 'line'
                    }
                ],
            };
            let chart = echarts.init(document.getElementById('chart'))
            chart.setOption(option) 
        },
        confirmTime(){
            if(this.value==''||this.value==null){
                this.$message.error("请先选择时间哦！");
            }else{
                this.chartValue=[]
                this.timeGroup=[]
                this.spanValue=new Date(Date.parse(this.value)).format('yyyy年MM月dd日')
                this.timeGroup.push(this.value)
                this.postMethod(this.value);
                var minusTime = minusDate(this.value)
                for(let i=0;i<6;i++){
                    this.timeGroup.push(minusTime)
                    this.postMethod(minusTime)
                    var minusTime = minusDate(minusTime)
                }
                for(let i=0;i<7;i++){
                    var timestamp = Date.parse(new Date(this.timeGroup[i]));
                    this.timeGroup[i] =new Date(timestamp).format('yyyy-MM-dd');
                }
                setTimeout(()=>{
                    console.log(this.timeGroup)
                console.log(this.chartValue[0])
                    this.loadEcharts()
                },500)
            }
        },
        postMethod(time){
            var that = this
            this.axios.get('/books/timeBook?dateTime1=2020-02-02 00:00:00&dateTime2='+time)
                .then(function (response) {
                    console.log(response);
                    that.chartValue.push(response.data.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    mounted:function(){
        var that = this
        this.spanValue = new Date(Date.now()).format('yyyy年MM月dd日')
        let now = new Date(Date.now()).format('yyyy-MM-dd hh:mm:ss')
        this.timeGroup.push(now)
        this.postMethod(now)
        var minusTime = minusDate(now)
        for(let i=0;i<6;i++){
            this.timeGroup.push(minusTime)
            this.postMethod(minusTime)
            var minusTime = minusDate(minusTime)
        }
        for(let i=0;i<7;i++){
            var timestamp = Date.parse(new Date(this.timeGroup[i]));
            this.timeGroup[i] =new Date(timestamp).format('yyyy-MM-dd');
        }
        console.log(this.timeGroup[0])
        console.log(this.chartValue)
        setTimeout(()=>{
            console.log(this.chartValue[0])
            this.loadEcharts()
        },500)
        
    }
}

function minusDate(time) {
  //减一天
  var timestamp = Date.parse(new Date(time));
  timestamp = timestamp /1000;
  timestamp -= 86400;//减一天
  var newTime =new Date(timestamp * 1000).format('yyyy-MM-dd hh:mm:ss');
  return newTime;
}
Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
</script>
<style scoped>
.echarts-div{
    padding-top: 2%;
    width: 96%;
    height: 400px;
    background-color:lightgray;
    margin-top: 3%;
    margin-left: 4%;
}
.chooseTime{
    margin-top: 3%;
    margin-bottom: 3%;
}
</style>