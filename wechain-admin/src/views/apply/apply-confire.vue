<style lang="less" scoped>
    @import '../../styles/common.less';
    @import '../common-components/table.less';
    span,.ivu-input-type,.ivu-select{margin-right:5px;}
    .ivu-modal-footer {border-top: none;}
    label{display: inline-block;width: 90px;margin-right: 5px;line-height: 20px;}
    span{display: inline-block;line-height: 20px;}
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>

<template>
    <div>
        <Form ref="formInline" inline>

            <!--产品方案-->
            <Card  class="margin-top-10">
                <p slot="title">已选产品方案</p>
                <Row style="margin: 5px;">
                    <Col span="8">
                    <span>产品方案：</span>
                    <span class="borders">{{project}}</span>
                    </Col>

                    <Col span="8">
                    <span>平台：</span>
                    <span class="borders">{{productName}}</span>
                    </Col>
                </Row>
            </Card>

            <!--投保人信息-->
            <Card class="margin-top-10">
                <p slot="title">投保人信息</p>

                <Row  style="margin: 5px;">
                    <Col span="8">
                    <span>投保人类型：</span>
                    <span class="borders" v-if="contractInformation.type==0">自然人</span>
                    <span class="borders" v-if="contractInformation.type==1">法人</span>
                    </Col>
                </Row>

                <Row  style="margin: 5px;">
                    <Col span="8">
                    <span>投保人名称：</span>
                    <span class="borders">{{contractInformation.name}}</span>
                    </Col>

                    <Col span="8">
                    <span>证件类型：</span>
                    <span class="borders" v-if="contractInformation.paperworkType=='01'">身份证</span>
                    <span class="borders" v-if="contractInformation.paperworkType=='1'">护照</span>
                    <span class="borders" v-if="contractInformation.paperworkType=='03'">社会统一信用编号</span>
                    <span class="borders" v-if="contractInformation.paperworkType=='04'">组织机构编号</span>
                    </Col>

                    <Col span="8">
                    <span>证件号码：</span>
                    <span class="borders">{{contractInformation.paperworkNo}}</span>
                    </Col>
                </Row>

                <Row  style="margin: 5px;">

                    <Col span="8" v-if="contractInformation.phone">
                    <span style="width: 85px;">联系电话：</span>
                    <span class="borders">{{contractInformation.phone}}</span>
                    </Col>

                    <Col span="8" v-if="contractInformation.mail">
                    <span>电子邮箱：</span>
                    <span class="borders">{{contractInformation.mail}}</span>
                    </Col>

                    <Col span="8" v-if="contractInformation.address">
                    <span>联系地址：</span>
                    <span class="borders">{{contractInformation.address}}</span>
                    </Col>

                </Row>

            </Card>

            <!--被保人信息-->
            <Card class="margin-top-10">
                <p slot="title">被保人信息</p>

                <Row  style="margin: 5px;">
                    <Col span="8">
                    <span>与被保人关系：</span>
                    <span class="borders" v-if="contractInformation.appInsRelation==0">本人</span>
                    <span class="borders" v-if="contractInformation.appInsRelation==1">配偶</span>
                    <span class="borders" v-if="contractInformation.appInsRelation==2">父母</span>
                    <span class="borders" v-if="contractInformation.appInsRelation==3">子女</span>
                    <span class="borders" v-if="contractInformation.appInsRelation==5">兄弟姐妹</span>
                    <span class="borders" v-if="contractInformation.appInsRelation==6">祖父母、外祖父母</span>
                    <span class="borders" v-if="contractInformation.appInsRelation==7">雇佣</span>
                    <span class="borders" v-if="contractInformation.appInsRelation==9">其他</span>
                    </Col>

                    <Col span="8" v-if="contractInformation.vertical == 'single'">
                    <span>被保险人类型：</span>
                    <span class="borders" v-if="contractInformation.protecttype==0">自然人</span>
                    <span class="borders" v-else>法人</span>
                    </Col>
                </Row>

                <Row  style="margin: 5px;" v-if="contractInformation.vertical == 'single'">
                    <Col span="8">
                    <span style="width: 98px;">被保人名称：</span>
                    <span class="borders">{{contractInformation.insuredname}}</span>
                    </Col>

                    <Col span="8">
                    <span style="width: 98px;">证件类型：</span>
                    <span class="borders" v-if="contractInformation.protegertype=='01'">身份证</span>
                    <span class="borders" v-if="contractInformation.protegertype=='1'">护照</span>
                    <span class="borders" v-if="contractInformation.protegertype=='03'">社会统一信用编号</span>
                    <span class="borders" v-if="contractInformation.protegertype=='04'">组织机构编号</span>
                    </Col>

                    <Col span="8">
                    <span>证件号码：</span>
                    <span class="borders">{{contractInformation.insuredworkNo}}</span>
                    </Col>
                </Row>

                <Row  style="margin: 5px;" v-if="contractInformation.vertical == 'single'">

                    <Col span="8" v-if="contractInformation.insuredphone">
                    <span style="width: 97px;">联系电话：</span>
                    <span class="borders">{{contractInformation.insuredphone}}</span>
                    </Col>

                    <Col span="8" v-if="contractInformation.insuredmail">
                    <span style="width: 97px;">电子邮箱：</span>
                    <span class="borders">{{contractInformation.insuredmail}}</span>
                    </Col>

                    <Col span="8" v-if="contractInformation.insuredaddress">
                    <span>联系地址：</span>
                    <span class="borders">{{contractInformation.insuredaddress}}</span>
                    </Col>

                </Row>

                <Row class="margin-top-10" v-if="contractInformation.vertical == 'multiple'">
                    <Table :columns="tableTitle" :data="tableData"  border></Table>
                </Row>

            </Card>

            <!--合约-->
            <Card class="margin-top-10">
                <p slot="title">合约信息</p>

                <Row  style="margin: 5px;">
                    <Col span="8">
                    <span>保单号码：</span>
                    <span class="borders">{{contractInformation.policyNo}}</span>
                    </Col>

                    <Col span="8" v-if="contractInformation.propersalNo">
                    <span>投保单号：</span>
                    <span class="borders">{{contractInformation.propersalNo}}</span>
                    </Col>

                    <Col span="8">
                    <span>支付方式：</span>
                    <span class="borders" v-if="contractInformation.paymode==1">银行转账（线下）</span>
                    <span class="borders" v-if="contractInformation.paymode==2">保司收银台</span>
                    <span class="borders" v-if="contractInformation.paymode==3">微信</span>
                    <span class="borders" v-if="contractInformation.paymode==4">支付宝</span>
                    <span class="borders" v-if="contractInformation.paymode==9">其他</span>
                    </Col>
                </Row>

                <Row  style="margin: 5px;">

                    <Col span="8">
                    <span>保障金额：</span>
                    <span class="borders">{{contractInformation.amount}}</span>
                    </Col>

                    <Col span="8">
                    <span>保险保费：</span>
                    <span class="borders">{{contractInformation.premium}}</span>
                    </Col>

                </Row>

                <Row  style="margin: 5px;">

                    <Col span="8" v-if="contractInformation.applyDae">
                    <span>投保日期：</span>
                    <span class="borders">{{contractInformation.applyDae | formatDate}}</span>
                    </Col>

                    <Col span="8" v-if="contractInformation.startDate">
                    <span>保险起期：</span>
                    <span class="borders">{{contractInformation.startDate | formatDate}}</span>
                    </Col>

                    <Col span="8" v-if="contractInformation.endDate">
                    <span>保险止期：</span>
                    <span class="borders">{{contractInformation.endDate | formatDate}}</span>
                    </Col>

                </Row>

                <Row  style="margin: 5px;">

                    <Col span="8" v-if="contractInformation.bankName">
                    <span>开户银行：</span>
                    <span class="borders">{{contractInformation.bankName}}</span>
                    </Col>

                    <Col span="8" v-if="contractInformation.bankAccountName">
                    <span>银行户名：</span>
                    <span class="borders">{{contractInformation.bankAccountName}}</span>
                    </Col>

                    <Col span="8" v-if="contractInformation.bankAcccountNo">
                    <span>银行账号：</span>
                    <span class="borders">{{contractInformation.bankAcccountNo}}</span>
                    </Col>

                </Row>

                <Row style="margin-top: 10px; text-align: center;">
                    <Button type="info" @click="last">上一步</Button>
                    <Button type="primary" @click="func" style="margin-left: 10px;">提交</Button>
                </Row>

            </Card>

        </Form>

        <Modal v-model="showProductModal" class-name="vertical-center-modal">
            <p slot="header"></p>
            <div>
                <span>确保输入的信息准确无误之后点击确定</span>
            </div>
            <div slot="footer" style='text-align:center;border-top: none'>
                <Button type="primary" @click='cancelProductModal'>继续录入</Button>
                <Button type="primary" @click="submitProductEvent()">确定</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
    import Cookies from 'js-cookie';
