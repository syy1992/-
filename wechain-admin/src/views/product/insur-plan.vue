<style lang="less" scoped>
    @import '../../styles/common.less';
    @import '../common-components/table.less';
</style>

<template>
    <div>
        <Row>
            <iCol span="24" class="padding-left-10">
                <Card>
                    <div class='margin-bottom-10'>
                        <Button type='primary' @click='showPlanTableModal(1)'>增加</Button>
                    </div>
                    <div>
                        <Table style='max-width: 1650px;' border :columns="planColumnsList" :data="copyPlanTableData"></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="total" :current.sync="pageNum" :page-size="pageSize" showTotal @on-change="pageChange"></Page>
                            </div>
                        </div>
                    </div>
                </Card>
            </iCol>
        </Row>

</div>
</template>
<script>
    import editTable from './editLiabilityTable.vue';
    export default {
        name: 'insur-plan',
        components: {
            editTable,
        },
        data () {
            return {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                planColumnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '产品编号',
                        width: 180,
                        align: 'center',
                        key: 'productNo',
                    },
                    {
                        title: '方案名称',
                        width: 180,
                        align: 'center',
                        key: 'planName',
                    },
                    {
                        title: '内部产品方案编号',
                        width: 180,
                        align: 'center',
                        key: 'planNo'
                    },
                    {
                        title: '保险公司产品方案编号',
                        width: 180,
                        align: 'center',
                        key: 'insPlanNo'
                    },
                    {
                        title: '保险机构编号',
                        width: 150,
                        align: 'center',
                        key: 'institNo'
                    },
                    {
                        title: '优惠比例',
                        width: 100,
                        align: 'center',
                        key: 'discountRate'
                    },
                    {
                        title: '投保份数限制',
                        width: 100,
                        align: 'center',
                        key: 'maxNum'
                    },
                    {
                        title: '保险期限(天）',
                        width: 100,
                        align: 'center',
                        key: 'period'
                    },
                    {
                        title: '是否定额方案',
                        width: 100,
                        align: 'center',
                        key: 'quotaScheme'
                    },
                    {
                        title: '固定费率',
                        width: 120,
                        align: 'center',
                        key: 'fixedRate'
                    },
                    {
                        title: '总保额',
                        width: 100,
                        align: 'center',
                        key: 'totalAmount'
                    },
                    {
                        title: '总保费',
                        width: 100,
                        align: 'center',
                        key: 'totalPremium'
                    },
                    {
                        title: '技术服务费率',
                        width: 100,
                        align: 'center',
                        key: 'techServiceFeeRate'
                    },
                    {
                        title: '经济费费率',
                        width: 100,
                        align: 'center',
                        key: 'brokerageRate'
                    },
                    {
                        title: '过单费费率',
                        width: 100,
                        align: 'center',
                        key: 'genOrderFeeRate'
                    },
                    {
                        title: '是否团单',
                        width: 100,
                        align: 'center',
                        key: 'isGroup'
                    },
                    {
                        title: '结算类型',
                        width: 100,
                        align: 'center',
                        key: 'settleType'
                    },
                    {
                        title: '保费基数类型',
                        width: 100,
                        align: 'center',
                        key: 'premiumBaseType'
                    },
                    {
                        title: '是否含税',
                        width: 100,
                        align: 'center',
                        key: 'taxFlag'
                    },
//                            {
//         title: '拓展信息',
//         width: 220,
//         align: 'center',
//         key: 'extendJson',
//         },
                    {
                        title: '更新时间',
                        width: 150,
                        align: 'center',
                        key: 'updateTime'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 180,
                        fixed: 'right',
//                        render: (h, params) => {
//                            return h('div', [
//                                h('Button', {
//                                    props: {
//                                        type: 'primary',
//                                        size: 'small'
//                                    },
//                                    style: {
//                                        marginRight: '5px'
//                                    },
//                                    on: {
//                                        click: () => {
//                                            this.$router.push({
//                                                path: '/insur-plan-info',
//                                                query: {
//                                                    idParam: params.row.id,
//                                                    planNoParam: params.row.planNo
//                                                }
//                                            });
//                                        }
//                                    }
//                                }, '详情'),
//                                h('Button', {
//                                    props: {
//                                        type: 'primary',
//                                        size: 'small'
//                                    },
//                                    style: {
//                                        marginRight: '5px'
//                                    },
//                                    on: {
//                                        click: () => {
////                            this.showPlanTableModal(2,params.index)
//                                            this.$router.push({
//                                                path: '/addPlan',
//                                                query: {
//                                                    planmodel: 2,
//                                                    idParam: params.row.id,
//                                                    planNoParam: params.row.planNo
//                                                }
//                                            });
//                                        }
//                                    }
//                                }, '修改'),
//                    h('Button', {
//                        props: {
//                            type: 'error',
//                            size: 'small'
//                        },
//                        style: {
//                            marginRight: '5px'
//                        },
//                        on: { click: () => { this.ajaxRemovePlanQuery(params.index)  }
//                        }
//                    }, '删除'),
//                            ])
//                        }
                    }
                ],
                planTableData: [],
                copyPlanTableData: [],
                planmodel: 1,//增加按钮模式1，编辑按钮模式2或者空
                radioData: [
                    {label: 'false', value: '否'},
                    {label: 'true', value: '是'}
                ],
                settleTypeList: [
                    {label: 1, value: '实时'},
                    {label: 2, value: '周结'},
                    {label: 3, value: '月结'},
                ],
                premiumBaseTypeList: [
                    {label: 1, value: '出单保费'},
                    {label: 2, value: '税后保费'},
                ],
                isTrueList:[
                    {label: 0, value: '否'},
                    {label: 1, value: '是'},
                ]
            };
        },
        methods: {
            //查询方案请求
            getData() {
                this.ajaxPlanQuery()
            },
            ajaxPlanQuery(event, pageIndex){
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/insPlanPageQuery';
                pageIndex = (pageIndex == undefined ? 1 : pageIndex);
                let params = {'pageIndex': pageIndex}
                this.$http.post(url, params).then(response => {
                    let res = response.data;
                    if (res.resCode == '0000') {
                        this.planTableData = res.data.result;
                        this.pageNum = pageIndex;
                        this.total = res.data.totalSize;
                        this.mapData()
                    } else {
                        console.log(res.resMsg)
                    }
                });
            },
            pageChange(index){
                this.ajaxPlanQuery(null, index)
            },
             //显示方案表弹框
            showPlanTableModal(planmodel, index){
                this.$router.push({
                    path: '/addPlan',
                    query: {
                        planmodel: planmodel,
                    }
                });
            },
            mapData(){
                this.copyPlanTableData = JSON.parse(JSON.stringify(this.planTableData))
                for (let i = 0; i < this.copyPlanTableData.length; i++) {
                    for (let j in this.radioData) {
                        let label = this.radioData[j].label;
//                        let settleTypeLabel=this.settleTypeList[j].label;
                        String.prototype.bool = function () {
                            return (/^true$/i).test(this);
                        };
                        if (this.copyPlanTableData[i].quotaScheme == label.bool()) {
                            this.copyPlanTableData[i].quotaScheme = this.radioData[j].value;//map 是否定额
                        }
                    }
                    for (let j in this.settleTypeList) {
                        if(this.copyPlanTableData[i].settleType==this.settleTypeList[j].label){
                            this.copyPlanTableData[i].settleType=this.settleTypeList[j].value;
                        }
                    }
                    for (let j in this.premiumBaseTypeList) {
                        if(this.copyPlanTableData[i].premiumBaseType==this.premiumBaseTypeList[j].label){
                            this.copyPlanTableData[i].premiumBaseType=this.premiumBaseTypeList[j].value;
                        }
                    }
                    for (let j in this.isTrueList) {
                        if (this.copyPlanTableData[i].isGroup == this.isTrueList[j].label) {
                            this.copyPlanTableData[i].isGroup = this.isTrueList[j].value;
                        }
                        if(this.copyPlanTableData[i].taxFlag==this.isTrueList[j].label){
                            this.copyPlanTableData[i].taxFlag=this.isTrueList[j].value;
                        }
                    }
                }
            },
            //请求删除方案表
            ajaxRemovePlanQuery(index) {
                let _this = this;
                let config = {
                    width: 300,
                    title: '提示',
                    content: '确定删除么？',
                    okText: '确定',
                    onOk: function () {
                        let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                        let idObj={'id':_this.planTableData[index].id}
                        let strId=JSON.stringify(idObj);
                        this.$http.post(url,{name: 'plan', action: 'delete', data:strId})
                            .then(response => {
                                _this.ajaxPlanQuery()
                            })
                            .catch(error => {
                                console.log('error=' + error);
                            });
                    },
                };
                this.$Modal.confirm(config)
            },
        },
        mounted () {
            this.getData()
        },
        watch: {
//监听路由跳转，页面变化
            '$route'(to, from){
                this.getData()
            }
        }
    };
</script>
