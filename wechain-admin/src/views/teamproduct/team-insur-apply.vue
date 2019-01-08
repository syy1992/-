<style lang="less">
    @import '../../styles/common.less';
    

    .team-insur-apply{
        .planinfo{
            /*margin-bottom: 30px;*/
            .date-start-select{
                width: 200px;
            }
            .category-select{
                width: 200px;
            }
        }
        .info-block{
            margin-right: 16px;
            label{
                margin-right: 4px;
            }
        }
        .table-head{
            border: 1px solid #000;
            border-right:none;
            .cell-head{
                padding-left: 10px;
                border-right: 1px solid #000;
            }
        }
        .table-clacrow{
            border-right: 1px solid #000;

        }
        .rate-row,.total-fee{            
            .cell-rate{
                padding-left: 10px;
                height: 40px;
                line-height: 40px;                
                color: rgb(71, 71, 71);
                font-size: 12px;
            }

        }
        .button-row{
            text-align: center;
            margin-top: 20px;
            button{
                width: 260px;
            }
        }
    }

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
    <div class="team-insur-apply">

        <Form ref="formValidate" :model="formInline" :rules="ruleValidate" :label-width="120">
            <Card>
                <p slot="title">
                    <Icon type="ios-keypad"></Icon>
                    太保申根签证方案
                </p>
                <Row>
                    <Col span="8">
                        <span>选择方案:</span>
                        <Select v-model="formInline.category" style="width: 260px" @on-change="selectProductChange($event)">
                            <Option v-for="(item,index) in selectProductdesignList" :key="index" :value="item.infoKey">{{item.infoValue}}</Option>
                        </Select>
                    </Col>
                    <Col span="8">
                    <span>保险期间:</span>
                        <Select  v-model="formInline.day" style="width: 260px">
                            <Option value="7" v-show="dateIsShow1">1-7</Option>
                            <Option value="15" v-show="dateIsShow1">8-15</Option>
                            <Option value="20" v-show="dateIsShow1">16-20</Option>

                            <Option value="15" v-show="dateIsShow2">1-15</Option>
                            <Option value="20" v-show="dateIsShow2">16-20</Option>
                            <Option value="30" v-show="dateIsShow2">21-30</Option>
                        </Select>
                    </Col>
                    <Col span="8">
                        <FormItem prop="applyDae" label="起始时间">
                            <DatePicker v-model="formInline.applyDae" type="date" placeholder="请输入起始时间" style="width: 260px"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>

                <!--责任表-->
                <Row v-if="dutyIsShow">
                    <Col span="24">
                        <Duty :responsibility="responsibility" @ee="onR"></Duty>
                    </Col>
                </Row>

            </Card>

            <Card style="margin: 5px 0">
                <p slot="title"  >
                    <Icon type="ios-keypad"></Icon>
                    投保人信息
                </p>
                <Row type="flex" justify="start" align="top">
                    <Col span="8">
                        <FormItem label="投保单位名称" prop="applicantName">
                            <Input style="width:260px" placeholder="请输入投保单位名称" v-model="formInline.applicantName"/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="证件类型" prop="applicantType">
                            <i-select v-model="formInline.applicantType" style="width:260px" >
                                <i-option value='03' >社会统一信用编号</i-option>
                                <i-option value='04' >组织机构编号</i-option>
                            </i-select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="证件号码" prop="applicantNumber">
                            <Input style="width:260px" placeholder="请输入证件号码" v-model="formInline.applicantNumber"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="start" align="top">
                    <Col span="8">

                    <FormItem prop="contactName" label="企业联系人姓名">
                        <Input v-model="formInline.contactName" placeholder="请输入企业联系人姓名" style="width: 260px" />
                    </FormItem>

                    </Col>
                    <Col span="8">
                    <FormItem prop="contactMobile" label="联系手机">
                        <Input v-model="formInline.contactMobile" placeholder="请输入联系手机" style="width: 260px" />
                    </FormItem>
                    </Col>
                    <Col span="8">

                    <FormItem prop="contactEmail" label="联系邮箱">
                        <Input v-model="formInline.contactEmail" placeholder="请输入联系邮箱" style="width: 260px" />
                    </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="start">
                    <Col span="8">
                    <FormItem prop="contactBranch" label="所在部门">
                        <Input v-model="formInline.contactBranch" placeholder="请输入所在部门" style="width: 260px" />
                    </FormItem>
                    </Col>
                </Row>

            </Card>

            <Card>
                <p slot="title"  >
                    <Icon type="ios-keypad"></Icon>
                    上传多个被保险人
                </p>
                <Row type="flex" justify="start" align="top">
                    <Col span="24">
                        <Sheets @refreshList="onRefresList"></Sheets>

                        <div style="margin-top: 15px;">
                            <Button type="primary" @click="count">计算保额</Button>
                            <span style="margin-left: 20px;">保费为:<span ref="baofei" style="color: red;">{{premium}}</span>元</span>
                        </div>
                        <br>
                        <Button type="info" @click="handleSubmit('formValidate')" >提交</Button>

                    </Col>
                </Row>
            </Card>
        </Form>



        <Modal
                title="付款码"
                v-model="imgIsShow"
                class-name="vertical-center-modal"
                :mask-closable="false"
                :footer-hide="true"
        >
            <img :src="imgSrc"  ref="imgs" style="width: 100%;">
        </Modal>

    </div>
