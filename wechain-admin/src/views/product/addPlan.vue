<style lang="less" scoped>
    @import '../../styles/common.less';
    @import '../common-components/table.less';
    .clearfix {
        *zoom: 1;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        line-height: 0;
        content: "";
    }
    .clearfix:after {
        clear: both;
    }
    .ivu-radio-group{min-width: 180px;}
</style>

<template>
    <div>
        <Row>
            <iCol span="24" class="padding-left-10">
                <Card style='min-width: 1000px'>
                    <p slot="title">
                        <Icon type="compose"></Icon>
                        方案基本信息编辑
                    </p>
                    <Row class="margin-top-10" style='max-width: 1650px'>
                        <Form :label-width="145" ref="submitEditPlanForm" :model="planForm" :rules="ruleValidateEditPlan">
                            <Row>
                                <iCol span="8">
                                    <FormItem label="产品名称：" prop='productNo' required >
                                        <Select style="width:180px;margin-top: 5px;" v-model='planForm.productNo' @on-change='queryJsonMould(planForm.productNo)'>
                                            <Option v-for="(item,index) in productList" :value="item.infoKey" :key="index">
                                                {{ item.infoValue }}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                </iCol>
                                <iCol span="8">
                                    <FormItem label="方案名称：" prop='planName' required class='widthfix'>
                                        <Input style="width: 180px" placeholder='输入方案名称' v-model='planForm.planName'> </Input>
                                    </FormItem>
                                </iCol>
                                <iCol span="8">
                                    <FormItem label="内部产品方案编号：" prop='planNo' required class='widthfix'>
                                        <Input style="width: 180px" placeholder='输入内部产品方案编号' v-model='planForm.planNo'> </Input>
                                    </FormItem>
                                </iCol>
                            </Row>
                            <Row>
                                <iCol span="8">
                                    <FormItem label="保险公司产品方案编号：" prop='insPlanNo'  class='widthfix'>
                                        <Input style="width: 180px" placeholder='输入保险公司产品方案编号' v-model='planForm.insPlanNo'> </Input>
                                    </FormItem>
                                </iCol>
                                <iCol span="8">
                                    <FormItem label="保险机构编号：" prop='institNo' required class='widthfix'>
                                        <Select style="width:180px;" v-model='planForm.institNo'>
                                            <Option v-for="(item,index) in agencyList" :value="item.infoKey" :key="index">{{ item.infoValue}}</Option>
                                        </Select>
                                    </FormItem>
                                </iCol>
                                <iCol span="8">
                                        <FormItem label="优惠比例：" prop='discountRate'  class='widthfix'>
                                            <Input style="width: 180px" placeholder='输入优惠比例' v-model='planForm.discountRate' > </Input>
                                        </FormItem>
                                </iCol>
                            </Row>
                            <Row>
                            <iCol span="8">
                                    <FormItem label="投保份数限制：" prop='maxNum'  class='widthfix'>
                                        <Input style="width: 180px" placeholder='输入投保份数' v-model='planForm.maxNum' > </Input>
                                    </FormItem>
                            </iCol>
                            <iCol span="8">
                                    <FormItem label="保险期限（天）：" prop='period'  class='widthfix'>
                                        <Input style="width: 180px" placeholder='输入保险期限' v-model='planForm.period' > </Input>
                                    </FormItem>
                            </iCol>
                                <iCol span="8">
                                    <FormItem label="是否团单：" prop='isGroup' required class='widthfix'>
                                        <RadioGroup v-model="planForm.isGroup">
                                            <Radio :label="item.label" :value='item.value' v-for='(item,index) in isTrueList' :key='index'>{{item.value}}</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </iCol>

                            </Row>
                            <Row>
                                <iCol span="8">
                                    <FormItem label="固定费率：" prop='fixedRate'  class='widthfix'>
                                        <Input style="width: 180px" placeholder='输入固定费率' v-model='planForm.fixedRate' > </Input>
                                    </FormItem>
                                </iCol>
                                <iCol span="8">
                                    <FormItem label="技术服务费率：" prop='techServiceFeeRate'  class='widthfix' required>
                                        <Input style="width: 180px" placeholder='输入技术服务费率' v-model='planForm.techServiceFeeRate' > </Input>
                                    </FormItem>
                                </iCol>

                                <iCol span="8" >
                                    <FormItem label="经济费费率：" prop='brokerageRate'  class='widthfix' required>
                                        <Input style="width: 180px" placeholder='经济费费率' v-model='planForm.brokerageRate' > </Input>
                                    </FormItem>
                                </iCol>

                                </Row>
                            <Row>

                                <iCol span="8">
                                    <FormItem label="过单费费率：" prop='genOrderFeeRate'  class='widthfix' required>
                                        <Input style="width: 180px" placeholder='过单费费率' v-model='planForm.genOrderFeeRate' > </Input>
                                    </FormItem>
                                </iCol>
                                <iCol span="8">
                                    <FormItem label="是否含税：" prop='taxFlag' required class='widthfix'>
                                        <RadioGroup v-model="planForm.taxFlag">
                                            <Radio :label="item.label" :value='item.value' v-for='(item,index) in isTrueList' :key='index'>{{item.value}}</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </iCol>
                                <iCol span="8">
                                    <FormItem label="是否定额方案：" prop='quotaScheme' required class='widthfix'>
                                        <RadioGroup v-model="planForm.quotaScheme">
                                            <Radio :label="item.label" :value='item.value' v-for='(item,index) in radioData' :key='index'>{{item.value}}</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                </iCol>
                            </Row>
                            <Row>
                                <iCol span="8">
                                    <FormItem label="结算类型：" prop='settleType' required class='widthfix'>
                                        <Select style="width:180px;" v-model='planForm.settleType'>
                                            <Option v-for="(item,index) in settleTypeList" :value="item.label" :key="index">{{ item.value}}</Option>
                                        </Select>
                                    </FormItem>
                                </iCol>
                                <iCol span="8">
                                    <FormItem label="保费基数类型：" prop='premiumBaseType' required class='widthfix'>
                                        <Select style="width:180px;" v-model='planForm.premiumBaseType'>
                                            <Option v-for="(item,index) in premiumBaseTypeList" :value="item.label" :key="index">{{ item.value}}</Option>
                                        </Select>
                                    </FormItem>
                                </iCol>
                                <iCol span="8" v-if='planForm.quotaScheme=="true"'>
                                    <FormItem label="总保额：" prop='totalAmount'  class='widthfix'>
                                        <Input style="width: 180px" placeholder='输入总保额' v-model='planForm.totalAmount' > </Input>
                                    </FormItem>
                                </iCol>
                            </Row>
                            <Row>
                                <iCol span="8" v-if='planForm.quotaScheme=="true"'>
                                    <FormItem label="总保费：" prop='totalPremium'  class='widthfix'>
                                        <Input style="width: 180px" placeholder='输入总保费' v-model='planForm.totalPremium' > </Input>
                                    </FormItem>
                                </iCol>
                            </Row>
                        </Form>
                    </Row>
                </Card>
                <Card class='margin-top-10' v-show='isShowExtend' style='min-width: 1000px'>
                    <p slot="title">
                        <Icon type="compose"></Icon>
                        方案扩展信息编辑
                    </p>
                    <Row class="margin-top-10">
                        <Form :label-width="145" ref="ruleExtend" :model="planForm" :rules="ruleValidateGroupForm">
                        <iCol class='clearfix' >
                            <p>
                                <span style='width:145px;line-height: 20px;font-size: 13px;display: inline-block;float: left ;padding-right: 10px;text-align: right'>增加扩展：</span>
                                <Icon type="plus-circled" @click.native='saveExtend' size='20'></Icon>
                            </p>
                                <div style='background:#fff; position: relative;' >
                                    <div class='extend  clearfix'  v-for="(group, gIndex) in extendInputData" :key='gIndex' style='position: relative;'>
                                        <Icon type="trash-a" @click.native='removeGroupItem' size='20' v-if='extendInputData!=[]' style=' position: absolute;right: 15px; top: 28%;'></Icon>

                                        <Row v-for="(item,index) in showForm"  :key='index'  style='float: left;'>
                                                <FormItem :label='item.title' v-if='item.type=="1" ' >
                                                    <Input style="width: 180px;" :placeholder='item.hint'
                                                           v-model='extendInputData[gIndex][item.key]'> </Input>
                                                </FormItem>
                                                <FormItem :label='item.title' v-if='item.type=="2" ' >
                                                    <Input style="width: 180px;" :placeholder='item.hint' number
                                                           v-model='extendInputData[gIndex][item.key]'> </Input>
                                                </FormItem>
                                                <FormItem :label='item.title' v-if='item.type=="3" '  >
                                                    <Input style="width: 180px;" :placeholder='item.hint'
                                                           v-model='extendInputData[gIndex][item.key]'> </Input>
                                                </FormItem>

                                                <FormItem :label='item.title' v-if='item.type=="4" '>
                                                    <RadioGroup v-model='extendInputData[gIndex][item.key]'>
                                                        <Radio :label="option.label+'' " :value='option.value'
                                                               v-for='(option,index) in item.options' :key='index'>
                                                            {{option.value}}
                                                        </Radio>
                                                    </RadioGroup>
                                                </FormItem>
                                        </Row>

                                    </div>
                                </div>
                        </iCol>
                        </Form>
                    </Row>
                </Card>
                <Card class='margin-top-10' style='min-width: 1000px'>
                    <p slot="title">
                        <Icon type="compose"></Icon>
                        责任基本信息编辑
                    </p>
                    <Row class="margin-top-10" style='max-width: 1650px'>
                        <editTable ref="editTableChild" @onremove='ajaxRemoveLiabilityQuery' ></editTable>
                        <Button type='primary' style='margin: auto;width:120px;display: block;margin-top: 5px' @click.native='submitPlanEvent'>提交</Button>
                    </Row>
                </Card>
            </iCol>
        </Row>
    </div>