//    import bus from './event.js'
//    import bus from '@/libs/event'
    import bus from '../../libs/event.js'

    export default {
        data () {
            return {
                tableTitle: [],
                tableData: [],
                project: '',
                productName: '',
                selectPlatList: [],
                selectProductdesignList: [],
                isCommit: false,
                showProductModal: false,
//                contractInformation: JSON.parse(Cookies.get('contractInformation')),   //投保信息
                contractInformation: JSON.parse(localStorage.getItem('contractInformation')),   //投保信息
//                params: JSON.parse(Cookies.get('params'))                                //投保参数
                params: JSON.parse(localStorage.getItem('params'))                                //投保参数
            };
        },

        methods: {
            //点击提交
            func () {
                this.showProductModal = true;
            },

            //点击上一步
            last () {
                this.$router.push({
                    name: 'contract-new'
                })
            },

            //产品方案
            selectProductChange () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/productPlanDic';
                let product = this.contractInformation.product;
                this.$http.post(url,{'productNo': product}).then(response => {
                    this.selectProductdesignList = response.data.data;
                    for( let i in  this.selectProductdesignList ){
                        if( this.selectProductdesignList[i].infoKey == this.contractInformation.planNo ){
                           this.project  = this.selectProductdesignList[i].infoValue;
                        }
                    }
                })
            },

            //平台
            selectPlatQuery () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/platformDic';
                this.$http.post(url, {}).then(response => {
                    this.selectPlatList = response.data.data;
                    for( let i in this.selectPlatList ){
                        if( this.selectPlatList[i].infoKey == this.contractInformation.platNo ){
                            this.productName = this.selectPlatList[i].infoValue;
                        }
                    }

                })
            },

            //继续录入
            cancelProductModal () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/addContract';
                if( this.contractInformation.vertical == 'single' ){
                    this.$http.post(url, this.params).then(response => {
                        if( response.data.resCode == "0000" ){
                            bus.$emit('bindings');
                            //路由跳转
                            bus.$emit('close');
                            this.$Message.success(response.data.resMsg)
                            this.$router.push({
                                name: 'contract-new'
                            })

                        }
                        else{
                            this.$Message.error(response.data.resMsg)
                        }
                    })
                }
                else{
                    //配置被保人参数
                    let names = [];   //姓名
                    //let types = [];   //证件类型   默认是 01
                    let number = [];   //证件号码
                    let phones = [];   //电话
                    let stages;
                    let recognizee=[];

                    for( let i in this.tableData ){
                        names.push(this.tableData[i].姓名);
                        number.push(this.tableData[i].身份证号);
                        phones.push(this.tableData[i].手机号);
                    }
                    for( let i=0;i<names.length;i++ ){
                        stages = {
                            "type": 0,   //多个被保人时 类型为自然人
                            "naturePerson": {
                                "name": names[i],
                                "paperworkType": "01",   //多个被保人时 证件类型默认是身份证
                                "paperworkNo": number[i],
                                "phone": phones[i]
                            }
                        }
                        recognizee.push(stages)
                    }
                    //让 recognizee 代替被保人
                    Object.assign(this.params.data.insuredList,recognizee)

                    this.$http.post(url, this.params).then(response => {
                        if( response.data.resCode == "0000" ){
                            bus.$emit('bindings');
                            //路由跳转
                            this.$router.push({
                                name: 'contract-new'
                            })
                        }
                        else{
                            this.$Message.error(response.data.resMsg)
                        }
                    })
                }

            },
