<style lang="less">
    @import '../../styles/common.less';
    @import '../common-components/table.less';
    .extend{
        /*background-color: #eee;*/
        /*.ivu-icon{line-height: 33px;}*/
        .extendTop{
            .ivu-form-item-label{margin-left: 50px;}
            .ivu-form-item{margin-bottom: 5px;}
        }
        .extendInfo {
            margin-left: 70px;
            .ivu-form-item{float: left;width: 265px;}
            .ivu-form-item-label{width: 90px;}
            .ivu-form-item-content{float: left}
            .ivu-input-wrapper{width: 160px;margin-right: 10px;}
            /*.ivu-form-item-content{margin-bottom: 24px;}*/
        }
    }
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
    /*.ivu-form{*/
        /*.ivu-form-item{*/
            /*.ivu-form-item-label{width: 160px;padding:10px 12px 10px 10px;}*/
        /*}*/
    /*}*/
    /*.extendinfo{float: left;width: 380px;}*/
    /*.floatleft{float: left;}*/
    /*.widthfix{width: 300px}*/
</style>

<template>
    <div>

        <Row>
            <iCol span="24" class="padding-left-10">
                <Card>
                    <Row style='margin-bottom:10px'>
                        <iCol span="24" >
                            <div>
                                <Button type='primary' @click='showProductTableModal(1)'>增加</Button>
                            <!--    <div style='float: right'>
                                    <span style='font-size: 12px;margin:0 5px;'>选择日期:</span>
                                    <DatePicker type="daterange"  placement="left-start"  v-model='dateRange' placeholder="选择日期" style="width: 200px"></DatePicker>
                                    <Button type='primary' @click='searchClick'>查询</Button>
                                </div>-->
                            </div>
                        </iCol>
                    </Row>
                    <div>
                        <Table :columns="productColumnsList" :data="copyProductTableData" border></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="total" :current.sync="pageNum" :page-size="pageSize" showTotal @on-change="pageChange"></Page>
                            </div>
                        </div>
                    </div>
                </Card>
            </iCol>
        </Row>
        <Modal width="700" v-model="showProductModal" class-name="vertical-center-modal">
            <p slot="header">
                <span>{{productTitle}}</span>
            </p>
            <div>
                <Form :label-width="120" ref="submitEditProductForm" :model="productForm" :rules="ruleValidateEditProduct">
                    <div>
                        <iCol>
                            <FormItem label="产品名称：" prop='productName' required>
                                <Input style="width: 400px" placeholder='输入产品名称' v-model='productForm.productName'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="产品编号：" prop='productNo' required>
                                <Input style="width: 400px" placeholder='输入产品编号' v-model='productForm.productNo'> </Input>
                            </FormItem>
                        </iCol>

                        <iCol>
                            <FormItem label="保险机构编号：" prop='institNo' required>
                                <Select style="width:400px;margin-top: 5px;" v-model='productForm.institNo'>
                                    <Option v-for="(item,index) in agencyList" :value="item.infoKey" :key="index">{{ item.infoValue}}</Option>
                                </Select>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="保险机构服务费率：" prop='institFeeRate' >
                                <Input style="width: 400px" placeholder='输入保险机构服务费率' v-model='productForm.institFeeRate'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="平台服务费率：" prop='platFeeRate' >
                                <Input style="width: 400px" placeholder='输入平台服务费率' v-model='productForm.platFeeRate'> </Input>
                            </FormItem>
                        </iCol>
                        <iCol>
                            <FormItem label="出单方式：" prop='genOrderType' required>
                                <Select style="width:400px;margin-top: 5px;" v-model='productForm.genOrderType'>
                                    <Option v-for="(item,index) in genOrderTypeList" :value="item.label" :key="index">{{ item.value}}</Option>
                                </Select>
                            </FormItem>
                        </iCol>
                    </div>
                </Form>
                <Form ref='groupForm' :model='parent'  :rules="ruleValidateGroupForm"  class='extend'>
                    <iCol class='extendTop'>
                        <FormItem label="扩展信息：">
                            <Icon type="plus-circled" @click.native='addExtend' size='20'></Icon>
                        </FormItem>
                    </iCol>

                    <div  class='extendInfo'  v-for="(group, gIndex) in parent.extendData" :key='gIndex' >
                        <div style='position: relative' >
                            <Icon type="trash-a" @click.native='removeGroupItem' size='20' style='position: absolute;top: 30%;right:10px;z-index: 100'></Icon>
                            <iCol class='clearfix'>
                                <FormItem label="key：" :prop='"extendData["+gIndex+"].key"' required >
                                    <Input  placeholder='输入字段key值' v-model='parent.extendData[gIndex].key' > </Input>
                                </FormItem>
                                <FormItem label="字段名称：" :prop='"extendData["+gIndex+"].title"' required>
                                    <Input placeholder='输入字段中文含义' v-model='parent.extendData[gIndex].title' > </Input>
                                </FormItem>
                            </iCol>
                            <iCol class='clearfix'>
                                <FormItem label="字段类型：" :prop='"extendData["+gIndex+"].type"' required>
                                    <!--<Input placeholder='输入type值' v-model='parent.extendData[gIndex].type' > </Input>-->
                                    <Select style="width:160px;" v-model='parent.extendData[gIndex].type'  @on-change='changeSelectType(gIndex)'>
                                    <!--<Select style="width:160px;" v-model='parent.extendData[gIndex].type' >-->
                                        <Option v-for="(item,index) in typeList" :value="item.label" :key="index">{{ item.value}}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="提示文字：" :prop='"extendData["+gIndex+"].hint"'  v-for=''>
                                    <Input placeholder='输入文字提示' v-model='parent.extendData[gIndex].hint' > </Input>
                                </FormItem>
                            </iCol>
                        </div>
                    </div>

                </Form>
            </div>
            <div slot="footer" style='text-align:center;border-top: none'>
                <Button type="primary" @click='cancelProductModal'>取消</Button>
                <Button type="primary" @click="submitProductEvent()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import format from '../../libs/format.js';
    import Cookies from 'js-cookie';
    export default {
        name: 'productInfo',
        data () {
            return {
                total: 0,
                pageNum: 1,
                pageSize:10,
//                orderType:1,
                agencyList:[],
                genOrderTypeList:[{label:1,value:'实时出单'},{label:2,value:'审核出单'}],
                productColumnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '产品名称',
                        align: 'center',
                        key: 'productName'
                    },
                    {
                        title: '产品编号',
                        align: 'center',
                        key: 'productNo'
                    },
                    {
                        title: '保险机构编号',
                        align: 'center',
                        key: 'institNo'

                    },
                    {
                        title: '保险机构服务费率',
                        align: 'center',
                        key: 'institFeeRate'
                    },
                    {
                        title: '平台服务费率',
                        align: 'center',
                        key: 'platFeeRate'
                    },
                    {
                        title: '出单方式',
                        align: 'center',
                        key: 'genOrderType'
                    },
//                    {
//                        title: '产品方案拓展字段',
//                        align: 'center',
//                        key: 'planExtendItem'
//                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 160,
//                        render: (h, params) => {
//                            return h('div', [
//                                h('Button', {
//                                    props: {
//                                        type: 'primary',
//                                        size: 'small'
//                                    },
//                                    style: {
//                                        marginRight: '5px'
//                                    },
//                                    on: { click: () => {
//                                        this.showProductTableModal(2,params.index)
//                                    }
//                                    }
//                                }, '修改'),
//                                h('Button', {
//                                    props: {
//                                        type: 'error',
//                                        size: 'small'
//                                    },
//                                    style: {
//                                        marginRight: '5px'
//                                    },
//                                    on: { click: () => { this.ajaxRemoveProductQuery(params.index)  }
//                                    }
//                                }, '删除'),
//                            ])
//                        }
                    }
                ],
                productTableData: [],
                copyProductTableData:[],
                showProductModal:false,
                productForm:{
                    'productNo':'',
                    'productName':'',
                    'institNo':'',
                    'institFeeRate':'',
                    'platFeeRate':'',
                    'genOrderType':'',
                    'planExtendItem':null,
                },//产品form
                groupForm:{
                    key:'',
                    title:'',
                    type:'',
                    hint:'',
                },
                productmodel:1,//增加按钮模式1，编辑按钮模式2或者空
                ruleValidateEditProduct:{
                    'productName':[{ required: true, message: '产品名称不能为空', trigger: 'change' }],
                    'productNo':[{ required: true, message: '产品编号不能为空', trigger: 'change' }],
                    'institNo':[{ required: true, message: '保险机构不能为空', trigger: 'change' }],
                    'institFeeRate':[{ required: false, message: '保险机构服务费率为0-1之间小数', pattern:/^(0|0\.\d+)$/,trigger: 'change' }],
                    'platFeeRate':[{ required: false, message: '平台服务费率为0-1之间小数', pattern:/^(0|0\.\d+)$/,trigger: 'change' }],
                    'genOrderType':[{required: true, message: '请选择', pattern: /.+/, trigger: 'change'}],
                },//产品f校验
                ruleValidateGroupForm:{
//                    extendData:{
//                      0:{
//                          "key":[{ required: true, message: 'key值不能为空', trigger: 'change' }]
//                      },
//                    },
//                    'extendData[0].key':[{ required: true,  message: 'key值不能为空', trigger: 'change' }],
                },//扩展信息校验
                productTitle:'增加产品配置信息',//增加按钮模式1，编辑按钮模式2
                userId: Cookies.get('userId'),
                extendInputData:[],  //绑定用户在扩展表单输入的值
                parent:{
                    extendData:[]//存入全部的扩展json
                },
                typeList:[{label:'1',value:'文字类型'},{label:'2',value:'整数类型'},{label:'3',value:'小数类型'},{label:'4',value:'是否'}],//type类型
                dateRange:"",
                startDate:'',
                endDate:'',
            };
        },
        methods: {
            getData() {
                this.ajaxProductQuery()
            },
            pageChange(index){
                this.ajaxProductQuery(null,index)
            },
            searchClick(event){
                this.ajaxProductQuery()
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
            //请求查询产品表
            ajaxProductQuery(event,pageIndex){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/manage/insProductPageQuery';
                pageIndex=(pageIndex==undefined ?1:pageIndex);
                let params={
                    'pageIndex':pageIndex,
                    'userId':this.userId,
                    "pageSize": 10,
//                    "startDateStr": "2018-05-05",//以后修改
//                    "endDateStr": "2018-08-06"
                };
                if(this.dateRange[0]!=null&&this.dateRange.length!==0) {
                    //如果选定了日期
                    params["startDateStr"]=this.dateRange[0].format("yyyy-MM-dd");
                    params["endDateStr"]=this.dateRange[1].format("yyyy-MM-dd");
                }

                this.$http.post(url,params).then(response=>{
                    let res=response.data;
                    if(res.resCode=='0000'){
                        this.productTableData=res.data.result;
                        this.copyProductTableData=JSON.parse(JSON.stringify(this.productTableData))
                        for(let i=0; i<this.copyProductTableData.length;i++){
                            for(let j in this.genOrderTypeList){
                                if(this.copyProductTableData[i].genOrderType==this.genOrderTypeList[j].label){
                                    this.copyProductTableData[i].genOrderType=this.genOrderTypeList[j].value;//map 出单方式
                                }
                            }
                        };
                        this.pageNum= pageIndex;
                        this.total=res.data.totalSize;
                    }else {
                        console.log(res.resMsg)
                    }

                });

            },
            //请求增加产品表
            ajaxAddProductQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                delete  this.productForm.id;
                let productFormParam=JSON.stringify(this.productForm);
                this.$http.post(url, {name: 'product', action: 'insert', data:productFormParam }).then(response => {
                    let res = response.data;
                    if(parseInt(res.rtCode)==0){
                        this.cancelProductModal();
                        this.ajaxProductQuery();
                    }else {
                        console.log(res.rtMsg)
                    }
                });
            },
            //请求修改产品表
            ajaxEditProductQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                let productFormCopy=JSON.parse(JSON.stringify(this.productForm))
//                console.log(this.productTableData[this.productForm.index].planExtendItem)
                productFormCopy.id=this.productTableData[this.productForm.index].id;
                let strProductForm=JSON.stringify(productFormCopy);
                this.$http.post(url, {name: 'product', action: 'update', data:strProductForm}).then(response => {
                    let res = response.data;
                    if(res.rtCode=='0000'){
                        this.cancelProductModal();
                        this.ajaxProductQuery();
                    }else {
                        console.log(res.rtMsg)
                    }
                });
            },
            //请求删除产品表
            ajaxRemoveProductQuery(index) {
                let _this = this;
                let config = {
                    width: 300,
                    title: '提示',
                    content: '确定删除么？',
                    okText: '确定',
                    onOk: function () {
                        let url = process.env.BASE_URL+process.env.commonPort+'/ins/config/action';
                        let idObj={'id':_this.productTableData[index].id}
                        let strId=JSON.stringify(idObj);
                        this.$http.post(url,{name: 'product', action: 'delete', data:strId})
                            .then(response => {
                                _this.ajaxProductQuery()
                            })
                            .catch(error => {
                                console.log('error=' + error);
                            });
                    },
                };
                this.$Modal.confirm(config)
            },
            //显示产品表弹框
            showProductTableModal(productmodel,index){
                this.showProductModal = true;
                this.handleReset('submitEditProductForm');
                this.handleReset('groupForm');
                //this.productForm.planNo=this.$route.query.planNoParam;// 固定的
                let _this=this;
                this.productmodel=productmodel;
                if(1==productmodel){
                    //弹框为【增加】模式
                    this.productTitle='增加产品配置信息';
                }else {
                    //弹框为【编辑】模式
                    this.productTitle='修改产品配置信息';
                    this.productForm= JSON.parse(JSON.stringify(this.productTableData[index]));
                    this.parent.extendData=JSON.parse(this.productForm.planExtendItem)
//                    console.log('this.productForm='+JSON.stringify(this.productForm))
                    this.productForm.index=index;
                }
            },
            //点击产品表弹框的确定按钮
            submitProductEvent() {
                this.productForm.planExtendItem= this.parent.extendData;
                this.getkey(this.groupForm)
         /*       return;*/
                this.validateGroupForm();
                this.$refs["submitEditProductForm"].validate((valid) => {
                    console.log("valid=" + valid);
                    if (valid) {
//                        return
                        this.saveProduct()
                    }
                })
            },
            //点击确定按钮后发不同请求 1为增加请求 2为修改请求
            saveProduct(){
                if(this.productmodel==1){
                    this.ajaxAddProductQuery();
                }else{
                    this.ajaxEditProductQuery();
                }
            },
            //取消点击产品按钮
            cancelProductModal(){
//                this.validateGroupForm()
//                console.log(JSON.stringify(this.ruleValidateGroupForm))
                this.showProductModal = false;
                this.parent.extendData=[];
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            addExtend(){
                let data={
                        key:'',
                        title:'',
                        type:'',
                        hint:'',
//                       options:[{"label":1,"value":"是"},{"label":0,"value":"否"}],
                };
                this.parent.extendData.push(data);
                let index=this.parent.extendData.length-1;
                console.log(index);
                this.ruleValidateGroupForm['extendData['+index+'].key']=[{ required: true,  message: 'key值不能为空', trigger: 'change' }];
                this.ruleValidateGroupForm['extendData['+index+'].title']=[{ required: true,  message: '字段名称不能为空', trigger: 'change' }];
                this.ruleValidateGroupForm['extendData['+index+'].type']=[{ required: true,  message: '请选择', pattern: /.+/, trigger: 'change'}];
//                console.log(JSON.stringify(this.extendData))
            },
           //删除一组
            removeGroupItem(index){
                this.parent.extendData.splice(index,1)
            },
            //把key值存入数组
            getkey(list){
                for(var i in list){
                   let keyParams=list[i]
                    this.extendInputData.push(keyParams)
                }
                console.log('this.extendInputData='+this.extendInputData)
            },
            //下拉联动
            changeSelectType(index){
                let data=this.parent.extendData[index];
                let typeHint={
                    "1":"请输入文字",
                    "2":"请输入数字",
                    "3":"请输入小数",
                    "4":"",
                };
                data.hint=typeHint[data.type.toString()]
            },
            //校验组
            validateGroupForm(){
                this.$refs["groupForm"].validate((valid) => {
                    console.log("valid=" + valid);
                    if (valid) {
                        console.log('通过校验')
                    }
                });
            }
        },
        mounted() {
            this.getData()
            this.ajaxAgencyQuery()
        }
    };
</script>
