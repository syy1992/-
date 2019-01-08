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
                        <Button type='primary' @click='showInstitTableModal(1)'>增加</Button>
                    </div>
                    <div>
                        <Table :columns="institColumnsList" :data="copyInstitTableData" border></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="total" :current.sync="pageNum" :page-size="pageSize" showTotal @on-change="pageChange"></Page>
                            </div>
                        </div>
                    </div>

                </Card>
            </iCol>
        </Row>
        <Modal width="600" v-model="showInstitModal" class-name="vertical-center-modal">
            <p slot="header">
                <span>{{institTitle}}</span>
            </p>
            <div>
                <Form :label-width="120" ref="submitEditInstitForm" :model="institForm" :rules="ruleValidateEditInstit">
                    <div>

                        <iCol>
                            <FormItem label="机构编号：" prop='institutionNo' required>
                                <Input style="width: 400px" placeholder='输入机构编号' v-model='institForm.institutionNo'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="机构名称：" prop='name' required>
                                <Input style="width: 400px" placeholder='输入机构名称' v-model='institForm.name'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="机构类型：" prop='type' required>
                                <Input style="width: 400px" placeholder='输入机构类型' v-model='institForm.type' > </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="经营范围：" prop='regionRange' required>
                                <Input style="width: 400px" placeholder='输入经营范围' v-model='institForm.regionRange'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="是否有网销资质："  prop='isNetSale'  required>
                                <RadioGroup v-model="institForm.isNetSale">
                                    <Radio :label="item.label" :value='item.value' v-for='(item,index) in radioData' :key='index'>{{item.value}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="是否通过其备案：" prop='isRecorded' required>
                                <RadioGroup v-model="institForm.isRecorded">
                                    <Radio :label="item.label" :value='item.value' v-for='(item,index) in radioData' :key='index'>{{item.value}}</Radio>
                                </RadioGroup>
                            </FormItem>
                        </iCol>
                    </div>
                </Form>
            </div>
            <div slot="footer" style='text-align:center;border-top: none'>
                <Button type="primary" @click='cancelInstitModal'>取消</Button>
                <Button type="primary" @click="submitInstitEvent()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    //    import tableData from '../common-components/table_data.js';
    export default {
        name: 'insur-agency',
        data () {
            return {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                institColumnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '机构编号',
                        align: 'center',
                        key: 'institutionNo'
                    },
                    {
                        title: '机构名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '机构类型',
                        align: 'center',
                        key: 'type'
                    },
                    {
                        title: '经营范围',
                        align: 'center',
                        key: 'regionRange'
                    },
                    {
                        title: '是否有网销资质',
                        align: 'center',
                        key: 'isNetSale'
                    },
                    {
                        title: '是否通过其备案',
                        align: 'center',
                        key: 'isRecorded'
                    },
                    //                    {
                    //                        title: '更新时间',
                    //                        align: 'center',
                    //                        key: 'updateTime'
                    //                    },
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
                                        this.showInstitTableModal(2, params.index);
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
                                    on: { click: () => { this.ajaxRemoveInstitQuery(params.index); }
                                    }
                                }, '删除')
                            ]);
                        }*/
                    }
                ],
                institTableData: [],
                copyInstitTableData: [],
                showInstitModal: false,
                institForm: {
                    'institutionNo': '',
                    'name': '',
                    'type': '',
                    'regionRange': '',
                    'isNetSale': 'false',
                    'isRecorded': 'false'
                }, // 保险机构form
                ruleValidateEditInstit: {
                    'institutionNo': [{ required: true, message: '机构编号不能为空', trigger: 'change' }],
                    'name': [{ required: true, message: '机构名称不能为空', trigger: 'change' }],
                    'type': [{ required: true, message: '机构类型不能为空', trigger: 'change'}],
                    'regionRange': [{ required: true, message: '经营范围不能为空', trigger: 'change'}]
                //                    'isNetSale':[{ required: true, message: '所属险类名称不能为空', trigger: 'change'}],
                //                    'isRecorded':[{ required: true, message: '所属险类名称不能为空', trigger: 'change'}],
                }, // 保险机构校验
                institmodel: 1, // 增加按钮模式1，编辑按钮模式2或者空
                institTitle: '增加保险机构信息', // 增加按钮模式1，编辑按钮模式2
                radioData: [
                    {label:'false',value:'否'},
                    {label:'true',value:'是'}
//                    {label: '0', value: '否'},
//                    {label: '1', value: '是'}
                ]

            };
        },
        methods: {
            getData () {
                this.ajaxInstitQuery();
            },
            pageChange (index) {
                this.ajaxInstitQuery(null, index);
            },
            // 请求查询保险机构表
            ajaxInstitQuery (event, pageIndex) {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/institutionPageQuery';
                pageIndex = (pageIndex == undefined ? 1 : pageIndex);
                let params = {'pageIndex': pageIndex};
                this.$http.post(url, params).then(response => {
                    let res = response.data.data;
//                    console.log(typeof res.result[0].isNetSale)

                    this.institTableData = res.result;
                    this.pageNum = pageIndex;
                    this.total = res.totalSize;
                    this.mapData();
                });
            },
            // 请求增加保险机构表
            ajaxAddInstitQuery () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                delete this.institForm.id;
                let institFormParam = JSON.stringify(this.institForm);
                this.$http.post(url, {name: 'instit', action: 'insert', data: institFormParam }).then(response => {
                    let res = response.data;
                    if (parseInt(res.rtCode) == 0) {
                        this.cancelInstitModal();
                        this.ajaxInstitQuery();
                    } else {
                        console.log(res.rtMsg);
                    }
                });
            },
            // 请求修改保险机构表
            ajaxEditInstitQuery () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                let institFormCopy = JSON.parse(JSON.stringify(this.institForm));
                institFormCopy.id = this.institTableData[this.institForm.index].id;
                let strInstitForm = JSON.stringify(institFormCopy);
                this.$http.post(url, {name: 'instit', action: 'update', data: strInstitForm}).then(response => {
                    let res = response.data;
                    if (res.rtCode == '0000') {
                        this.cancelInstitModal();
                        this.ajaxInstitQuery();
                    } else {
                        console.log(res.rtMsg);
                    }
                });
            },
            // 请求删除保险机构表
            ajaxRemoveInstitQuery (index) {
                let _this = this;
                let config = {
                    width: 300,
                    title: '提示',
                    content: '确定删除么？',
                    okText: '确定',
                    onOk: function () {
                        let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                        let idObj = {'id': _this.institTableData[index].id};
                        let strId = JSON.stringify(idObj);
                        this.$http.post(url, {name: 'instit', action: 'delete', data: strId})
                            .then(response => {
                                _this.ajaxInstitQuery();
                            })
                            .catch(error => {
                                console.log('error=' + error);
                            });
                    }
                };
                this.$Modal.confirm(config);
            },
            // 显示保险机构表弹框
            showInstitTableModal (institmodel, index) {
                this.showInstitModal = true;
                this.handleReset('submitEditInstitForm');
                // this.institForm.planNo=this.$route.query.planNoParam;// 固定的
                let _this = this;
                this.institmodel = institmodel;
                if (institmodel == 1) {
                    // 弹框为【增加】模式
                    this.institTitle = '增加保险机构信息';
                } else {
                    // 弹框为【编辑】模式
                    this.institTitle = '修改保险机构信息';
                    this.institForm = JSON.parse(JSON.stringify(this.institTableData[index]));
                    this.institForm.index = index;
                    this.institForm.isNetSale=this.institForm.isNetSale+'';//转换字符串类型
                    this.institForm.isRecorded=this.institForm.isRecorded+'';
                }
            },
            // 点击保险机构表弹框的确定按钮
            submitInstitEvent () {
                this.$refs['submitEditInstitForm'].validate((valid) => {
                    console.log('valid=' + valid);
                    if (valid) {
                        this.saveInstit();
                    }
                });
            },
            // 点击确定按钮后发不同请求 1为增加请求 2为修改请求
            saveInstit () {
                if (this.institmodel == 1) {
                    // 发增加请求
                    this.ajaxAddInstitQuery();
                } else {
                    // 发修改请求
                    this.ajaxEditInstitQuery();
                }
            },
            // 取消点击保险机构按钮
            cancelInstitModal () {
                this.showInstitModal = false;
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            mapData(){
                this.copyInstitTableData=JSON.parse(JSON.stringify(this.institTableData))
                for(let i=0; i<this.copyInstitTableData.length;i++){
                    for(let j in this.radioData){
                        let label=this.radioData[j].label;
                        String.prototype.bool = function() {
                            return (/^true$/i).test(this);
                        };
                        if(this.copyInstitTableData[i].isNetSale==label.bool()){
                            this.copyInstitTableData[i].isNetSale=this.radioData[j].value;//map 是否定额
                            this.copyInstitTableData[i].isRecorded=this.radioData[j].value;//map 是否定额
                        }
                    }
                };
            },
        },
        mounted () {
            this.getData();
        }
    };
</script>
