<template>
    <div class="reports-container">
        <!-- 导航区域 -->
        <Navbar>
            <li>数据统计管理</li>
            >
            <li>数据报表</li>
        </Navbar>
        <!-- 图表区域 -->
        <div id="echarts" style="width: 800px;height:400px; background-color: #FFFFFF; margin: 100px auto 0;"></div>
    </div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'Reports',
    data() {
        return {
            echartData:{},
            options: {
                title: {
                    text: '用户来源'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#E9EEF3'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        boundaryGap: false
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ]
            }
        };
    },
    methods: {
       async getEchartData(){
           const response = await this.axios.get('reports/type/1');
           if(response.meta.status == 200){
             this.echartData = response.data;
             console.log(Object.assign({},this.echartData,this.options))
             this.echart.setOption(Object.assign(this.options,this.echartData,));
           }
           console.log(response);
       }
    },
    created() {
        this.getEchartData();
    },
    mounted() {
         this.echart = echarts.init(document.getElementById('echarts'));
    },
};
</script>

<style lang="less" scoped>
    
</style>
