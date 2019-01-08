<template>
    <div style="width:100%;height:100%;" id="premium_request_con"></div>
</template>

<script>
    import echarts from 'echarts';
    import Cookies from 'js-cookie';
    export default {
        name: 'PremiumRequests',
        data () {
            return {
                option: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    grid: {
                        top: '3%',
                        left: '1.2%',
                        right: '1%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: []
                        //                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '保费',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {normal: {
                                color: '#2d8cf0'
                            }},
                            data: []
                        //                    data: [120, 132, 101, 134, 90, 230, 210]
                        }

                    ]
                }
            };
        },
        methods: {

            // 请求保费
            getpremium (selectVal) {
                console.log('getpremium run');
                let url = '';
                //                let baseURL='http://47.104.24.10:8767';
                //                let testURL='http://47.104.24.10:8767';
                //                let localURL='http://192.168.1.4:8767';
                let userId = Cookies.get('userId');
                if (selectVal == '1' || selectVal == undefined) {
                    url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/queryWeekPremiums';
                } else {
                    url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/queryMonthPremiums';
                }
                console.log('process.env.BASE_URL=' + process.env.BASE_URL);
                //            let _this=this;
                this.$http.post(url, {'userId': userId})
                    .then(response => {
                        let res = response.data.data;
                        console.log(res)
                        const premiumRequestCharts = echarts.init(document.getElementById('premium_request_con'));
                        premiumRequestCharts.setOption({ // 加载数据图表
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'cross',
                                    label: {
                                        backgroundColor: '#6a7985'
                                    }
                                }
                            },
                            grid: {
                                top: '3%',
                                left: '1.2%',
                                right: '1%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    boundaryGap: false,
                                    data: res.time
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    name: '保费',
                                    type: 'line',
                                    stack: '总量',
                                    areaStyle: {normal: {
                                        color: '#2d8cf0'
                                    }},
                                    data: res.premium
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
            this.getpremium();
        }
    };
</script>