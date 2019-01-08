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
                        <Button type='primary' @click='showChannelTableModal(1)'>增加</Button>
                        <!--<div style='float: right'>-->
                            <!--<DatePicker type="daterange"  placement="left-start"  v-model='dateRange' placeholder="选择日期" style="width: 200px" ></DatePicker>-->
                            <!--<Button type='primary' @click='ajaxChannelQuery'>查询</Button>-->
                        <!--</div>-->
                    </div>

                    <div>
                        <Table :columns="channelColumnsList" :data="channelTableData" border></Table>
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
        <Modal width="600" v-model="showChannelModal" class-name="vertical-center-modal">
            <p slot="header">
                <span>{{channelTitle}}</span>
            </p>
            <div>
                <Form :label-width="120" ref="submitEditChannelForm" :model="channelForm" :rules="ruleValidateEditChannel">
                    <div>
                        <iCol>
                            <FormItem label="渠道名称：" prop='channelName' required>
                                <Input style="width: 400px" placeholder='输入渠道名称' v-model='channelForm.channelName'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="渠道标识：" prop='channelNo' required>
                                <Input style="width: 400px" placeholder='输入渠道标识' v-model='channelForm.channelNo'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="平台编号：" prop='platNo' required v-if='access<2'>
                                <!--<Select  v-model='channelForm.platNo' style="width:400px;" @on-change='selectPlatQuery' >-->
                                    <!--<Option v-for="(item,index) in selectPlatList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>-->
                                <!--</Select>-->
                                <Input style="width: 400px" placeholder='请输入平台编号' v-model='channelForm.platNo'  clearable  > </Input>
                            </FormItem>
                            <FormItem label="平台编号：" prop='platformNo' required v-else>
                                <Input style="width: 400px" placeholder='请输入平台编号' v-model='channelForm.platNo'  clearable disabled> </Input>
                                <!--<Select v-model="channelForm.platNo" style="width:400px;"  disabled>-->
                                    <!--<Option v-for="(item,index) in selectPlatList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>-->
                                <!--</Select>-->
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="渠道描述：" prop='description' required>
                                <Input style="width: 400px" placeholder='输入渠道描述' v-model='channelForm.description'> </Input>
                            </FormItem>
                        </iCol>
                    </div>
                </Form>
            </div>
            <div slot="footer" style='text-align:center;border-top: none'>
                <Button type="primary" @click='cancelChannelModal'>取消</Button>
                <Button type="primary" @click="submitChannelEvent()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import tableData from '../common-components/table_data.js';