</template>

<script>
    import ICol from "../../../node_modules/iview/src/components/grid/col";
    import editTable from "./editLiabilityTable.vue";
    export default {
        components: {ICol,editTable,},
        name: 'addPlan',
        data () {
            return {
                planmodel:this.$route.query.planmodel,
                isIncluded:'true',
//                isTrueList:[{key:'0',value:'否'},{key:'1',value: '是'}],
                isTrueList:[
                    {label: 0, value: '否'},
                    {label: 1, value: '是'},
                ],
                mainSubFlagList:[{label:'0',value:'主险'},{label:'1',value: '附加险'}],
                settleTypeList: [
                    {label: 1, value: '实时'},
                    {label: 2, value: '周结'},
                    {label: 3, value: '月结'},
                ],
                premiumBaseTypeList: [
                    {label: 1, value: '出单保费'},
                    {label: 2, value: '税后保费'},
                ],
                clauseList:[],
                isShowExtend:false,
                productList: [],//产品列表
                agencyList:[],//保险机构
                radioData:[
                    {label:'false',value:'否'},
                    {label:'true',value:'是'}
                ],
                productValidate:{
                    'selectedProductNo':[{required: true, message: '请选择产品', pattern: /.+/, trigger: 'change'}],
                },//产品
                ruleValidateEditPlan:{
                    'productNo':[{required: true, message: '请选择产品', pattern: /.+/, trigger: 'change'}],
                    'planName':[{ required: true, message: '产品方案名称不能为空', trigger: 'change' }],
                    'planNo':[{ required: true, message: '内部产品方案编号不能为空', trigger: 'change' }],
                    'insPlanNo':[{ required: false, message: '保险公司产品方案编号不能为空', trigger: 'change' }],
                    'institNo':[{ required: true, message: '保险机构编号不能为空', trigger: 'change' }],
                    'discountRate':[{required: false,message: '优惠比例为0-1之间小数',pattern:/^(0|0\.\d+)$/, trigger: 'change' }],
                    'maxNum':[{ required: false, message: '投保份数必须为数字',pattern:/^\d+$/, trigger: 'change',}],
                    'period':[{ required: false, message: '保险期限只能为数字', pattern:/^\d+$/,trigger: 'change',}],
                    'fixedRate':[{ required: false, message: '固定费率为0-1之间小数',pattern:/^(0|0\.\d+)$/, trigger: 'change',}],
                    'totalAmount':[{ required: false, message: '总保额必须为数字', pattern:/^\d+$/,trigger: 'change',}],
                    'totalPremium':[{ required: false, message: '总保费必须为数字',pattern:/^\d+$/, trigger: 'change',}],
                    'techServiceFeeRate':[{required: true,message: '技术服务费率为0-1之间小数',pattern:/^(0|0\.\d+)$/, trigger: 'change' }],
                    'brokerageRate':[{required: true,message: '经济费费率为0-1之间小数',pattern:/^(0|0\.\d+)$/, trigger: 'change' }],
                    'genOrderFeeRate':[{required: true,message: '经济费费率为0-1之间小数',pattern:/^(0|0\.\d+)$/, trigger: 'change' }],
                    'settleType':[{required: true,message: '请选择结算类型', pattern: /.+/, trigger: 'change'}],
                    'premiumBaseType':[{required: true,message: '请选择保费基数类型', pattern: /.+/, trigger: 'change'}],
//                    'riskTypes':[{ required: true, message: '险种类型不能为空', trigger: 'change'}],
                },//方案校验
                planForm:{
//                    'planNo':'',
//                    'insPlanNo':'',
//                    'planName':'',
//                    'description':'',
//                    'institNo':'',
//                    'discountRate':'',
//                    'maxNum':'',
//                    'period':'',
                    'quotaScheme':'true',
//                    'fixedRate':'',
//                    'totalAmount':'',
//                    'totalPremium':'',
                    'isGroup':0,
                    'taxFlag':0,
                    'settleType':1,
                    'premiumBaseType':1,
                    'extendJson':null,
                },//方案form

                ruleValidateGroupForm:{},
                selectExtendList: [],
                //用户选择的字段，即要展示的表单模板
                showForm: null,
                //用户在扩展字段输入的值
                extendInputData:[],  //绑定用户在扩展表单输入的值
            };
        },
        beforeRouteEnter(to, from, next){
            next(vm=>{
                vm.planmodel=vm.$route.query.planmodel

                // 每次进入路由执行
                vm.handleReset('submitEditPlanForm')
                vm.ajaxAgencyQuery();
                vm.ajaxProductList();
                vm.showContent(vm.planmodel)
                vm.extendInputData=[];
                vm.showForm=null;
                vm.$refs.editTableChild.tableData=[];

            })
        },
        methods: {
        //  请求查询方案表
            ajaxPlanQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                let planNoParam = this.$route.query.planNoParam;//获取产品方案参数，参数为上一个页面跳转时放置的
                let strPlanNoParam={"planNo":planNoParam};
                this.$http.post(url, {name: 'plan', action: 'query', data:JSON.stringify(strPlanNoParam)}).then(response => {
                    let res = response.data;
                    if(res.rtCode=='0000'){
                        this.planForm=res.data;
                        this.planForm.quotaScheme=this.planForm.quotaScheme?"true":"false";
                       let extend=JSON.parse(res.data.extendJson);
//                        this.extendInputData=JSON.parse(res.data.extendJson);
                        this.initExtendData(extend)
                        console.log(res.data.extendJson)
                    }else {
                        console.log(res.rtMsg)
                    }
                });
            },
          //请求查询责任表
            ajaxLiabilityQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                let planNoParam = this.$route.query.planNoParam;//获取产品方案参数，参数为上一个页面跳转时放置的
                let strPlanNoParam={"planNo":planNoParam};
                this.$http.post(url, {name: 'planItem', action: 'selectall', data:JSON.stringify(strPlanNoParam) }).then(response => {
//                    this.$refs.editTableChild.tableData= response.data.data;
                    let data=response.data.data;
                    //处理数据，2个字段 bool转为0/1
                    for(let i in data){
                        let obj=data[i]
                        obj.mainSubFlag=obj.mainSubFlag?"1":"0";
                        obj.isIncluded = obj.isIncluded ? "1" : "0";
                    }
                    this.$refs.editTableChild.tableData=data;

                });
            },
            //查询保险机构
            ajaxAgencyQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/institutionDic';
                this.$http.post(url, {}).then(response => {
                    let res = response.data;
                    if (res.resCode == '0000') {
                        this.agencyList = res.data;
                    }
                })
            },
            //查询产品
            ajaxProductList(){
                //拉取产品list
                let url=process.env.BASE_URL+process.env.commonPort+'/ins/common/productDic';
                this.$http.post(url, {}).then(response => {
                    let res = response.data;
                    if(res.resCode=='0000'){
                        this.productList=res.data;
                    }
                })
            },
            //根据产品查询扩展
            queryJsonMould(productNo){
                //根据productNo获取获取模板json的接口
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/common/planExtendsDic';
                this.$http.post(url,{'productNo': productNo})
                    .then(response => {
                        if(response.data.resCode='0000'){
                            let  jsonStr=response.data.data;
                            if(jsonStr==null||jsonStr=='[]'){
                                this.isShowExtend=false
                            }else {
                                this.isShowExtend=true;
                                var extendJson=JSON.parse(jsonStr);
                                for(let i=0;i<extendJson.length;i++){
                                    console.log('extendJson[i].type='+extendJson[i].type)
                                    console.log('extendJson[i]='+JSON.stringify(extendJson[i]))
                                    if(extendJson[i].type=='4'){
                                        if(!extendJson[i].options){
                                            let options=[{"value":"是","label":"true"},{"value":"否","label":"false"}];
                                            extendJson[i].options=options
                                        }
                                    }
                                }
                                this.showForm=extendJson;
                            }

                        }else {
                            console.log('error='+response.data.resMsg)
                        }

                    }).catch(error => {
                    console.log('error=' + error);
                });
            },
            //移除扩展
            removeGroupItem(index){
                this.extendInputData.splice(index,1)
            },
            saveExtend(){
                var data={};
                console.log(JSON.stringify(this.showForm))
                for( var i in this.showForm ){
                    var key=this.showForm[i].key;
                    data[key]="";
                }
                this.extendInputData.push(data)
                console.log(' this.extendInputData='+ JSON.stringify(this.extendInputData))
            },
            getExtendForm(){
                var form={};
                for(var i in this.showForm ){
                    var extend=this.showForm[i]
                    var value=this.extendInputData[i]
                    form[extend.key]= value==undefined||value==null?"":value
                }
                return form;
            },
             //校验扩展字段输入是否有误，有误则返回提示信息，无误则返回null
            validateExtend(){
                for(var index in this.extendInputData) {
                    //一组扩展字段输入的数据
                    var oneGroupData=this.extendInputData[index];
                    var num=parseInt(index)+1

                    for (var i in this.showForm) {
                        var extend = this.showForm[i];
                        var value = oneGroupData[extend.key]

                        //所有扩展字段均不能为空
                        if (value == undefined || value == null || value === "") {
                            return "第" +num+"组："+extend.title + "不能为空";
                        }
                        if (extend.type == "inputNum") {
                            if (!this.isNumber(value)) {
                                return "第" +num+"组："+extend.title + "必须是数字";
                            }
                        }
                    }
                }
                return null;
            },
          //提交
            submitPlanEvent() {
//                return;
//                this.verifyPlanFn();
                this.savePlan()
            },
            //校验扩展
            validateExtendFn(){
                var errMsg=this.validateExtend()
                if(errMsg==null) {
                    console.log("扩展字段校验通过")
                    try {
                        this.validateLiabilityFn()
                    }catch (e){
                        console.log("error:"+e)
                    }
                }else{
                    this.warnTip('方案扩展信息编辑-警告',errMsg)
                    return;
                }
            },
            warnTip(t,content){
                this.$Modal.warning({
                    title: t,
                    content: "扩展字段校验不通过："+content
                });
            },
            //扩展字段bool转string
            initExtendData(extendDataList){
                for( var i in extendDataList){
                    var data=extendDataList[i];
                    for(var key in data ){
                        var value=data[key];
                        if(typeof(value)==="boolean"){
                            //boolean转string型 放回json
                            data[key]=value.toString()
                        }
                    }
                }
                this.extendInputData=extendDataList;
            },
            //校验责任
            validateLiabilityFn(){
                var result=this.$refs.editTableChild.verify()
                if(result!=false) {
                    //fixme ===
                    if(this.planmodel==1){
                        this.ajaxAddPlanQuery();
                    }else {
                        this.ajaxEditPlanQuery();
                    }

                }else{
//                    alert("失败：")
                    console.log("失败：")
                    return;
                }
            },
            //校验方案
            verifyPlanFn(){
                this.$refs["submitEditPlanForm"].validate((valid) => {
                    console.log("valid=" + valid);
                    if (valid) {
                        this.validateExtendFn()
                    }else {
                        console.log("校验方案不通过")
                        return;
                    }
                });
            },
            //清空校验
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            savePlan(){
                this.verifyPlanFn();
            },

            //请求增加方案表
            ajaxAddPlanQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                var pForm=JSON.parse(JSON.stringify(this.planForm))
                delete  pForm.id;
                pForm.extendJson=JSON.stringify(this.extendInputData)
                //增加方案时，需要上传productNo参数 产品No
                pForm.productNo=this.planForm.productNo;
