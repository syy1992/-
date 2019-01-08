<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <Row>
        <Col span="24">
            <Table style='max-width: 1650px;'  border :columns="liabilityColumnsList" :data="responsibility.result"></Table>
            <Page :total="responsibility.totalSize" show-total :page-size="10" @on-change="pages" style="margin-top: 10px"/>
        </Col>
    </Row>
</template>

<script>
    export default {
        name: 'duty',
        props: {
            responsibility: Object
        },
        data () {
            return {
                page: 10,
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
                ]
            };
        },
        methods: {
            pages (event) {
                //子组件中 触发父组件方法 ee 并传值event
                this.$emit('ee',event);
            }
        }
    };
</script>

















