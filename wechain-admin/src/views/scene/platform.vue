<style lang="less">
    @import '../../styles/common.less';
    @import '../common-components/table.less';
</style>

<template>
    <div>
        <Row>
            <iCol span="24" class="padding-left-10">
                <Card>
                    <p slot="title">
                        <Icon type="ios-keypad"></Icon>
                        合作平台
                    </p>
                    <div class='margin-bottom-10'>
                        <Button type='primary' @click='showPlatformTableModal(1)'>增加</Button>
                    </div>
                    <div>
                        <Table :columns="platformColumnsList" :data="copyPlatformTableData" border></Table>
                        <!--<Table :columns="platformColumnsList" :data=" platformTableData" border></Table>-->
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="total" :current.sync="pageNum" :page-size="pageSize" showTotal @on-change="pageChange"></Page>
                            </div>
                        </div>
                    </div>
                </Card>
            </iCol>
        </Row>
        <Modal width="600" v-model="showPlatformModal" class-name="vertical-center-modal">
            <p slot="header">
                <span>{{platformTitle}}</span>
            </p>
            <div>
                <Form :label-width="120" ref="submitEditPlatformForm" :model="platformForm" :rules="ruleValidateEditPlatform">
                    <div>

                        <iCol>
                            <FormItem label="平台名称：" prop='name' required>
                                <Input style="width: 400px" placeholder='输入平台名称' v-model='platformForm.name'> </Input>
                            </FormItem>
                        </iCol>
                   <!--     <iCol>
                            <FormItem label="平台编号：" prop='platNo' required>
                                <Input style="width: 400px" placeholder='输入平台编号' v-model='platformForm.platNo'> </Input>
                            </FormItem>
                        </iCol>-->
                        <iCol>
                            <FormItem label="平台描述：" prop='description' >
                                <Input style="width: 400px" placeholder='输入平台描述' v-model='platformForm.description'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="返佣费率：" prop='rebateFeeRate' required>
                                <Input style="width: 400px" placeholder='输入返佣费率' v-model='platformForm.rebateFeeRate'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="返佣基数类型：" prop='rebateBaseType'  required>
                                <Select style="width:400px;" v-model='platformForm.rebateBaseType' >
                                    <Option v-for="(item,index) in rebateBaseTypeList" :value="item.infoKey" :key="index">
                                        {{ item.infoValue }}
                                    </Option>
                                </Select>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="创建人：" prop='creator' >
                                <Input style="width: 400px" placeholder='输入创建人' v-model='platformForm.creator'> </Input>
                            </FormItem>
                        </iCol>

                    </div>
                </Form>
            </div>
            <div slot="footer" style='text-align:center;border-top: none'>
                <Button type="primary" @click='cancelPlatformModal'>取消</Button>
                <Button type="primary" @click="submitPlatformEvent()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'platform',
    data () {
        return {
            total: 0,
            pageNum: 1,
            pageSize: 10,
            platformColumnsList: [
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '平台名称',
                    align: 'center',
                    key: 'name'
                },
    /*            {
                    title: '平台编号',
                    align: 'center',
                    key: 'platNo'
                },*/
                {
                    title: '平台描述',
                    align: 'center',
                    key: 'description'
                },
                {
                    title: '返佣费率',
                    align: 'center',
                    key: 'rebateFeeRate'
                },
                {
                    title: '返佣基数类型',
                    align: 'center',
                    key: 'rebateBaseType'
                },
                {
                    title: '创建人',
                    align: 'center',
                    key: 'creator'
                },
                 {
                     title: '创建时间',
                     align: 'center',
                     key: 'createTime'
                 },
                {
                    title: '更新时间',
                    align: 'center',
                    key: 'updateTime'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 140,
//                    render: (h, params) => {
//                        return h('div', [
//                            h('Button', {
//                                props: {
//                                    type: 'primary',
//                                    size: 'small'
//                                },
//                                style: {
//                                    marginRight: '5px'
//                                },
//                                on: { click: () => {
//                                    this.showPlatformTableModal(2, params.index);
//                                }
//                                }
//                            }, '修改'),
//                            h('Button', {
//                                props: {
//                                    type: 'error',
//                                    size: 'small'
//                                },
//                                style: {
//                                    marginRight: '5px'
//                                },
//                                on: { click: () => { this.ajaxRemovePlatformQuery(params.index); }
//                                }
//                            }, '删除')
//                        ]);
//                    }
                }
            ],
            platformTableData: [],
            copyPlatformTableData:[],
            showPlatformModal: false,
            rebateBaseType:1,
            rebateBaseTypeList:[
                {infoKey:1,infoValue:'出单保费'},
                {infoKey:2,infoValue:'税后保费'}
            ],
            platformForm: {
                'name': '',
//                'platNo': '',
                'description': '',
                'rebateFeeRate':'',
                'rebateBaseType':1,
//                'creator': ''
            }, // 平台form
            ruleValidateEditPlatform: {
                'name': [{ required: true, message: '平台名称不能为空', trigger: 'change' }],
//                'platNo': [{ required: true, message: '平台编号不能为空', trigger: 'change' }],
                'description': [{ required: false, message: '平台描述不能为空', trigger: 'change'}],
                'rebateFeeRate': [{required: true,message: '返佣费率为0-1之间小数',pattern:/^(0|0\.\d+)$/, trigger: 'change' }],
                'rebateBaseType':[{required: true, message: '请选择返佣基数类型', pattern: /.+/, trigger: 'change'}],
                'creator': [{ required: false, message: '创建人不能为空', trigger: 'change'}]
            }, // 平台校验
            platformmodel: 1, // 增加按钮模式1，编辑按钮模式2或者空
            platformTitle: '增加平台信息'// 增加按钮模式1，编辑按钮模式2
        };
    },
    methods: {
        pageChange (index) {
            this.ajaxPlatformQuery(null, index);
        },
        // 请求查询平台表
        ajaxPlatformQuery (event, pageIndex) {
            pageIndex = (pageIndex == undefined ? 1 : pageIndex);
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/platformPageQuery';
            let params = {'pageIndex': pageIndex};
            this.$http.post(url, params).then(response => {
                let res = response.data.data;
                this.platformTableData = res.result;

                this.pageNum = pageIndex;
                this.total = res.totalSize;
                this.mapData()
            });
        },
        // 请求增加平台表
        ajaxAddPlatformQuery () {
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
            delete this.platformForm.id;
            let platformFormParam = JSON.stringify(this.platformForm);
            this.$http.post(url, {name: 'platform', action: 'insert', data: platformFormParam }).then(response => {
                let res = response.data;
                if (parseInt(res.rtCode) == 0) {
                    this.cancelPlatformModal();
                    this.ajaxPlatformQuery();
                } else {
                    console.log(res.rtMsg);
                }
            });
        },
        // 请求修改平台表
        ajaxEditPlatformQuery () {
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
            let platformFormCopy = JSON.parse(JSON.stringify(this.platformForm));
            platformFormCopy.id = this.platformTableData[this.platformForm.index].id;
            let strPlatformForm = JSON.stringify(platformFormCopy);
            this.$http.post(url, {name: 'platform', action: 'update', data: strPlatformForm}).then(response => {
                let res = response.data;
                if (res.rtCode == '0000') {
                    this.cancelPlatformModal();
                    this.ajaxPlatformQuery();
                } else {
                    console.log(res.rtMsg);
                }
            });
        },
        // 请求删除平台表
        ajaxRemovePlatformQuery (index) {
            let _this = this;
            let config = {
                width: 300,
                title: '提示',
                content: '确定删除么？',
                okText: '确定',
                onOk: function () {
                    let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                    let idObj = {'id': _this.platformTableData[index].id};
                    let strId = JSON.stringify(idObj);
                    this.$http.post(url, {name: 'platform', action: 'delete', data: strId})
                        .then(response => {
                            _this.ajaxPlatformQuery();
                        })
                        .catch(error => {
                            console.log('error=' + error);
                        });
                }
            };
            this.$Modal.confirm(config);
        },
        // 显示平台表弹框
        showPlatformTableModal (platformmodel, index) {
            this.showPlatformModal = true;
            this.handleReset('submitEditPlatformForm');
            // this.platformForm.planNo=this.$route.query.planNoParam;// 固定的
            let _this = this;
            this.platformmodel = platformmodel;
            if (platformmodel == 1) {
                // 弹框为【增加】模式
                this.platformTitle = '增加平台信息';
            } else {
                // 弹框为【编辑】模式
                this.platformTitle = '修改平台信息';
                this.platformForm = JSON.parse(JSON.stringify(this.platformTableData[index]));
                this.platformForm.index = index;
            }
        },
        // 点击平台表弹框的确定按钮
        submitPlatformEvent () {
            this.$refs['submitEditPlatformForm'].validate((valid) => {
                console.log('valid=' + valid);
                if (valid) {
                    this.savePlatform();
                }
            });
        },
        // 点击确定按钮后发不同请求 1为增加请求 2为修改请求
        savePlatform () {
            if (this.platformmodel == 1) {
                // 发增加请求
                this.ajaxAddPlatformQuery();
            } else {
                // 发修改请求
                this.ajaxEditPlatformQuery();
            }
        },
        // 取消点击平台按钮
        cancelPlatformModal () {
            this.showPlatformModal = false;
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        mapData(){
            this.copyPlatformTableData=JSON.parse(JSON.stringify(this.platformTableData))
            for(let i=0; i<this.copyPlatformTableData.length;i++){
                for(let j in this.rebateBaseTypeList){
                    if(this.copyPlatformTableData[i].rebateBaseType==this.rebateBaseTypeList[j].infoKey){
                        this.copyPlatformTableData[i].rebateBaseType=this.rebateBaseTypeList[j].infoValue
                    }
                }
            }
        },
    },
    created () {
        this.ajaxPlatformQuery();
    }
};
</script>