import Cookies from 'js-cookie';
import format from '../../libs/format.js';
export default {
    name: 'channel',
    data () {
        return {
            selectPlatList: [],
            dateRange: '',
            startDate: '',
            endDate: '',
            total: 0,
            pageNum: 1,
            pageSize: 10,
            channelColumnsList: [
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '渠道名称',
                    align: 'center',
                    key: 'channelName'
                },
                {
                    title: '渠道标识',
                    align: 'center',
                    key: 'channelNo'
                },
                {
                    title: '平台编号',
                    align: 'center',
                    key: 'platNo'
                },
                {
                    title: '渠道描述',
                    align: 'center',
                    key: 'description'
                },
                // {
                //     title: '更新时间',
                //     align: 'center',
                //     key: 'updateTime'
                // },
                // {
                //     title: '创建时间',
                //     align: 'center',
                //     key: 'createTime'
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
                                    this.showChannelTableModal(2, params.index);
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
                                on: { click: () => { this.ajaxRemoveChannelQuery(params.index); }
                                }
                            }, '删除')
                        ]);
                    }*/
                }
            ],
            channelTableData: [],
            showChannelModal: false,
            channelForm: {
                'channelNo': '',
                'platNo': '',
                'description': '',
                'channelName': ''
            }, // 渠道form
            ruleValidateEditChannel: {
                'channelNo': [{ required: true, message: '渠道标识不能为空', trigger: 'change' }],
                 'platNo':[{ required: true, message: '平台编号不能为空', pattern: /.+/,trigger: 'change' }],
                'description': [{ required: true, message: '渠道描述不能为空', trigger: 'change'}],
                'channelName': [{ required: true, message: '渠道名称不能为空', trigger: 'change'}]
            }, // 渠道校验
            channelmodel: 1, // 增加按钮模式1，编辑按钮模式2或者空
            channelTitle: '增加渠道信息', // 增加按钮模式1，编辑按钮模式2
            userId: Cookies.get('userId'),
            access: /*Cookies.get('access'),*/localStorage.getItem('access'),
            platformNo: Cookies.get('platformNo')
        };
    },
    methods: {
        getData () {
            this.ajaxChannelQuery();
        },
        pageChange (index) {
            this.ajaxChannelQuery(null, index);
        },
        // 请求查询渠道表
        ajaxChannelQuery (event, pageIndex) {
            pageIndex = (pageIndex == undefined ? 1 : pageIndex);
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/channelPageQuery';
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
                this.channelTableData = res.result;
                // 读取分页信息
                // 由于后端返回的res.currentPageNo数值不正确（始终为1），因此临时改为取上传的pageIndex参数，作为当前页码
                //                    this.pageNum=res.currentPageNo;
                this.pageNum = pageIndex;
                this.total = res.totalSize;
            });
        },
        pageChange (index) {
            this.dataQuery(null, index);
        },
        selectPlatQuery(){
            let url =process.env.BASE_URL+process.env.commonPort+'/ins/common/platformDic';//
            this.$http.post(url,{}).then(response=>{
                this.selectPlatList= response.data.data;
            });
        },
        // 请求增加渠道表
        ajaxAddChannelQuery () {
            //            let url = 'http://47.104.24.10:8767/ins/config/action';
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
            delete this.channelForm.id;
            let channelFormParam = JSON.stringify(this.channelForm);
            this.$http.post(url, {name: 'channel', action: 'insert', data: channelFormParam }).then(response => {
                let res = response.data;
                if (parseInt(res.rtCode) == 0) {
                    this.cancelChannelModal();
                    this.ajaxChannelQuery();
                } else {
                    console.log(res.rtMsg);
                }
            });
        },
        // 请求修改渠道表
        ajaxEditChannelQuery () {
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
            let channelFormCopy = JSON.parse(JSON.stringify(this.channelForm));
            channelFormCopy.id = this.channelTableData[this.channelForm.index].id;
            let strChannelForm = JSON.stringify(channelFormCopy);
            this.$http.post(url, {name: 'channel', action: 'update', data: strChannelForm}).then(response => {
                let res = response.data;
                if (res.rtCode == '0000') {
                    this.cancelChannelModal();
                    this.ajaxChannelQuery();
                } else {
                    console.log(res.rtMsg);
                }
            });
        },
        // 请求删除渠道表
        ajaxRemoveChannelQuery (index) {
            let _this = this;
            let config = {
                width: 300,
                title: '提示',
                content: '确定删除么？',
                okText: '确定',
                onOk: function () {
                    let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                    let idObj = {'id': _this.channelTableData[index].id};
                    let strId = JSON.stringify(idObj);
                    this.$http.post(url, {name: 'channel', action: 'delete', data: strId})
                        .then(response => {
                            _this.ajaxChannelQuery();
                        })
                        .catch(error => {
                            console.log('error=' + error);
                        });
                }
            };
            this.$Modal.confirm(config);
        },
        // 显示渠道表弹框
        showChannelTableModal (channelmodel, index) {
            this.showChannelModal = true;
            this.handleReset('submitEditChannelForm');
            // this.channelForm.planNo=this.$route.query.planNoParam;// 固定的
            let _this = this;
            this.channelmodel = channelmodel;
            if (channelmodel == 1) {
                // 弹框为【增加】模式
                this.channelTitle = '增加渠道信息';
                if (this.access == 2) { // 平台管理员
                    this.channelForm.platNo = this.platformNo;
                }
            } else {
                // 弹框为【编辑】模式
                this.channelTitle = '修改渠道信息';
                this.channelForm = JSON.parse(JSON.stringify(this.channelTableData[index]));
                this.channelForm.index = index;
            }
        },
        // 点击渠道表弹框的确定按钮
        submitChannelEvent () {
            this.$refs['submitEditChannelForm'].validate((valid) => {
                console.log('valid=' + valid);
                if (valid) {
                    this.saveChannel();
                }
            });
        },
        // 点击确定按钮后发不同请求 1为增加请求 2为修改请求
        saveChannel () {
            if (this.channelmodel == 1) {
                // 发增加请求
                this.ajaxAddChannelQuery();
            } else {
                // 发修改请求
                this.ajaxEditChannelQuery();
            }
        },
        // 取消点击渠道按钮
        cancelChannelModal () {
            this.showChannelModal = false;
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    },
    mounted () {
        this.getData();
        this.selectPlatQuery();
    }
};
</script>
