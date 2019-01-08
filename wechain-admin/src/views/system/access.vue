<style lang="less" scoped>
    @import '../../styles/common.less';
    @import '../common-components/table.less';
    .clearfix:before,.clearfix:after {
        content: "";
        display: block;
        clear: both;
    }
    .clearfix {
        zoom: 1;
    }

</style>

<template>
    <div>
        <Row>
            <iCol span="24" class="padding-left-10">
                <Card>
                    <div class='margin-bottom-10'>
                        <Button type='primary' @click='showAccessTableModal(1)'>增加</Button>
                    </div>
                    <div>
                        <Table :columns="accessColumnsList" :data="accessTableData" border></Table>
                    </div>
                </Card>
            </iCol>
        </Row>
        <Modal width="600" v-model="showAccessModal" class-name="vertical-center-modal">
            <p slot="header">
                <span>{{accessTitle}}</span>
            </p>

            <div>
                <Form :label-width="120" ref="submitEditAccessForm" :model="accessForm" :rules="ruleValidateEditAccess">
                    <div>

                        <iCol>
                            <FormItem label="用户名：" prop='username' required>
                                <Input style="width: 400px" placeholder='请输入用户名' v-model='accessForm.username'  clearable> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="密码：" prop='password' required v-if='accessModel==1'>
                                <Input type="password" style="width: 400px" placeholder='请输入密码' v-model='accessForm.password'  clearable> </Input>
                            </FormItem>
                            <FormItem label="密码：" prop='password'  v-else>
                                <Input type="password" style="width: 400px" placeholder='请输入密码' v-model='accessForm.password'  clearable> </Input>
                            </FormItem>
                        </iCol>
                        <iCol  v-if='accessModel==1'>
                            <FormItem label="权限：" prop='role' required>
                                <Select v-model="accessForm.role"  style="width:400px" placeholder="请选择" @on-change='changeRoleEvent'>
                                    <Option v-for="(item,index) in roleList" :value="item.value" :key='index'>{{item.text}}</Option>
                                </Select>
                            </FormItem>
                        </iCol>
                        <iCol v-if='accessModel==1'>
                            <FormItem label="平台：" prop='platformNo' required v-if='accessForm.role!=0&&accessForm.role!=1'>
                                <!--<Input style="width: 400px" placeholder='请输入平台' v-model='accessForm.platformNo'  clearable id='plat1'  class='plat' > </Input>-->
                                <Select v-model="accessForm.platformNo"  style="width:400px" placeholder="请选择平台" @on-change='changePlatEvent' ref='plat' :disabled='isDisabled'>
                                    <Option v-for="(item,index) in platformNoList" :value="item.infoKey"  :key='index'>{{item.infoValue}}</Option>
                                </Select>
                            </FormItem>
                        </iCol>
                        <iCol v-if='accessModel==1'>
                            <FormItem label="渠道：" prop='channelNo' required v-if='accessForm.role==4&&accessForm.platformNo!=""' >
                                <Select v-model="accessForm.channelNo"  style="width:400px" placeholder="请选择渠道"  ref='channle' @on-change='changeChannelEvent' >
                                    <Option v-for="(item,index) in channleList" :value="item.infoKey" :key='index'>{{item.infoValue}}</Option>
                                </Select>
                            </FormItem>
                        </iCol>

                    </div>
                </Form>
            </div>
            <div slot="footer" style='text-align:center;border-top: none'>
                <Button type="primary" @click='cancelAccessModal'>取消</Button>
                <Button type="primary" @click="submitAccessEvent()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
