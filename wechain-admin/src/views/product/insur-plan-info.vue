<style lang="less" >
    @import '../../styles/common.less';
    @import '../common-components/table.less';
    /*.ivu-input-wrapper{float:left;}*/
    /*.ivu-form-item {*/
    /*margin-bottom: 10px;*/
    /*}*/
    /*.ivu-form-item-error-tip {*/
    /*position: relative;*/
    /*top: 5px;*/
    /*left: 0;*/
    /*line-height: 1;*/
    /*padding-top: 6px;*/
    /*color: #ed3f14;*/
    /*float: left;*/
    /*margin-left: 10px;*/
    /*!* display: none; *!*/
    /*}*/
    .ivu-form-item{float: left;}
    .clearfix {
        *zoom: 1;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        line-height: 0;
        content: "";
    }
    .clearfix:after {
        clear: both;
    }
    #planinfo{
        .ivu-form{
            .ivu-form-item{
                .ivu-form-item-label{width: 160px;}
            }
        }
    }
</style>

<template>
    <div id='planinfo'>
        <Row>
            <iCol span="24" class="margin-bottom-10">
                <Card>
                    <p slot="title">
                        <Icon type="ios-keypad"></Icon>
                        责任表
                    </p>
                    <!--<div class='margin-bottom-10'>-->
                        <!--<Button type='primary' @click='showLiabilityTableModal(1)'>增加</Button>-->
                    <!--</div>-->
                    <Card class='margin-bottom-10'>
                        <Row>
                            <p class='margin-bottom-5' style='font-size: 15px;font-weight: bolder'>方案信息</p>
                            <iCol span='4' v-for='(item,index) in planColumnsList' :key='index'>
                                <span style='font-weight: bolder;font-size:12px;'>{{item.title}}：</span>
                                <label  style='font-size:12px;'>{{planData[item.key]}}</label>
                            </iCol>
                        </Row>
                    </Card>
                    <div>
                        <Table style=''  border :columns="liabilityColumnsList" :data="copyLiabilityTableData"></Table>
                        <!--<Table style=''  border :columns="liabilityColumnsList" :data="liabilityTableData"></Table>-->
                    </div>
                </Card>
            </iCol>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'insur-liability',
        data () {
            return {
                radioData:[
                    {label:'false',value:'否'},
                    {label:'true',value:'是'}
                ],
                riskCategoryList:[
                    {infoKey:'1',infoValue:'险类1'},
                    {infoKey:'2',infoValue:'险类2'},
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
                ],
                planColumnsList: [
                    {
                        title: '产品编号',
                        key: 'productNo',
                    },
                    {
                        title: '方案名称',
                        key: 'planName',
                    },
                    {
                        title: '内部产品方案编号',
                        key: 'planNo'
                    },
                    {
                        title: '保险公司产品方案编号',
                        key: 'insPlanNo'
                    },
                    {
                        title: '保险机构编号',
                        key: 'institNo'
                    },
                    {
                        title: '优惠比例',
                        key: 'discountRate'
                    },
                    {
                        title: '投保份数限制',
                        key: 'maxNum'
                    },
                    {
                        title: '保险期限(天）',
                        key: 'period'
                    },
                    {
                        title: '是否定额方案',
                        key: 'quotaScheme'
                    },
                    {
                        title: '固定费率',
                        key: 'fixedRate'
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
                        title: '经济费费率',
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
                    {
                        title: '总保额',
                        key: 'totalAmount'
                    },
                    {
                        title: '总保费',
                        key: 'totalPremium'
                    },
//                            {
//         title: '拓展信息',
//         width: 220,
//         align: 'center',
//         key: 'extendJson',
//         },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '更新时间',
                        key: 'updateTime'
                    },
                ],
                planData:{},
                riskTypeList:[
                    {infoKey:'0001',infoValue:'测试001'},
                    {infoKey:'0002',infoValue:'测试002'},
                ],
                strategyList:[  {label:'1',value:'取免赔额和免赔高者'}],
                productList:[],
                liabilityColumnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center',
                        fixed: 'left',
                    },

                    {
                        title: '产品编号',
                        width: 200,
                        align: 'center',
                        key: 'planNo'
                    },
                    {
                        title: '责任编号',
                        width: 200,
                        align: 'center',
                        key: 'itemNo'
                    },
                    {
                        title: '责任名称',
                        width: 200,
                        align: 'center',
                        key: 'itemName'
                    },
                    {
                        title: '险类',//
                        width: 200,
                        align: 'center',
                        key: 'riskTypeNo'
                    },
                    {
                        title: '每人保额上限',
                        width: 120,
                        align: 'center',
                        key: 'perPersonAmount',
                    },
                    {
                        title: '每次保额上限',
                        width: 120,
                        align: 'center',
                        key: 'perTimeAmount'
                    },
                    {
                        title: '条款',
                        width: 160,
                        align: 'center',
                        key: 'clauseNo'
                    },
                    {
                        title: '主附加险',
                        width: 120,
                        align: 'center',
                        key: 'mainSubFlag'
                    },
                    {
                        title: '保额',
                        width: 120,
                        align: 'center',
                        key: 'amount',//
                    },
                    {
                        title: '保费',
                        width: 120,
                        align: 'center',
                        key: 'premium',//
                    },
                    {
                        title: '保费费率',
                        width: 120,
                        align: 'center',
                        key: 'amountRate',//
                    },
                    {
                        title: '是否计入保额保费',
                        width: 120,
                        align: 'center',
                        key: 'isIncluded',//
                    },
                    {
                        title: '免赔率',
                        width: 90,
                        align: 'center',
                        key: 'deductRate'
                    },
                    {
                        title: '免赔策略',
                        width: 150,
                        align: 'center',
                        key: 'deductStrategy'
                    },
                    {
                        title: '描述',
                        width: 200,
                        align: 'center',
                        key: 'description',
                    },

//                    {
//                        title: '扩展信息',
//                        width: 250,
//                        align: 'center',
//                        key: 'extendInfo'
//                    },
//                    {
//                        title: '创建时间',
//                        align: 'center',
//                        key: 'createTime'
//                    },
//                    {
//                        title: '更新时间',
//                        width: 200,
//                        align: 'center',
//                        key: 'updateTime'
//                    },
//                    {
//                        title: '操作',
//                        align: 'center',
//                        width: 140,
//                        fixed:'right',
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
//                                    on: { click: () => {
//                                        this.showLiabilityTableModal(2,params.index)
//                                    }
//                                    }
//                                }, '修改'),
//                                h('Button', {
//                                    props: {
//                                        type: 'error',
//                                        size: 'small'
//                                    },
//                                    style: {
//                                        marginRight: '5px'
//                                    },
//                                    on: { click: () => { this.ajaxRemoveLiabilityQuery(params.index)  }
//                                    }
//                                }, '删除'),
//                            ])
//                        }
//                    }
                ],
                liabilityTableData: [],
                copyLiabilityTableData:[],
                ruleValidateEditLiability:{
                    'planNo':[{ required: true, message: '产品编号不能为空', trigger: 'change' }],
                    'itemNo':[{ required: true, message: '责任编号不能为空', trigger: 'change' }],
                    'itemName':[{ required: true, message: '责任名称不能为空', trigger: 'change' }],
                    'riskCategory':[{ required: true, message: '险类不能为空', trigger: 'change' }],
                    'riskTypeNo':[{ required: true, message: '险种名称不能为空', trigger: 'change' }],
//                    'riskTypeName':[{ required: true, message: '险种名称不能为空', trigger: 'change' }],
                    'amount':[{ required: true, message: '保额不能为空且为数字', trigger: 'change',type: 'number'  }],
                    'premium':[{ required: true, message: '保费不能为空且为数字', trigger: 'change' ,type: 'number' }],
                    'amountRate':[{ required: true, message: '保费费率不能为空且为数字', trigger: 'change' ,type: 'number' }],
                    'perPersonAmount':[{ required: false, message: '每人保额上限只能输入数字', pattern:/^\d+$/,trigger: 'change' }],
                    'perTimeAmount':[{ required: false, message: '每次保额上限只能输入数字', pattern:/^\d+$/,trigger: 'change'}],
//                    'totalAmount':[{ required: true, message: '总保额不能为空且为数字', trigger: 'change' ,type: 'number' }],
                    'deductAmount':[{ required: false, message: '免赔额只能输入数字', pattern:/^\d+$/,trigger: 'change'}],
                    'deductRate':[{ required: false, message: '免赔率为0-1之间小数',pattern:/^(0|0\.\d+)$/, trigger: 'change'}],
                    'deductStrategy':[{ required: true, message: '免赔策略不能为空', pattern: /.+/,trigger: 'change'}],

//                        'description':[{ required: true, message: '描述不能为空', trigger: 'change' }],
//                        'otherInfo':[{ required: true, message: '其他不能为空', trigger: 'change' }],
                },//责任校验
            };
        },
        methods: {
            //请求查询责任表
            ajaxLiabilityQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                let planNoParam = this.$route.query.planNoParam;//获取产品方案参数，参数为上一个页面跳转时放置的
                let strPlanNoParam={"planNo":planNoParam};
                this.$http.post(url, {name: 'planItem', action: 'selectall', data:JSON.stringify(strPlanNoParam) }).then(response => {
                    this.liabilityTableData= response.data.data;
                    this.mapLiabilityData()
                });
            },
            //请求方案表
            ajaxPlanQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
