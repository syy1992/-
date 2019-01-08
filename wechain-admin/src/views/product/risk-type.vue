<style lang="less">
    @import '../../styles/common.less';
    @import '../common-components/table.less';
</style>

<template>
    <div>
        <Row>
            <iCol span="24" class="padding-left-10">
                <Card>
                    <div class='margin-bottom-10'>
                        <Button type='primary' @click='showRisktypeTableModal(1)'>增加</Button>
                    </div>
                    <div>
                        <Table :columns="risktypeColumnsList" :data="risktypeTableData" border></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="total" :current.sync="pageNum" :page-size="pageSize" showTotal @on-change="pageChange"></Page>
                                <!--<Page :total="total" :current="pageNum" showTotal @on-change="changePage"></Page>-->
                            </div>
                        </div>
                    </div>
                </Card>
            </iCol>
        </Row>
        <Modal width="600" v-model="showRisktypeModal" class-name="vertical-center-modal">
            <p slot="header">
                <span>{{risktypeTitle}}</span>
            </p>
            <div>
                <Form :label-width="120" ref="submitEditRisktypeForm" :model="risktypeForm" :rules="ruleValidateEditRisktype">
                    <div>

                        <iCol>
                            <FormItem label="险种名称：" prop='riskTypeName' required>
                                <Input style="width: 400px" placeholder='输入险种名称' v-model='risktypeForm.riskTypeName'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="险种编号：" prop='riskTypeNo' required>
                                <Input style="width: 400px" placeholder='输入险种编号' v-model='risktypeForm.riskTypeNo'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="所属险类编号：" prop='riskCategoryNo' required>
                                <Input style="width: 400px" placeholder='输入所属险类编号' v-model='risktypeForm.riskCategoryNo' > </Input>
                            </FormItem>
                        </iCol>
                        <!--<iCol>-->
                            <!--<FormItem label="所属险类名称：" prop='categoryName' required>-->
                                <!--<Input style="width: 400px" placeholder='输入所属险类名称' v-model='risktypeForm.categoryName'> </Input>-->
                            <!--</FormItem>-->
                        <!--</iCol>-->
                    </div>
                </Form>
            </div>
            <div slot="footer" style='text-align:center;border-top: none'>
                <Button type="primary" @click='cancelRisktypeModal'>取消</Button>
                <Button type="primary" @click="submitRisktypeEvent()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'risk-type',
        data () {
            return {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                risktypeColumnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '险种名称',
                        align: 'center',
                        key: 'riskTypeName'
                    },
                    {
                        title: '险种编号',
                        align: 'center',
                        key: 'riskTypeNo'
                    },
                    {
                        title: '所属险类编号',
                        align: 'center',
                        key: 'riskCategoryNo'

                    },
//                    {
//                        title: '所属险类名称',
//                        align: 'center',
//                        key: 'riskCategoryName'
//
//                    },
                    // {
                    //     title: '是否主险',
                    //     align: 'center',
                    //     key: 'work'
                    // },
                        {
                        title: '操作',
                        align: 'center',
                        width: 140,
                        /*render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: { click: () => {
                                        this.showRisktypeTableModal(2, params.index);
                                    }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: { click: () => { this.ajaxRemoveRisktypeQuery(params.index); }
                                    }
                                }, '删除')
                            ]);
                        }*/
                    }
                ],
                risktypeTableData: [],
                showRisktypeModal: false,
                risktypeForm: {
                    'riskTypeName': '',
                    'riskTypeNo': '',
                    'riskCategoryNo': '',
//                    'categoryName': ''
                }, // 险种form
                ruleValidateEditRisktype: {
                    'riskTypeNo': [{ required: true, message: '险种编号不能为空', trigger: 'change' }],
                    'riskTypeName': [{ required: true, message: '险种名称不能为空', trigger: 'change' }],
                    'riskCategoryNo': [{ required: true, message: '所属险类编号不能为空', trigger: 'change'}],
//                    'categoryName': [{ required: true, message: '所属险类名称不能为空', trigger: 'change'}]
                }, // 险种f校验
                risktypemodel: 1, // 增加按钮模式1，编辑按钮模式2或者空
                risktypeTitle: '增加险种配置信息'// 增加按钮模式1，编辑按钮模式2
            };
        },
        methods: {
            getData () {
                this.ajaxRisktypeQuery();
            },
            pageChange (index) {
                this.ajaxRisktypeQuery(null, index);
            },

            // 请求查询险种表
            ajaxRisktypeQuery (event, pageIndex) {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/insRiskTypePageQuery';
                pageIndex = (pageIndex == undefined ? 1 : pageIndex);
                //            this.columnsList = tableData.planTableColumns;
                let params = {'pageIndex': pageIndex};
                this.$http.post(url, params).then(response => {
                    let res = response.data.data;
                    this.risktypeTableData = res.result;
                    this.pageNum = pageIndex;
                    this.total = res.totalSize;
                });
            },
            // 请求增加险种表
            ajaxAddRisktypeQuery () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                delete this.risktypeForm.id;
                let risktypeFormParam = JSON.stringify(this.risktypeForm);
                this.$http.post(url, {name: 'risktype', action: 'insert', data: risktypeFormParam }).then(response => {
                    let res = response.data;
                    if (parseInt(res.rtCode) == 0) {
                        this.cancelRisktypeModal();
                        this.ajaxRisktypeQuery();
                    } else {
                        console.log(res.rtMsg);
                    }
                });
            },
            // 请求修改险种表
            ajaxEditRisktypeQuery () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                let risktypeFormCopy = JSON.parse(JSON.stringify(this.risktypeForm));
                risktypeFormCopy.id = this.risktypeTableData[this.risktypeForm.index].id;
                let strRisktypeForm = JSON.stringify(risktypeFormCopy);
                this.$http.post(url, {name: 'risktype', action: 'update', data: strRisktypeForm}).then(response => {
                    let res = response.data;
                    if (res.rtCode == '0000') {
                        this.cancelRisktypeModal();
                        this.ajaxRisktypeQuery();
                    } else {
                        console.log(res.rtMsg);
                    }
                });
            },
            // 请求删除险种表
            ajaxRemoveRisktypeQuery (index) {
                let _this = this;
                let config = {
                    width: 300,
                    title: '提示',
                    content: '确定删除么？',
                    okText: '确定',
                    onOk: function () {
                        let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                        let idObj = {'id': _this.risktypeTableData[index].id};
                        let strId = JSON.stringify(idObj);
                        this.$http.post(url, {name: 'risktype', action: 'delete', data: strId})
                            .then(response => {
                                _this.ajaxRisktypeQuery();
                            })
                            .catch(error => {
                                console.log('error=' + error);
                            });
                    }
                };
                this.$Modal.confirm(config);
            },
            // 显示险种表弹框
            showRisktypeTableModal (risktypemodel, index) {
                this.showRisktypeModal = true;
                this.handleReset('submitEditRisktypeForm');
                // this.risktypeForm.planNo=this.$route.query.planNoParam;// 固定的
                let _this = this;
                this.risktypemodel = risktypemodel;
                if (risktypemodel == 1) {
                    // 弹框为【增加】模式
                    this.risktypeTitle = '增加险种配置信息';
                } else {
                    // 弹框为【编辑】模式
                    this.risktypeTitle = '修改险种配置信息';
                    this.risktypeForm = JSON.parse(JSON.stringify(this.risktypeTableData[index]));
                    this.risktypeForm.index = index;
                }
            },
            // 点击险种表弹框的确定按钮
            submitRisktypeEvent () {
                this.$refs['submitEditRisktypeForm'].validate((valid) => {
                    console.log('valid=' + valid);
                    if (valid) {
                        this.saveRisktype();
                    }
                });
            },
            // 点击确定按钮后发不同请求 1为增加请求 2为修改请求
            saveRisktype () {
                if (this.risktypemodel == 1) {
                    // 发增加请求
                    this.ajaxAddRisktypeQuery();
                } else {
                    // 发修改请求
                    this.ajaxEditRisktypeQuery();
                }
            },
            // 取消点击险种按钮
            cancelRisktypeModal () {
                this.showRisktypeModal = false;
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        mounted () {
        //            this.ajaxRisktypeQuery()
            this.getData();
        }
    };
</script>