//    import canEditTable from '../common-components/canEditTable.vue';
    import Cookies from 'js-cookie';
    export default {
        name: 'access_index',
        components: {
//            canEditTable
        },
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            const validateisNull = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('内容不能为空'));
                } else {
                    callback();
                }
            };

            return {
                isDisabled: false,
                accessColumnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        align: 'center',
                        key: 'username'
                    },
                    {
                        title: '平台',
                        align: 'center',
                        key: 'platformNo'
                    },
                    {
                        title: '渠道',
                        align: 'center',
                        key: 'channelNo'
                    },
                    {
                        title: '权限',
                        align: 'center',
                        key: 'role'
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
                                        this.showAccessTableModal(2, params.index);
                                    }
                                    }
                                }, '修改')
                            ]);
                        }*/
                    }
                ],
                access: /*Cookies.get('access'),*/ localStorage.getItem('access'),
                platformNo: Cookies.get('platformNo'),
                accessTableData: [],
                copyAccessTableData: null,
                roleList: [
                    {value: 0, text: '超级管理员'},
                    {value: 1, text: '超级运营'},
                    {value: 2, text: '平台管理员'},
                    {value: 3, text: '平台运营'},
                    {value: 4, text: '渠道运营'}
                ],
                roleList2: [
                    {value: 0, text: '超级管理员'},
                    {value: 1, text: '超级运营'},
                    {value: 2, text: '平台管理员'},
                    {value: 3, text: '平台运营'},
                    {value: 4, text: '渠道运营'}
                ],
                channleList: [ ],
                platformNoList: [],
                showAccessModal: false,
                accessForm: {
                    username: '',
                    password: '',
                    role: '',
                    platformNo: '',
                    channelNo: ''
                }, // 权限form
                ruleValidateEditAccess: {
                    username: [
                        { required: true, message: '账号不能为空', trigger: 'change' }
                    ],
                    platformNo: [
                        {required: true, message: '平台不能为空', pattern: /.+/, trigger: 'change'}
                    ],
                    password: [
                        { validator: validatePass, trigger: 'change' },
                        { pattern: /^.{3,15}$/, message: '账号长度必须为3-15位'}
                    ],
                    role: [
                        {required: true, message: '请选择', pattern: /.+/, trigger: 'change'}
                    ],
                    channelNo: [{required: true, message: '请选择', pattern: /.+/, trigger: 'change'}]
                //                    'platNo':[{ required: true, message: '平台编号不能为空', trigger: 'change' }],
                }, // 权限校验
                accessModel: 1, // 增加按钮模式1，编辑按钮模式2或者空
                accessTitle: '增加权限信息', // 增加按钮模式1，编辑按钮模式2
                accessFormCopy1: null
            };
        },
        methods: {
            // 请求查询权限表
            ajaxAccessQuery () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                let id = Cookies.get('userId');
                let idObj = {'id': id};
                this.$http.post(url, {name: 'manageUser', action: 'selectall', data: JSON.stringify(idObj)}).then(response => {
                    console.log(response.data.data)
                    this.accessTableData = response.data.data;
                    for (let i = 0; i < this.accessTableData.length; i++) {
                        let roleRow = this.accessTableData[i];   // 每一条数据
                        let role = roleRow.role;                   // 0
                        var roleName = this.getRoleName(role);    // 超级管理员
                        this.accessTableData[i].role = roleName;
                    }
                });
            },

            //请求增加权限表
            ajaxAddAccessQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                delete  this.accessForm.id;
                let accessFormParam=JSON.stringify(this.accessForm);
                this.$http.post(url, {name: 'manageUser', action: 'insert', data:accessFormParam }).then(response => {
                    let res = response.data;
                    if (parseInt(res.rtCode) == 0) {
                        this.cancelAccessModal();
                        this.ajaxAccessQuery();
                    } else {
                        console.log(res.rtMsg);
                    }
                });
            },
            //请求修改权限表
            ajaxEditAccessQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                if(this.accessForm.role!=4){
                    this.accessForm.channelNo=''
                };
                if (this.accessForm.role == 1) {
                    this.accessForm.platformNo = '';
                }
                let accessFormCopy = JSON.parse(JSON.stringify(this.accessForm));
                accessFormCopy.id = this.accessTableData[this.accessForm.index].id;
                let strChannelForm = JSON.stringify(accessFormCopy);
                this.$http.post(url, {name: 'manageUser', action: 'update', data: strChannelForm}).then(response => {
                    let res = response.data;
                    if (res.rtCode == '0000') {
                        this.cancelAccessModal();
                        this.ajaxAccessQuery();
                    } else {
                        console.log(res.rtMsg);
                    }
                });
            },
            // 请求删除权限表
            ajaxRemoveAccessQuery (index) {
                let _this = this;
                let config = {
                    width: 300,
                    title: '提示',
                    content: '确定删除么？',
                    okText: '确定',
                    onOk: function () {
                        let url = process.env.BASE_URL+process.env.commonPort+ '/ins/config/action';
                        let idObj = {'id': _this.accessTableData[index].id};
                        let strId = JSON.stringify(idObj);
                        this.$http.post(url, {name: 'manageUser', action: 'delete', data: strId})
                            .then(response => {
                                _this.ajaxAccessQuery();
                            })
                            .catch(error => {
                                console.log('error=' + error);
                            });
                    }
                };
                this.$Modal.confirm(config);
            },
            // 显示权限表弹框
            showAccessTableModal (accessModel, index) {
                this.showAccessModal = true;
                this.handleReset('submitEditAccessForm');   //重置表单
                let _this = this;
                this.accessModel = accessModel;
                if (accessModel == 1) {
                    // 弹框为【增加】模式
                    this.accessTitle = '增加权限信息';
                    if (this.access == 2) { // 平台管理员
                        this.isDisabled = true;
                        this.accessForm.platformNo = this.platformNo;
                    }
                } else {
                    // 弹框为【编辑】模式
                    this.accessTitle = '修改权限信息';
                    if (this.access == 2) { // 平台管理员
                        this.isDisabled = true;
                    }
                    console.log('this.accessTableData[index]=' + JSON.stringify(this.accessTableData[index]));
                    this.accessForm = JSON.parse(JSON.stringify(this.accessTableData[index]));
                    this.accessForm.index = index;
                    this.accessForm.role = this.roleFindEvent(this.accessForm.role);// 这部分由后台来控制比较好
                    this.accessForm.password = '';// fixme
                    this.selectChannle();
                }
            },
            // 点击权限表弹框的确定按钮
            submitAccessEvent () {
                this.$refs['submitEditAccessForm'].validate((valid) => {
                    if (valid) {
                        this.saveAccess();
                    }
                });
            },
            // 点击确定按钮后发不同请求 1为增加请求 2为修改请求
            saveAccess () {
                if (this.accessModel == 1) {
                    // 发增加请求
                    this.ajaxAddAccessQuery();
                } else {
                    // 发修改请求
                    this.ajaxEditAccessQuery();
                }
            },
            // 取消点击权限按钮
            cancelAccessModal () {
                this.showAccessModal = false;
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            roleCheck () {
                if (this.access == 0) { // 管理员
                    this.roleList.splice(0, 1);
                } else if (this.access == 2) { // 平台管理员
                    this.roleList = [ {value: 3, text: '平台运营'}, {value: 4, text: '渠道运营'}];
                };
                if (this.accessForm.role != 1) {
                    this.selectPlat();
                }
            },
            getRoleName (role) {   // 0
                for (let j = 0; j < this.roleList2.length; j++) {
                    if (role == this.roleList2[j].value) {
                        return role = this.roleList2[j].text;
                    }
                }
                return role;
            },
            //查询平台
            selectPlat(){
                let url=process.env.BASE_URL+process.env.commonPort+'/ins/common/platformDic' ;
                this.$http.post(url).then(response=>{
                    console.log(response.data)
                    this.platformNoList= response.data.data;
                });
            },

            //查询渠道
            selectChannle(){
                var param={};
                let url=process.env.BASE_URL+process.env.commonPort+'/ins/common/channelDic' ;
                console.log('this.accessForm.role='+this.accessForm.role)
                console.log('this.accessForm.platformNo='+this.accessForm.platformNo)
                if(this.accessForm.role==4) {
//                    param = {'platNo': this.platformNo};
                    param = {'platNo':  this.accessForm.platformNo};
                    this.$http.post(url, param).then(response => {
                        console.log(response.data);
                        this.channleList = response.data.data;
                        if (this.channleList.length == 0) {
                            //  alert('请先添加渠道')
                            let _this = this;
                            let config = {
                                width: 300,
                                title: '提示',
                                content: '渠道信息未录入，请先添加渠道',
                                okText: '确定',
                                onOk: function () {
                                    _this.showAccessModal = false;
                                }
                            };
                            this.$Modal.confirm(config);
                        }
                    });
                }
            },
            changeRoleEvent (value) {
                console.log('changeRoleEvent=' + this.accessForm.role);
                this.selectChannle();
            },
            // 选择平台
            changePlatEvent () {
                this.selectChannle();
            },
            changeChannelEvent (value) {
                console.log('value=' + value);
            },
            // 权限查找  后台做比较好
            roleFindEvent (text) {
                for (let i in this.roleList) {
                    if (this.roleList[i].text == text) {
                        return this.roleList[i].value;
                    }
                }
            }
        },
        created () { },
        mounted () {
            this.accessFormCopy1 = JSON.parse(JSON.stringify(this.accessForm));
            this.accessFormCopy1.password = '';
            this.roleCheck();
            this.ajaxAccessQuery();
        }

    };
</script>