//                {"planNo":"TEST002B"}
                let planNoParam ={'planNo':this.$route.query.planNoParam};
                this.$http.post(url, {name: 'plan', action: 'query', data:JSON.stringify(planNoParam) }).then(response => {
                    let res = response.data;
                    if(parseInt(res.rtCode)==0){
                        console.log(res.data)
                        this.planData=res.data;
                        this.mapPlanData()
                    }else {
                        console.log(res.rtMsg)
                    }
                });

            },
            mapPlanData(){
                for (let j in this.settleTypeList) {
                    if (this.planData.settleType == this.settleTypeList[j].label) {
                        this.planData.settleType = this.settleTypeList[j].value;
                    }
                }
                for (let j in this.radioData) {
                    let label = this.radioData[j].label;
                    String.prototype.bool = function () {
                        return (/^true$/i).test(this);
                    };
                    if (this.planData.quotaScheme == label.bool()) {
                        this.planData.quotaScheme = this.radioData[j].value;//map 是否定额
                    }
                }
                for (let j in this.premiumBaseTypeList) {
                    if (this.planData.premiumBaseType == this.premiumBaseTypeList[j].label) {
                        this.planData.premiumBaseType = this.premiumBaseTypeList[j].value;
                    }
                }
                for (let j in this.isTrueList) {
                    if (this.planData.isGroup == this.isTrueList[j].label) {
                        this.planData.isGroup = this.isTrueList[j].value;
                    }
                    if (this.planData.taxFlag == this.isTrueList[j].label) {
                        this.planData.taxFlag = this.isTrueList[j].value;
                    }
                }

            },
            mapLiabilityData(){
                this.copyLiabilityTableData = JSON.parse(JSON.stringify(this.liabilityTableData))
                for (let i = 0; i < this.copyLiabilityTableData.length; i++) {
                    for (let j in this.radioData) {
                        let label = this.radioData[j].label;
                        String.prototype.bool = function () {
                            return (/^true$/i).test(this);
                        };
                        if(this.copyLiabilityTableData[i].mainSubFlag == label.bool()) {
                            this.copyLiabilityTableData[i].mainSubFlag = this.radioData[j].value;//map 是否定额
                        }
                    }

                    for (let j in this.strategyList) {
                        if(this.copyLiabilityTableData[i].deductStrategy == this.strategyList[j].label) {
                            this.copyLiabilityTableData[i].deductStrategy = this.strategyList[j].value;
                        }
                    }
                }
            },
//            mainSubFlag
        },
        created () {
            this.ajaxPlanQuery()
            this.ajaxLiabilityQuery();
        },
        watch: {
            //监听路由跳转，页面变化
            '$route'(to,from){
                this.ajaxPlanQuery()
                this.ajaxLiabilityQuery();
            }
        }
    };
</script>