//            closeaa(){
//                bus.$emit('close');
//            },
            //确定按钮
            submitProductEvent () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/addContract';
                if( this.contractInformation.vertical == 'single' ){
                    this.$http.post(url, this.params).then(response => {
                        if( response.data.resCode == "0000" ){
                            bus.$emit('close');
                            this.$Message.success(response.data.resMsg)
                            this.$router.push({
                                name: 'apply-list'
                            });
                        }
                        else{
                            this.$Message.error(response.data.resMsg)
                        }
                    })
                }
                else{
                    //配置被保人参数
                    let names = [];   //姓名
                    //let types = [];   //证件类型   默认是 01
                    let number = [];   //证件号码
                    let addre = [];   //地址
                    let phones = [];   //电话
                    let mails = [];   //邮箱
                    let stages;
                    let recognizee=[];

                    for( let i in this.tableData ){
                        console.log(this.tableData[i])
                        names.push(this.tableData[i].姓名);
                        number.push(this.tableData[i].身份证号);
                        phones.push(this.tableData[i].手机号);
                    }

                    for( let i=0;i<names.length;i++ ){
                         stages = {
                            "type": 0,   //多个被保人时 类型为自然人
                            "naturePerson": {
                                "name": names[i],
                                "paperworkType": "01",   //多个被保人时 证件类型默认是身份证
                                "paperworkNo": number[i],
                                "phone": phones[i]
                            }
                        }
                        recognizee.push(stages)
                    }
                    //让 recognizee 代替被保人
                    Object.assign(this.params.data.insuredList,recognizee)

                    this.$http.post(url, this.params).then(response => {
                        if( response.data.resCode == "0000" ){
                            bus.$emit('close');
                            this.$router.push({
                                name: 'apply-list'
                            })
                        }
                        else{
                            this.$Message.error(response.data.resMsg)
                        }
                    })
                }
            }
        },
        //过滤器
        filters: {
            formatDate: function (value) {
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + MM + '-' + d;
            }
        },
        created (){
            this.selectPlatQuery();
            this.selectProductChange();
            //当被保险人为多个被保险的人时候 才能获取到表格中的值
            if( this.contractInformation.vertical == 'multiple' ){
                this.tableTitle = JSON.parse(Cookies.get('tableTitle'));
                this.tableData = this.$route.params.dataObj;
                //console.log(this.tableData)
            }
        }
    };
</script>
