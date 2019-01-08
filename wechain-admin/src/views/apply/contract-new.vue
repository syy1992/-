<style lang="less" scoped>
    @import '../../styles/common.less';
    @import '../common-components/table.less';
    span,.ivu-input-type,.ivu-select{margin-right:5px;}
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal {
            top: 0;
        }
    }
    .ivu-modal-footer {border-top: none;}
    label{display: inline-block;width: 90px;margin-right: 5px;line-height: 20px;}
    span{display: inline-block;line-height: 20px;}
    .downloads{
        display: inline-block;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        line-height: 1.5;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        padding: 6px 15px;
        font-size: 12px;
        border-radius: 4px;
        transition: color .2s linear,background-color .2s linear,border .2s linear;
        color: #495060 !important;
        background-color: #f7f7f7;
        border-color: #dddee1;
        margin-left: 10px;
    }

</style>

<template>
    <div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>

            <!--产品方案-->
            <Card  class="margin-top-10">
                <p slot="title">选择产品方案</p>
                <Row style="margin: 5px;">
                    <Col span="8">
                    <span>保险产品：</span>
                    <FormItem>
                        <Select v-model="formInline.product" style="width:200px;" @on-change="selectProductChange($event)">
                            <Option  v-for="(item,index) in selectProductList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>产品方案：</span>
                    <FormItem prop="planNo">
                        <Select v-model="formInline.planNo" style="width:200px;" :disabled="forbidden">
                            <Option v-for="(item,index) in selectProductdesignList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>平台：</span>
                    <FormItem prop="platNo">
                        <Select v-model="formInline.platNo" style="width:200px;">
                            <Option v-for="(item,index) in selectPlatList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>
                        </Select>
                    </FormItem>
                    </Col>

                </Row>
            </Card>

            <!--投保人-->
            <Card>
                <p slot="title">投保人信息</p>
                <Row class="margin-top-10 margin-bottom-20" >
                    <Col span="8">
                    <span style="width: 90px;">投保人类型：</span>
                    <FormItem prop="type">
                        <i-select  v-model="formInline.type" placeholder="请选择投保人类型" style="width: 260px;" @on-change="applicanType($event)">
                            <i-option value='0' >自然人</i-option>
                            <i-option value='1' >法人</i-option>
                        </i-select>
                    </FormItem>
                    </Col>
                </Row>

                <Row  style="margin: 5px;">
                    <Col span="8">
                    <span>投保人名称：</span>
                    <FormItem prop="name">
                        <Input v-model="formInline.name" placeholder="请输入名称" style="width: 260px;"/>
                    </FormItem>
                    </Col>

                    <Col span="8" v-show="appliTypeisn">
                    <span>证件类型：</span>
                    <FormItem prop="paperworkType">
                        <Select v-model="formInline.paperworkType" placeholder="请选择证件类型" style="width: 260px;">
                            <Option value='01'>身份证</Option>
                            <Option value='1'>护照</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <Col span="8" v-show="appliTypeisl">
                    <span>证件类型：</span>
                    <FormItem prop="paperworkType">
                        <Select v-model="formInline.paperworkType" placeholder="请选择证件类型" style="width: 260px;">
                            <Option value='03'>社会统一信用编号</Option>
                            <Option value='04'>组织机构编号</Option>
                        </Select>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>证件号码：</span>
                    <FormItem prop="paperworkNo">
                        <Input v-model="formInline.paperworkNo" placeholder="请输入证件号码" style="width: 260px"/>
                    </FormItem>
                    </Col>
                </Row>

                <Row  style="margin: 5px;overflow: hidden">

                    <Col span="8">
                    <span style="width: 85px;">联系电话：</span>
                    <FormItem>
                        <Input v-model="formInline.phone" placeholder="请输入联系电话" style="width: 260px"/>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>电子邮箱：</span>
                    <FormItem prop="mail">
                        <Input v-model="formInline.mail" placeholder="请输入电子邮箱" style="width: 260px"/>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>联系地址：</span>
                    <FormItem>
                        <Input v-model="formInline.address" placeholder="请输入联系地址" style="width: 260px"/>
                    </FormItem>
                    </Col>

                </Row>

            </Card>

            <!--被保人-->
            <Card>
                <p slot="title">被保人信息</p>
                <RadioGroup v-model="formInline.vertical" @on-change="ainsured($event)">
                    <Radio label="single">
                        <span>一个被保险人</span>
                    </Radio>
                    <Radio label="multiple">
                        <span>多个被保险人</span>
                    </Radio>
                </RadioGroup>
                <span class="downloads" v-show="sheet"><a href="javascript:void(0);" @click="downloads">下载模板</a></span>
                <Row class="margin-top-10 margin-bottom-20" >
                    <Col span="8">
                    <span style="width: 100px;">与投保人关系：</span>
                    <FormItem prop="appInsRelation">
                        <i-select v-model="formInline.appInsRelation" style="width: 260px;" @on-change="relationship($event)">
                            <i-option value='0' v-if="isSingle">本人</i-option>
                            <i-option value='1' >配偶</i-option>
                            <i-option value='2' >父母</i-option>
                            <i-option value='3' >子女</i-option>
                            <i-option value='5' >兄弟姐妹</i-option>
                            <i-option value='6' >祖父母、外祖父母</i-option>
                            <i-option value='7' >雇佣</i-option>
                            <i-option value='9' >其他</i-option>
                        </i-select>
                    </FormItem>
                    </Col>

                    <Col span="8" v-if="!sheet">
                    <span style="width: 97px;">被保人类型：</span>
                    <FormItem prop="protecttype">
                        <i-select  v-model="formInline.protecttype" style="width: 260px;" :disabled="disable" @on-change="insuredType($event)">
                            <i-option value='0' >自然人</i-option>
                            <i-option value='1' >法人</i-option>
                        </i-select>
                    </FormItem>
                    </Col>
                </Row>

                <Row  style="margin: 5px;" v-if="sheet">
                    <Col span="24">
                        <Sheets ref="child" v-on:childByValue="childByValue"></Sheets>
                    </Col>
                </Row>

                <Row v-if="!sheet" style="margin: 5px;">
                    <Col span="8">
                    <span style="width: 95px;">被保人名称：</span>
                    <FormItem prop="insuredname">
                        <Input v-model="formInline.insuredname" placeholder="请输入名称" style="width: 260px;" :disabled="disable"/>
                    </FormItem>
                    </Col>

                    <Col span="8" v-show="insuredTypen">
                    <span style="width: 95px;">证件类型：</span>
                    <FormItem prop="protegertype">
                        <i-select v-model="formInline.protegertype" style="width:260px" :disabled="disable">
                            <i-option value='01'>身份证</i-option>
                            <i-option value='1'>护照</i-option>
                        </i-select>
                    </FormItem>
                    </Col>

                    <Col span="8" v-show="insuredTypel">
                    <span style="width: 95px;">证件类型：</span>
                    <FormItem prop="protegertype">
                        <i-select v-model="formInline.protegertype" style="width:260px" :disabled="disable">
                            <i-option value='03' >社会统一信用编号</i-option>
                            <i-option value='04' >组织机构编号</i-option>
                        </i-select>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>证件号码：</span>
                    <FormItem prop="insuredworkNo">
                        <Input v-model="formInline.insuredworkNo" placeholder="请输入证件号码" style="width: 260px" :disabled="disable"/>
                    </FormItem>
                    </Col>
                </Row>

                <Row v-show="!sheet" style="margin: 5px;overflow: hidden">

                    <Col span="8">
                    <span style="width: 93px;">联系电话：</span>
                    <FormItem>
                        <Input v-model="formInline.insuredphone" placeholder="请输入联系电话" style="width: 260px" :disabled="disable"/>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span style="width: 95px;">电子邮箱：</span>
                    <FormItem prop="insuredmail">
                        <Input v-model="formInline.insuredmail" placeholder="请输入电子邮箱" style="width: 260px" :disabled="disable"/>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>联系地址：</span>
                    <FormItem>
                        <Input v-model="formInline.insuredaddress" placeholder="请输入联系地址" style="width: 260px" :disabled="disable"/>
                    </FormItem>
                    </Col>

                </Row>


            </Card>

            <!--合约信息-->
            <Card  class="margin-top-10">
                <p slot="title">合约信息</p>
                <Row style="margin: 5px;">
                    <Col span="8">
                    <span>保单号码：</span>
                    <FormItem prop="policyNo">
                        <Input v-model="formInline.policyNo" placeholder="请输入保单号" style="width: 260px;"/>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>投保单号：</span>
                    <FormItem>
                        <Input v-model="formInline.propersalNo" placeholder="请输入投保单号" style="width: 260px"/>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>支付方式：</span>
                    <FormItem prop="paymode">
                        <i-select style="width:260px" v-model="formInline.paymode">
                            <i-option value='1' >银行转账（线下）</i-option>
                            <i-option value='2' >保司收银台</i-option>
                            <i-option value='3' >微信</i-option>
                            <i-option value='4' >支付宝</i-option>
                            <i-option value='9' >其它</i-option>
                        </i-select>
                    </FormItem>
                    </Col>
                </Row>

                <Row style="margin: 5px;">
                    <Col span="8">
                    <span>保障金额：</span>
                    <FormItem prop="amount">
                        <Input v-model="formInline.amount" placeholder="请输入保额" style="width: 260px"/>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>保险保费：</span>
                    <FormItem prop="premium">
                        <Input v-model="formInline.premium" placeholder="请输入保费" style="width: 260px"/>
                    </FormItem>
                    </Col>
                </Row>

                <Row style="margin: 5px;">
                    <Col span="8">
                    <span>投保日期：</span>
                    <FormItem prop="applyDae">
                        <DatePicker v-model="formInline.applyDae" type="date" placeholder="请输入投保日期" style="width: 260px"></DatePicker>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>保险起期：</span>
                    <FormItem prop="startDate">
                        <DatePicker v-model="formInline.startDate" type="date" placeholder="请输入保险起期" style="width: 260px"></DatePicker>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>保险止期：</span>
                    <FormItem prop="endDate">
                        <DatePicker v-model="formInline.endDate" type="date" placeholder="请输入保险止期" style="width: 260px"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

                <Row style="margin: 5px;overflow: hidden">
                    <Col span="8">
                    <span>开户银行：</span>
                    <FormItem prop="bankName">
                        <Input v-model="formInline.bankName" placeholder="请输入开户行" style="width: 260px"/>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>银行户名：</span>
                    <FormItem prop="bankAccountName">
                        <Input v-model="formInline.bankAccountName" placeholder="请输入银行户名" style="width: 260px"/>
                    </FormItem>
                    </Col>

                    <Col span="8">
                    <span>银行账号：</span>
                    <FormItem prop="bankAcccountNo">
                        <Input v-model="formInline.bankAcccountNo" placeholder="请输入银行账号" style="width: 260px"/>
                    </FormItem>
                    </Col>
                </Row>

                <Row style="margin: 5px 5px 15px 5px;overflow: hidden">
                    <Button type="primary" @click="func">下一步</Button>
                </Row>
            </Card>

        </Form>

    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import format from '../../libs/format.js'
    import Sheets from './sheets'
    import bus from '../../libs/event.js'
    export default {
        name: 'contract-new',
        data () {
            return {
                a: false,
                sheet: false,
                total: 0,
                pageNum: 1,
                companyName: '',
                corporationName: '',
                tableData: [],
                check_result: ['通过', '拒绝', '人工复核'],
                appliTypeisn: true,   //投保人类型是自然人
                appliTypeisl: false,   //投保人类型是法人
                insuredTypen: true,   //被保人类型是自然人
                insuredTypel: false,   //被保人类型是法人
                disable: false,   //设置input的disabled
                selectProductList: [],
                selectProductdesignList: [],
                selectPlatList: [],
                forbidden: true,
                isSingle: true,
                formInline: {
                    vertical: 'single',
                    product: '',
                    name: '',
                    paperworkType: '',
                    paperworkNo: '',
                    phone: '',
                    mail: '',
                    address: '',
                    insuredphone: '',
                    insuredmail: '',
                    insuredaddress: '',
                    insuredname: '',
                    appInsRelation: '',
                    protecttype: '',
                    proteger: '',
                    protegertype: '',
                    insuredworkNo: '',
                    policyNo: '',
                    paymode: '',
                    amount: '',
                    premium: '',
                    bankName: '',
                    bankAccountName: '',
                    bankAcccountNo: '',
                    planNo: '',
                    platNo: '',
                    propersalNo: '',
                    applyDae: '',
                    startDate: '',
                    endDate: '',
                    type: ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    paperworkType: [
                        { required: true, message: '投保人证件类型不能为空', trigger: 'change' }
                    ],
                    paperworkNo: [
                        { required: true, message: '投保人证件号码不能为空', trigger: 'blur'},
                    ],
                    appInsRelation: [
                        { required: true, message: '与投保人关系不能为空', trigger: 'change'}
                    ],
                    protecttype: [
                        { required: true, message: '与投保人关系不能为空', trigger: 'change'}
                    ],
                    policyNo: [
                        { required: true, message: '保单号不能为空', trigger: 'blur'}
                    ],
                    paymode: [
                        { required: true, message: '支付方式不能为空', trigger: 'change'}
                    ],
                    amount: [
                        { required: true, message: '保障金额不能为空', trigger: 'blur'},
                        { type: 'string', pattern: /^\d+(\.\d{0,2})?$|^\.\d{1,2}$/, message: '请输入整数或两位小数', trigger: 'blur' }
                    ],
                    premium: [
                        { required: true, message: '保险保费不能为空', trigger: 'blur'},
                        { type: 'string', pattern: /^\d+(\.\d{0,2})?$|^\.\d{1,2}$/, message: '请输入整数或两位小数', trigger: 'blur' }
                    ],
                    planNo: [
                        { required: true, message: '产品方案不能为空', trigger: 'change'}
                    ],
                    platNo: [
                        { required: true, message: '平台不能为空', trigger: 'change'}
                    ],
                    insuredname: [
                        { required: true, message: '姓名不能为空', trigger: 'change'}
                    ],
                    type: [
                        { required: true, message: '投保人类型不能为空', trigger: 'change'}
                    ],
                    mail : [
                        { type: 'string',pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/, message:'邮箱格式不正确', trigger:'blur'}
                    ],
                    insuredmail: [
                        { type: 'string',pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/, message:'邮箱格式不正确', trigger:'blur'}
                    ],
                    applyDae: [
                        { required: true,type:'date', message: '投保日期不能为空', trigger: 'change'}
                    ],
                    startDate: [
                        { required: true,type:'date', message: '保险起期不能为空', trigger: 'change'}
                    ],
                    endDate: [
                        { required: true,type:'date', message: '保险止期不能为空', trigger: 'change'}
                    ],
                    matchup: [
                        { required: true, message: '对应关系不能为空', trigger: 'change'}
                    ],
                    proteger: [
                        { required: true, message: '被保人姓名不能为空', trigger: 'blur'}
                    ],
                    protegertype: [
                        { required: true, message: '被保人证件类型不能为空', trigger: 'change'}
                    ],
                    insuredworkNo: [
                        { required: true, message: '被保人证件号码不能为空', trigger: 'change'},
                    ]
                }
            };
        },
        components: {
            Sheets
        },
        methods: {
            //重置表单
            handleReset () {
                this.$refs['formInline'].resetFields();
                this.formInline.product = '';
                this.formInline.phone = '';
                this.formInline.mail = '';
                this.formInline.address = '';
                this.formInline.insuredphone = '';
                this.formInline.insuredmail = '';
                this.formInline.insuredaddress = '';
                this.formInline.propersalNo = '';
                this.formInline.bankName = '';
                this.formInline.bankAccountName = '';
                this.formInline.bankAcccountNo = '';
                this.disable = false;
                //如果是多个被保人时执行
                if( this.sheet == true ){
                    this.$refs.child.childFn();
                }

            },
            //点击下载
            downloads (e)  {
                e.target.href = 'http://47.104.104.38/images/excel-template-download/template.xlsx';
            },
            //平台
            selectPlatQuery () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/platformDic';
                this.$http.post(url,{}).then(response => {
                    this.selectPlatList = response.data.data;
                })
            },
            //保险产品
            selectProducts () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/productDic';
                this.$http.post(url,{}).then(response=>{
                    this.selectProductList = response.data.data;
                })
            },
            //产品方案
            selectProductChange (event) {
                this.forbidden = false;
                this.selectProductdesignList = '';   //先清空
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/productPlanDic';
                this.$http.post(url,{'productNo': event}).then(response => {
                    this.selectProductdesignList = response.data.data;
                })
            },
            //投保人与被保人如果是本人
            relationship (event){
                if( event == 0 ){
                    if( this.formInline.type == '' || this.formInline.name == '' || this.formInline.paperworkType == '' || this.formInline.paperworkNo == '' ){
//                        this.$Message.error('请先填写完投保人信息');
                        this.formInline.appInsRelation = '';
                        return false;
                    }
                    //把投保人的信息赋值给被保人
                    this.formInline.insuredname = this.formInline.name;
                    this.formInline.insuredworkNo = this.formInline.paperworkNo;
                    this.formInline.insuredphone = this.formInline.phone;
                    this.formInline.insuredmail= this.formInline.mail;
                    this.formInline.insuredaddress = this.formInline.address;
                    this.formInline.protecttype = this.formInline.type;
                    this.disable = true;
                }
                else{
                    this.formInline.insuredname = '';
                    this.formInline.protegertype = '';
                    this.formInline.insuredworkNo = '';
                    this.formInline.insuredphone = '';
                    this.formInline.insuredmail = '';
                    this.formInline.insuredaddress = '';
                    this.formInline.protecttype = '';
                    this.disable = false;
                }
            },
            //判断投保人类型是 自然人 还是 法人
            applicanType(event) {
                //alert(event)   0-自然人   1-法人
                if( event == 0 ){
                    this.formInline.paperworkType = '';
                    this.appliTypeisn = true;
                    this.appliTypeisl = false;
                }else{
                    this.formInline.paperworkType = '';
                    this.appliTypeisn = false;
                    this.appliTypeisl = true;
                }
            },
            //判断被保人类型是 自然人 还是 法人
            insuredType(event) {
              //alert(event)   0-自然人   1-法人
                if( event == 0 ){
                    this.formInline.protegertype = '';
                    this.insuredTypen = true;
                    this.insuredTypel = false;
                    //如果是本人 就赋值
                    if( this.formInline.appInsRelation == '0' ){
                        this.formInline.protegertype = this.formInline.paperworkType;
                    }
                }else{
                    this.formInline.protegertype = '';
                    this.insuredTypen = false;
                    this.insuredTypel = true;
                    //如果是本人 就赋值
                    if( this.formInline.appInsRelation == '0' ){
                        this.formInline.protegertype = this.formInline.paperworkType;
                    }
                }
            },
            childByValue(childValue) {
                // childValue就是子组件传过来的值
                console.log(childValue)
//                return false;
                this.tableData = childValue;
                console.log(1234)
            },
            //点击提交按钮
            func () {
                //非空验证
                this.$refs.formInline.validate((valid) => {
                    if (valid) {
//                        console.log('吕宁普最帅')
//                        console.log( this.formInline.vertical == 'multiple' )
                        //检验模板是否正确 只有多个被保险人的时候 才检查模板
                        if( this.formInline.vertical == 'multiple' ){
//                            this.tableData = JSON.parse(Cookies.get('tableData'))
                            console.log(this.tableData)
                            //return false;
                            if( this.tableData == '' ){
                                this.$Message.error({
                                    content: '被保险人不能为空',
                                    duration: 3
                                });
                                return false;   //停止代码的执行
                            }
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
                                if( !/^[\u4e00-\u9fa5]+$/.test(names[i].trim()) ){
                                    this.$Message.error({
                                        content: '姓名输入有误，请输入正确的姓名',
                                        duration: 3
                                    });
                                    return false;
                                }
                            }
                            for( let i=0;i<number.length;i++ ){
                                if( /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(number[i].trim()) === false ){
                                    this.$Message.error({
                                        content: '身份证号输入有误，请输入正确的身份证号',
                                        duration: 3
                                    });
                                    return false;
                                }
                            }

                            for( let i=0;i<phones.length;i++ ){
                                if( phones[i] !== '' && phones[i] !== null && phones[i] !== undefined ){
                                    if( !/^1\d{10}$/.test(phones[i].trim()) ){
                                        this.$Message.error({
                                            content: '手机号输入有误，请输入正确的手机号',
                                            duration: 3
                                        });
                                        return false;
                                    }
                                }
                            }


                        }
//console.log(123)
                        //判断是自然人还是法人
                        let isNI;
                        //投保人是自然人 被保人是自然人
                        if( this.formInline.type == 0 && this.formInline.protecttype == 0 ){
                            isNI = {
                                "applicant": {
                                    "type": 0,
                                    "naturePerson": {
                                        "name": this.formInline.name,
                                        "paperworkType": this.formInline.paperworkType,
                                        "paperworkNo": this.formInline.paperworkNo,
                                        "phone": this.formInline.phone,
                                        "mail": this.formInline.mail,
                                        "address": this.formInline.address
                                    }
                                },
                                "insuredList": [
                                    {
                                        "type": 0,
                                        "naturePerson": {
                                            "name": this.formInline.insuredname,
                                            "paperworkType": this.formInline.protegertype,
                                            "paperworkNo": this.formInline.insuredworkNo,
                                            "phone": this.formInline.insuredphone,
                                            "mail": this.formInline.insuredmail,
                                            "address": this.formInline.insuredaddress
                                        }
                                    }
                                ]
                            }
                        }
                        //投保人是自然人 被保人是法人 类型是社会统一信用编号
                        if( this.formInline.type == 0 && this.formInline.protecttype == 1 && this.formInline.protegertype == '03' ){
                            isNI = {
                                "applicant": {
                                    "type": 0,
                                    "naturePerson": {
                                        "name": this.formInline.name,
                                        "paperworkType": this.formInline.paperworkType,
                                        "paperworkNo": this.formInline.paperworkNo,
                                        "phone": this.formInline.phone,
                                        "mail": this.formInline.mail,
                                        "address": this.formInline.address
                                    }
                                },
                                "insuredList": [{
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.insuredname,
                                        "creditNo": this.formInline.insuredworkNo,
                                        "phone": this.formInline.insuredphone,
                                        "mail": this.formInline.insuredmail,
                                        "address": this.formInline.insuredaddress
                                    }
                                }]
                            }
                        }
                        //投保人是自然人 被保人是法人 类型是组织机构编号
                        if( this.formInline.type == 0 && this.formInline.protecttype == 1 && this.formInline.protegertype == '04' ){
                            isNI = {
                                "applicant": {
                                    "type": 0,
                                    "naturePerson": {
                                        "name": this.formInline.name,
                                        "paperworkType": this.formInline.paperworkType,
                                        "paperworkNo": this.formInline.paperworkNo,
                                        "phone": this.formInline.phone,
                                        "mail": this.formInline.mail,
                                        "address": this.formInline.address
                                    }
                                },
                                "insuredList": [{
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.insuredname,
                                        "structureNo": this.formInline.insuredworkNo,
                                        "phone": this.formInline.insuredphone,
                                        "mail": this.formInline.insuredmail,
                                        "address": this.formInline.insuredaddress
                                    }
                                }]
                            }
                        }
                        //投保人是法人 证件类型是社会统一信用编号   被保人是自然人
                        if( this.formInline.type == 1 && this.formInline.paperworkType == '03' && this.formInline.protecttype == 0 ){
                            isNI = {
                                "applicant": {
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.name,
                                        "creditNo": this.formInline.paperworkNo,
                                        "phone": this.formInline.phone,
                                        "mail": this.formInline.mail,
                                        "address": this.formInline.address
                                    }
                                },
                                "insuredList": [{
                                    "type": 0,
                                    "naturePerson": {
                                        "name": this.formInline.insuredname,
                                        "paperworkType": this.formInline.protegertype,
                                        "paperworkNo": this.formInline.insuredworkNo,
                                        "phone": this.formInline.insuredphone,
                                        "mail": this.formInline.insuredmail,
                                        "address": this.formInline.insuredaddress
                                    }
                                }]
                            }
                        }
                        //投保人是法人 证件类型是组织机构编号 被保人是自然人
                        if( this.formInline.type == 1 && this.formInline.paperworkType == '04' && this.formInline.protecttype == 0 ){
                            isNI = {
                                "applicant": {
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.name,
                                        "structureNo": this.formInline.paperworkNo,
                                        "phone": this.formInline.phone,
                                        "mail": this.formInline.mail,
                                        "address": this.formInline.address
                                    }
                                },
                                "insuredList": [{
                                    "type": 0,
                                    "naturePerson": {
                                        "name": this.formInline.insuredname,
                                        "paperworkType": this.formInline.protegertype,
                                        "paperworkNo": this.formInline.insuredworkNo,
                                        "phone": this.formInline.insuredphone,
                                        "mail": this.formInline.insuredmail,
                                        "address": this.formInline.insuredaddress
                                    }
                                }]
                            }
                        }
                        //投保人是法人 证件类型是社会统一信用编号 被保人是法人  证件类型是社会统一信用编号
                        if( this.formInline.type == 1 && this.formInline.paperworkType == '03' && this.formInline.protecttype == 1 && this.formInline.protegertype == '03' ){
                            isNI = {
                                "applicant": {
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.name,
                                        "creditNo": this.formInline.paperworkNo,
                                        "phone": this.formInline.phone,
                                        "mail": this.formInline.mail,
                                        "address": this.formInline.address
                                    }
                                },
                                "insuredList": [{
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.insuredname,
                                        "creditNo": this.formInline.insuredworkNo,
                                        "phone": this.formInline.insuredphone,
                                        "mail": this.formInline.insuredmail,
                                        "address": this.formInline.insuredaddress
                                    }
                                }]
                            }
                        }
                        //投保人是法人 证件类型是组织机构编号 被保人是法人  证件类型是社会统一信用编号
                        if( this.formInline.type == 1 && this.formInline.paperworkType == '04' && this.formInline.protecttype == 1 && this.formInline.protegertype == '03' ){
                            isNI = {
                                "applicant": {
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.name,
                                        "structureNo": this.formInline.paperworkNo,
                                        "phone": this.formInline.phone,
                                        "mail": this.formInline.mail,
                                        "address": this.formInline.address
                                    }
                                },
                                "insuredList": [{
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.insuredname,
                                        "creditNo": this.formInline.insuredworkNo,
                                        "phone": this.formInline.insuredphone,
                                        "mail": this.formInline.insuredmail,
                                        "address": this.formInline.insuredaddress
                                    }
                                }]
                            }
                        }
                        //投保人是法人 证件类型是社会统一信用编号 被保人是法人  证件类型是组织机构编号
                        if( this.formInline.type == 1 && this.formInline.paperworkType == '03' && this.formInline.protecttype == 1 && this.formInline.protegertype == '04' ){
                            isNI = {
                                "applicant": {
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.name,
                                        "creditNo": this.formInline.paperworkNo,
                                        "phone": this.formInline.phone,
                                        "mail": this.formInline.mail,
                                        "address": this.formInline.address
                                    }
                                },
                                "insuredList": [{
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.insuredname,
                                        "structureNo": this.formInline.insuredworkNo,
                                        "phone": this.formInline.insuredphone,
                                        "mail": this.formInline.insuredmail,
                                        "address": this.formInline.insuredaddress
                                    }
                                }]
                            }
                        }
                        //投保人是法人 证件类型是社会组织机构编号 被保人是法人  证件类型是组织机构编号
                        if( this.formInline.type == 1 && this.formInline.paperworkType == '04' && this.formInline.protecttype == 1 && this.formInline.protegertype == '04' ){
                            isNI = {
                                "applicant": {
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.name,
                                        "structureNo": this.formInline.paperworkNo,
                                        "phone": this.formInline.phone,
                                        "mail": this.formInline.mail,
                                        "address": this.formInline.address
                                    }
                                },
                                "insuredList": [{
                                    "type": 1,
                                    "legalPerson": {
                                        "name": this.formInline.insuredname,
                                        "structureNo": this.formInline.insuredworkNo,
                                        "phone": this.formInline.insuredphone,
                                        "mail": this.formInline.insuredmail,
                                        "address": this.formInline.insuredaddress
                                    }
                                }]
                            }
                        }

                        let times =  Date.parse(new Date());    //当前时间戳
                        let params = {
                            "account": "test",
                            "reqTid": times,
                            "sign": "C2B5682F449A5FBE695F7AC089294412",
                            "data": {
                                "commonInfo": {
                                    "platNo": this.formInline.platNo,
                                    "planNo": this.formInline.planNo,
                                    "appInsRelation": this.formInline.appInsRelation,
                                    "insBenRelation": "0"
                                },
                                "contractInfo": {
                                    "policyNo": this.formInline.policyNo,
                                    "propersalNo": this.formInline.propersalNo,
                                    "payType": this.formInline.paymode,
                                    "amount": this.formInline.amount,
                                    "premium": this.formInline.premium,
                                    "applyDate": this.formInline.applyDae.format('yyyy-MM-dd hh:mm:ss'),
                                    "startDate": this.formInline.startDate.format('yyyy-MM-dd hh:mm:ss'),
                                    "endDate": this.formInline.endDate.format('yyyy-MM-dd 23:59:59'),
                                    "bankName": this.formInline.bankName,
                                    "bankAccountName": this.formInline.bankAccountName,
                                    "bankAccountNo": this.formInline.bankAcccountNo
                                },
                                "beneficiaryList": [{}]
                            }
                        };
                        Object.assign(params.data,isNI);        //ES6中合并JSON对象
//                        Cookies.set('params',params);                   //把参数存储起来
                        localStorage.setItem('params', JSON.stringify(params));   //把参数存到本地
                        let formData = this.formInline;
//                        Cookies.set('contractInformation',formData);   //把信息存储起来
                        localStorage.setItem('contractInformation',JSON.stringify(formData));
                        //页面跳转
                        this.$router.push({
                            name: 'apply-confire',
                            params: {
                                dataObj: this.tableData
                            }
                        })



                    }
                })
            },

            //一个被保险人
            ainsured (event) {
                if( event == 'single' ){
                    this.sheet = false;
                    this.isSingle = true;
                }
                else{
                    this.sheet = true;
                    this.isSingle = false;
                }
            },


        },
        created () {
            this.selectPlatQuery();
            this.selectProducts();
            //绑定事件
            bus.$on('bindings', () => {
                this.handleReset();
            })


        }
    };
</script>
