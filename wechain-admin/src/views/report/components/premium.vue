<style lang="less" scoped>
    @import '../../../styles/common.less';
    span,.ivu-input-type,.ivu-select{margin-right:5px;}
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal {
            top: 0;
        }
    }
    .ivu-modal-footer {border-top: none;}
    label{display: inline-block;width: 90px;margin-right: 5px;line-height: 20px;}
    span{display: inline-block;line-height: 20px;}
</style>

<template>
    <div style="width:100%;height:100%;" id="premium_request_con"></div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: 'premiun',
        props: {
            startTime: String,
            endTime: String,
            recognizee: Object
        },
        methods: {
            drawLine (startTime, endTime, recognizee) {
                    let url = process.env.BASE_URL+process.env.commonPort+'/report/plat_stats';
                    let params = {startDate: startTime, endDate: endTime, platNos: recognizee};
                    this.$http.post(url, params)
                        .then(response => {
                            let res = response.data.data;
                            let platName = [];
                            let premiumSum = [];
                            if( res == '' || res == null || res == undefined ){
                                platName = [];
                                premiumSum = [];
                            }
                            else{
                                for( let i=0;i<res.platStatsList.length;i++){
                                    platName.push(res.platStatsList[i].platName);
                                    premiumSum.push(res.platStatsList[i].premiumSum);
                                }
                                //删除为空的值
                                for( let i=0;i<premiumSum.length;i++ ){
                                    if( premiumSum[i] == '' || premiumSum[i] == null || premiumSum[i] == undefined ){
                                        premiumSum.splice(i,1);
                                        platName.splice(i,1);
                                    }
                                }

                            }
                            function formatNum(strNum) {
                                if (strNum.length <= 3) {
                                    return strNum;
                                }
                                if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
                                    return strNum;
                                }
                                let a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
                                let re = new RegExp();
                                re.compile("(\\d)(\\d{3})(,|$)");
                                while (re.test(b)) {
                                    b = b.replace(re, "$1,$2$3");
                                }
                                return a + "" + b + "" + c;
                            }
                            const premiumRequestCharts = echarts.init(document.getElementById('premium_request_con'));
                            premiumRequestCharts.setOption({ // 加载数据图表
                                color: ['#2d8cf0'],
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'shadow'
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
                                        type: 'category',
                                        data: platName,
                                        axisTick: {
                                            alignWithLabel: true
                                        },
                                        axisLabel: {
                                            formatter: '{value}'
                                        }
                                    }
                                ],
                                yAxis: [
                                    {
                                        type: 'value',
                                        name: '元',
                                        axisLabel: {
                                            formatter: '{value}'
                                        }
                                    }
                                ],
                                series: [
                                    {
                                        name: '保费',
                                        type: 'bar',
                                        barWidth: '30%',
                                        data: premiumSum,
                                        label: {
                                            normal: {
                                                show: true,
                                                position: 'top',
                                                formatter: function(p){
                                                    return formatNum(p.value);
                                                }

                                            }
                                        }
                                    }
                                ]
                            });

                            window.addEventListener('resize', function () {
                                premiumRequestCharts.resize();
                            });
                        })
                        .catch(error => {
                            console.log('error=' + error);
                        });

            }
        },
        mounted () {
            this.drawLine()
        }
    }
</script>