//                pForm.productNo=this.productNo;
                let liabilityFormParam=this.$refs.editTableChild.tableData;
                let planFormParam=pForm;
                var obj={'liabilityFormParam':liabilityFormParam,'planFormParam':planFormParam}
                this.$http.post(url, {name: 'planWithItem', action: 'insert', data:JSON.stringify(obj) }).then(response => {
                    let res = response.data;
                    if(parseInt(res.rtCode)==0){
                        this.$router.push({
                            path: '/product/insur-plan',
                        });
                    }else {
                        console.log(res.rtMsg)
                    }
                });
            },
            //修改责任方案
            ajaxEditPlanQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                var pForm=JSON.parse(JSON.stringify(this.planForm))
//                delete  pForm.id;
                pForm.extendJson=JSON.stringify(this.extendInputData)
                //修改方案时，需要上传productNo参数 产品No
                pForm.productNo=this.planForm.productNo;
                let liabilityFormParam=this.$refs.editTableChild.tableData;
                let planFormParam=pForm;
                var obj={'liabilityFormParam':liabilityFormParam,'planFormParam':planFormParam}
                this.$http.post(url, {name: 'planWithItem', action: 'update', data:JSON.stringify(obj) }).then(response => {
                    let res = response.data;
                    if(parseInt(res.rtCode)==0){
                        this.$router.push({
                            path: '/product/insur-plan',
                        });
                    }else {
                        console.log(res.rtMsg)
                    }
                });
            },
            showContent(param){
                if(param!=1){
//                if(this.planmodel!=1){
                    this.ajaxPlanQuery();//请求方案
                    this.ajaxLiabilityQuery();//请求责任
                }else {
                    console.log("not http send")
                }
            },
            //删除责任
            ajaxRemoveLiabilityQuery(index) {
                if(this.planmodel==1){
                    this.$refs.editTableChild.removeLiabilityTable()
                }else{
                    let url =  process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                    let idObj={'id':this.$refs.editTableChild.tableData[index].id};
                    let strId=JSON.stringify(idObj);
                    this.$http.post(url,{name: 'planItem', action: 'delete', data:strId})
                        .then(response => {
                            console.log(response.data)
                            if(response.data.rtCode=='0000'){
//                            this.$Message.error('已删除');
                                this.ajaxLiabilityQuery();
                            }
                        })
                        .catch(error => {
                            console.log('error=' + error);
                        });
                }

            },
        },
        created () {
                if(this.planmodel!=1){
                this.ajaxPlanQuery();//请求方案
                this.ajaxLiabilityQuery();//请求责任
            }
        },
        watch: {
            //监听路由跳转，页面变化
            '$route'(to,from){
            }
        }
    };
</script>
