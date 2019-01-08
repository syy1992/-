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
                        <Button type='primary' @click='showSalesmanTableModal(1)'>增加</Button>
                        <!--<div style='float: right'>-->
                            <!--<DatePicker type="daterange"  placement="left-start"  v-model='dateRange' placeholder="选择日期" style="width: 200px" ></DatePicker>-->
                            <!--<Button type='primary' @click='ajaxSalesmanQuery'>查询</Button>-->
                        <!--</div>-->
                    </div>
                    <div>
                        <Table :columns="salesmanColumnsList" :data="salesmanTableData" border></Table>
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
        <Modal width="600" v-model="showSalesmanModal" class-name="vertical-center-modal">
            <p slot="header">
                <span>{{salesmanTitle}}</span>
            </p>
            <div>
                <Form :label-width="120" ref="submitEditSalesmanForm" :model="salesmanForm" :rules="ruleValidateEditSalesman">
                    <div>

                        <iCol>
                            <FormItem label="业务员编号：" prop='salesmanNo' required>
                                <Input style="width: 400px" placeholder='输入业务员编号' v-model='salesmanForm.salesmanNo'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="姓名：" prop='name' required>
                                <Input style="width: 400px" placeholder='输入姓名' v-model='salesmanForm.name'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="手机号：" prop='phone' required>
                                <Input style="width: 400px" placeholder='输入手机号' v-model='salesmanForm.phone' > </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="地址：" prop='address' required>
                                <Input style="width: 400px" placeholder='输入地址' v-model='salesmanForm.address'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="平台：" prop='platformNo' required v-if='access<2'>
                                <Input style="width: 400px" placeholder='请输入平台' v-model='salesmanForm.platformNo'  clearable  > </Input>
                                <!--<Select  v-model='salesmanForm.platformNo' style="width:400px;" @on-change='selectPlatQuery' >-->
                                    <!--<Option v-for="(item,index) in selectPlatList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>-->
                                <!--</Select>-->
                            </FormItem>
                            <FormItem label="平台：" prop='platformNo' required v-else>
                                <!--<Select  v-model='salesmanForm.platformNo' style="width:400px;" disabled>-->
                                    <!--<Option v-for="(item,index) in selectPlatList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>-->
                                <!--</Select>-->
                                <Input style="width: 400px" placeholder='请输入平台' v-model='salesmanForm.platformNo'  clearable disabled> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="渠道号：" prop='channelNo' required>
                                <Input style="width: 400px" placeholder='输入渠道号' v-model='salesmanForm.channelNo'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="邮箱：" prop='mail' required>
                                <Input style="width: 400px" placeholder='输入邮箱' v-model='salesmanForm.mail'> </Input>
                            </FormItem>
                        </iCol>

                    </div>
                </Form>
            </div>
            <div slot="footer" style='text-align:center;border-top: none'>
                <Button type="primary" @click='cancelSalesmanModal'>取消</Button>
                <Button type="primary" @click="submitSalesmanEvent()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import format from '../../libs/format.js';