</template>

<script>
    import calcrow from './calcrow.vue';
    import Cookies from 'js-cookie';
    import Sheets from './sheets'
    import Duty from './duty'
    import md5 from 'js-md5';
    import { formatDate } from '../../libs/index.js'
    export default {
        name: 'insur-apply',
        data () {
            return {
                imgSrc: '',
                imgIsShow: false,
                planTitle: '',
                categoryList: [],
                startDate: '',
                rate: 0,
                totalFee: 0,
                selectProductdesignList: [],
                premium: '',
                responsibility: {},
                dutyIsShow: false,
                dateIsShow1: true,
                dateIsShow2: false,
                tableData: '',
                formInline: {
                    applicantName: '',
                    applicantType: '',
                    applicantNumber: '',
                    contactName: '',
                    day: '',
                    contactBranch: '',
                    contactMobile: '',
                    contactEmail: '',
                    applyDae: '',
                    category: ''
                },
                ruleValidate: {
                    applicantName: [
                        { required: true, message: '单位名称不能为空', trigger: 'blur' }
                    ],
                    applicantType: [
                        { required: true, message: '证件类型不能为空', trigger: 'change' }
                    ],
                    applicantNumber: [
                        { required: true, message: '证件号码不能为空', trigger: 'blur' }
                    ],
                    applyDae: [
                        { required: true, type: 'date', message: '起始时间不能少于当前时间', trigger: 'change' }
                    ],
                    contactMobile: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' }
                    ]
                }

            };
        },
        components: {
            calcrow,
            Sheets,
            Duty
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            }
        },
        methods: {

            //子级触发父级
            onRefresList () {
                this.tableData = JSON.parse(Cookies.get('tableData'));
            },

            //计算保额
            count () {
                if( this.formInline.category == '' ){
                    this.$Message.warning('请选择方案');
                    return false;
                }
                if( this.formInline.day == '' ){
                    this.$Message.warning('请选择保险期间');
                    return false;
                }
                if( this.tableData == '' ){
                    this.$Message.warning('请上传被保险人,并且被保险人不能为空');
                    return false;
                }
                //检查模板的正确性
                let names = [];    //姓名
                let number = [];   //证件号码
                let phones = [];   //电话

                for( let i in this.tableData ){
                    names.push(this.tableData[i].姓名);
                    number.push(this.tableData[i].身份证号);
                    phones.push(this.tableData[i].手机号);
                }

                if( names[0] == '' || names[0] == null || names[0] == undefined ){
                    this.$Message.error({
                        content: '模板格式错误,请按照模板规则填写',
                        duration: 3
                    });
                    return false;
                }
                if( number[0] == '' || number[0] == null || number[0] == undefined ){
                    this.$Message.error({
                        content: '模板格式错误,请按照模板规则填写',
                        duration: 3
                    });
                    return false;
                }
                /*if( phones[0] == '' || phones[0] == null || phones[0] == undefined ){
                    this.$Message.error({
                        content: '模板格式错误,请按照模板规则填写',
                        duration: 3
                    });
                    return false;
                }*/

                for( let i=0;i<names.length;i++ ){
                    if( !/^[\u4e00-\u9fa5]+$/.test(names[i]) ){
                        this.$Message.error({
                            content: '姓名填写有误，请填写正确的姓名',
                            duration: 3
                        });
                        return false;
                    }
                }
                for( let i=0;i<number.length;i++ ){
                    if( /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(number[i]) === false ){
                        this.$Message.error({
                            content: '身份证号填写有误，请填写正确的身份证号',
                            duration: 3
                        });
                        return false;
                    }
                }

                for( let i=0;i<phones.length;i++ ){
                    if( phones[i] !== '' && phones[i] !== null && phones[i] !== undefined ){
                        if( !/^1\d{10}$/.test(phones[i]) ){
                            this.$Message.error({
                                content: '手机号填写有误，请填写正确的手机号',
                                duration: 3
                            });
                            return false;
                        }
                    }
                }

                let url = 'http://192.168.1.28:8765/insurance/europeVisa/premium';
                let params = {
                    "account": "EuropeVisa_test",
                    "reqTid": "JHKJWJ0001",
                    "sign": "CC50A8C65C2F22E2121A49E6CF0D9B09",
                    "data": {
                        "commonInfo": {
                            "platNo": "EuropeVisa_test",
                            "chanNo": "bj001",
                            "planNo": this.formInline.category,
                            "isGroup": 0,
                            "num": 1
                        },
                        "insCount":this.tableData.length,
                        "days":this.formInline.day
                    }
                }
                params.data = JSON.stringify(params.data);
                //设置签证（和后台保持一致）
                params.sign = md5("account"+"EuropeVisa_test"+"data"+params.data+"reqTid"+params.reqTid+"ak@38~!pT").toString().toUpperCase()
                this.$http.post(url, params).then( response => {
                    this.premium = response.data.data.premium;
                } )
            },

            //选择方案改变的时候触发
            selectProductChange (event) {
                this.formInline.day = '';   //清空保险期间
                if( event == 'TEST002A' ){
                    this.dateIsShow1 = true;
                    this.dateIsShow2 = false;
                }
                else{
                    this.dateIsShow1 = false;
                    this.dateIsShow2 = true;
                }
                let url = 'http://192.168.1.28:8767/ins/manage/productPlanItemDic';
                let params = {'planNo': event, 'pageSize': 10, 'pageNo': 1};
                this.$http.post(url,params).then(response => {
                    this.responsibility = response.data.data;
                    this.dutyIsShow = true;     //让责任表显示
                })
            },

            //子级触发父级 并传参数
            onR (a) {
                let url = 'http://192.168.1.28:8767/ins/manage/productPlanItemDic';
                let params = {'planNo': this.formInline.category, 'pageSize': 10, 'pageNo': a};
                this.$http.post(url,params).then(response => {
//                    console.log(response)
                    this.responsibility = response.data.data;
                })
            },

            //点击提交时触发
            handleSubmit (names){
                    this.$refs[names].validate((valid) => {
                        if (valid) {
                            if( this.premium == '' ){
                                this.$Message.warning('点击提交之前应先计算出保费');
                                return false;
                            }
                            let nowDate = formatDate(this.formInline.applyDae, 'yyyy-MM-dd hh:mm:ss');
                            let baofei = this.$refs['baofei'].innerText;

                            //判断证件类型
                            let a;
                            if( this.formInline.applicantType == '03' ){
                                a = {
                                    "type": 1,   //默认法人
                                    "legalPerson": {
                                        "name": this.formInline.applicantName,
                                        "creditNo": this.formInline.applicantNumber,
                                        "phone": this.formInline.contactMobile,
                                        "contactMan": this.formInline.contactName,
                                        "contactPhone": this.formInline.contactMobile
                                    }
                                }
                            }else{
                                a = {
                                    "type": 1,   //默认法人
                                    "legalPerson": {
                                        "name": this.formInline.applicantName,
                                        "structureNo": this.formInline.applicantNumber,
                                        "phone": this.formInline.contactMobile,
                                        "contactMan": this.formInline.contactName,
                                        "contactPhone": this.formInline.contactMobile
                                    }
                                }
                            }

                            //配置被保人
                            let names = [];   //姓名
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
                            let account = "EuropeVisa_test";

                            let json = {
                                "account": account,
                                "reqTid": Date.parse(new Date()),
                                "sign": "845046DD6E1BA3157D1E85E6FFE21D6F",
                                "data":
                                    {
                                        "commonInfo": {
                                            "platNo": "test",
                                            "planNo": this.formInline.category,
                                            "isGroup": 1,
                                            "appInsRelation": "9",
                                            "insBenRelation": "0",
                                            "num": 1
                                        },
                                        "applicant": {},   //投保人
                                        "insuredList": [], //被保人
                                        "beneficiaryList": [],
                                        "extendInfo": {
                                            "startDate": nowDate,
                                            "premium": baofei,
                                            "days":this.formInline.day,
                                            "insCount":this.tableData.length,
                                        }
                                    }

                            }

                            Object.assign(json.data.applicant, a);
                            Object.assign(json.data.insuredList, recognizee)
                            json.data = JSON.stringify(json.data)
                            json.sign = md5("account"+account+"data"+json.data+"reqTid"+json.reqTid+"ak@38~!pT").toString().toUpperCase();
                            let url = 'http://192.168.1.28:8765/insurance/europeVisa/apply';
                            let urlImg = 'http://192.168.1.28:8765/insurance/europeVisa/wexin/pay/jhqr';
                            this.$Spin.show();
                            this.$http.post(url,json).then(res=>{
                                if( res.data.resCode == '0000' ){
//                                    this.$Message.success('成功投保');
//                                    console.log(res);
                                    let proposalNo = JSON.parse(res.data.data).appReturnInfo.proposalNo;
                                    let json = {
                                        "account": account,
                                        "reqTid": Date.parse(new Date()),
                                        "sign": "830B0D280CED3F8BD05519520F698A4D",
                                        "data": {
                                            "proposalNo": proposalNo
                                        }
                                    };
                                    json.data = JSON.stringify(json.data);
                                    //设置验签
                                    json.sign = md5("account"+account+"data"+json.data+"reqTid"+json.reqTid+"ak@38~!pT").toString().toUpperCase();

                                    this.$http.post(urlImg, json).then( res => {
//                                        console.log(res)
                                        let tupian = JSON.parse(res.data.data).qrcode;
//                                        console.log(tupian)
                                        this.$refs.imgs.src = "data:image/jpeg;base64," + tupian;
                                        this.imgIsShow = true;
                                        this.$Spin.hide();
                                    } )
                                }
                                else{
                                    this.$Message.error(res.resMsg);
                                }
                            })

                        }
                    })
                }
        },
        mounted () {
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/productPlanDic';
            this.$http.post(url,{'productNo': "JHTECHTEST002"}).then(response => {
                console.log(response)
                this.selectProductdesignList = response.data.data;
            })
        }
    };
</script>