export default {
    name: 'agent',
    data () {
        return {
            dateRange: '',
            startDate: '',
            endDate: '',
            total: 0,
            pageNum: 1,
            pageSize: 10,
            userId: Cookies.get('userId'),
            platformNo: Cookies.get('platformNo'),
            access: /*Cookies.get('access'),*/localStorage.getItem('access'),
            selectPlatList:[],
            salesmanColumnsList: [
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '业务员编号',
                    align: 'center',
                    key: 'salesmanNo'
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '手机号',
                    align: 'center',
                    key: 'phone'
                },
                {
                    title: '邮箱',
                    align: 'center',
                    key: 'mail'
                },
                {
                    title: '地址',
                    align: 'center',
                    key: 'address'
                },
                {
                    title: '平台编号',
                    align: 'center',
                    key: 'platformNo'
                },
                {
                    title: '渠道编号',
                    align: 'center',
                    key: 'channelNo'
                },
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
                                    this.showSalesmanTableModal(2, params.index);
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
                                on: { click: () => { this.ajaxRemoveSalesmanQuery(params.index); }
                                }
                            }, '删除')
                        ]);
                    }*/
                }
            ],
            salesmanTableData: [],
            showSalesmanModal: false,
            salesmanForm: {
                'name': '',
                'salesmanNo': '',
                'phone': '',
                'address': '',
                'platformNo': '',
                'channelNo': '',
                'mail': ''
            }, // 业务员form
            ruleValidateEditSalesman: {
                'name': [{ required: true, message: '姓名不能为空', trigger: 'change' }],
                'salesmanNo': [{ required: true, message: '业务员编号不能为空', trigger: 'change' }],
                'phone': [
                    {message: '手机号不能为空且为数字', required: true, trigger: 'change'},
                    {pattern: /^1[0-9]{10}$/, message: '手机号码输入错误', trigger: 'input'}
                ],
                'address': [{ required: true, message: '地址不能为空', trigger: 'change'}],
                 'platformNo':[{ required: true, message: '平台号不能为空',pattern: /.+/, trigger: 'change'}],
                'channelNo': [{ required: true, message: '渠道号不能为空', trigger: 'change'}],
                'mail': [
                    { required: true, message: '邮箱不能为空', trigger: 'change' },
                    { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/, message: '邮箱不合法', trigger: 'input' }
                ]
            }, // 业务员校验
            salesmanmodel: 1, // 增加按钮模式1，编辑按钮模式2或者空
            salesmanTitle: '增加业务员信息'// 增加按钮模式1，编辑按钮模式2
        };
    },
    methods: {
        selectPlatQuery(){
            let url =process.env.BASE_URL+process.env.commonPort+'/ins/common/platformDic';//
            this.$http.post(url,{}).then(response=>{
                this.selectPlatList= response.data.data;
            });
        },
        getData () {
            this.ajaxSalesmanQuery();
        },
        pageChange (index) {
            this.ajaxSalesmanQuery(null, index);
        },
        // 请求查询业务员表
        ajaxSalesmanQuery (event, pageIndex) {
            pageIndex = (pageIndex == undefined ? 1 : pageIndex);
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/salesmanPageQuery';
            let params = {
                'userId': parseInt(this.userId),
                'pageIndex': pageIndex,
                'pageSize': 10
            };

            if (this.dateRange[0] != null && this.dateRange.length !== 0) {
                // 如果选定了日期
                params['startDateStr'] = this.dateRange[0].format('yyyy-MM-dd');
                params['endDateStr'] = this.dateRange[1].format('yyyy-MM-dd');
            }

            this.$http.post(url, params).then(response => {
                let res = response.data.data;
                console.log(res);
                this.salesmanTableData = res.result;
                // 读取分页信息
                // 由于后端返回的res.currentPageNo数值不正确（始终为1），因此临时改为取上传的pageIndex参数，作为当前页码
                //                    this.pageNum=res.currentPageNo;
                this.pageNum = pageIndex;
                this.total = res.totalSize;
            });
        },
        // 请求增加业务员表
        ajaxAddSalesmanQuery () {
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
            delete this.salesmanForm.id;
            let salesmanFormParam = JSON.stringify(this.salesmanForm);
            this.$http.post(url, {name: 'salesman', action: 'insert', data: salesmanFormParam }).then(response => {
                let res = response.data;
                if (parseInt(res.rtCode) == 0) {
                    this.cancelSalesmanModal();
                    this.ajaxSalesmanQuery();
                } else {
                    console.log(res.rtMsg);
                }
            });
        },
        // 请求修改业务员表
        ajaxEditSalesmanQuery () {
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
            let salesmanFormCopy = JSON.parse(JSON.stringify(this.salesmanForm));
            salesmanFormCopy.id = this.salesmanTableData[this.salesmanForm.index].id;
            let strSalesmanForm = JSON.stringify(salesmanFormCopy);
            this.$http.post(url, {name: 'salesman', action: 'update', data: strSalesmanForm}).then(response => {
                let res = response.data;
                if (res.rtCode == '0000') {
                    this.cancelSalesmanModal();
                    this.ajaxSalesmanQuery();
                } else {
                    console.log(res.rtMsg);
                }
            });
        },
        // 请求删除业务员表
        ajaxRemoveSalesmanQuery (index) {
            let _this = this;
            let config = {
                width: 300,
                title: '提示',
                content: '确定删除么？',
                okText: '确定',
                onOk: function () {
                    let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                    let idObj = {'id': _this.salesmanTableData[index].id};
                    let strId = JSON.stringify(idObj);
                    this.$http.post(url, {name: 'salesman', action: 'delete', data: strId})
                        .then(response => {
                            _this.ajaxSalesmanQuery();
                        })
                        .catch(error => {
                            console.log('error=' + error);
                        });
                }
            };
            this.$Modal.confirm(config);
        },
        // 显示业务员表弹框
        showSalesmanTableModal (salesmanmodel, index) {
            this.showSalesmanModal = true;
            this.handleReset('submitEditSalesmanForm');
            // this.salesmanForm.planNo=this.$route.query.planNoParam;// 固定的
            let _this = this;
            this.salesmanmodel = salesmanmodel;
            if (salesmanmodel == 1) {
                // 弹框为【增加】模式
                this.salesmanTitle = '增加业务员信息';
                if (this.access == 2) { // 平台管理员
                    this.salesmanForm.platformNo = this.platformNo;
                }
            } else {
                // 弹框为【编辑】模式
                this.salesmanTitle = '修改业务员信息';
                this.salesmanForm = JSON.parse(JSON.stringify(this.salesmanTableData[index]));
                this.salesmanForm.index = index;
            }
        },
        // 点击业务员表弹框的确定按钮
        submitSalesmanEvent () {
            this.$refs['submitEditSalesmanForm'].validate((valid) => {
                console.log('valid=' + valid);
                if (valid) {
                    this.saveSalesman();
                }
            });
        },
        // 点击确定按钮后发不同请求 1为增加请求 2为修改请求
        saveSalesman () {
            if (this.salesmanmodel == 1) {
                // 发增加请求
                this.ajaxAddSalesmanQuery();
            } else {
                // 发修改请求
                this.ajaxEditSalesmanQuery();
            }
        },
        // 取消点击业务员按钮
        cancelSalesmanModal () {
            this.showSalesmanModal = false;
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    },
    created () {},
    mounted(){
        this.ajaxSalesmanQuery();
        this.selectPlatQuery()
    }
};
</script>
