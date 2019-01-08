<style lang="less" scoped>
    @import '../../styles/common.less';
  #editTable{
      .cell{
          padding: 0 5px;
          height: 42px;
          line-height: 42px;
          border: 1px solid #000;
          border-top: 0px;
          border-right: 0px;
          color: rgb(71, 71, 71);
          font-size: 12px;
          .ivu-select{
              width: 50%;
          }
          .ivu-input{
              width: 50%;
          }
          .unit-cell{
              display: inline-block;
              width: 30%;
          }
          .ivu-min-width{width: 50px;}
      }
  }

</style>

<template>
  <Card>
      <Button type='primary' @click='addLiabilityTable'>增加</Button>
      <Table style='max-width: 1650px;' border :columns="liabilityColumnsList" :data="tableData" id='editTable'></Table>
  </Card>

</template>

<script>
    export default {
        name: 'editTable',
        props: {
            attrs: Object
        },
        data() {
            return {
                clause:'001',
                isIncluded:'1',
                strategy:1,
//                mainSubFlag:'0',
                tableDataCopy:null,
                tableData:[
                ],
                isTrueList:[{key:'0',value:'否'},{key:'1',value: '是'}],
                mainSubFlagList:[{key:'0',value:'主险'},{key:'1',value: '附加险'}],
                clauseList:[],
                liabilityColumnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center',
                        fixed: 'left',
                    },
                    {
                        title: '责任编号',
                        width: 180,
                        align: 'center',
                        key: 'itemNo',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                       value:this.tableData[params.index].itemNo,
                                        placeholder:'输入责任编号',
                                    },
                                    style: {
                                        width:'150px',
                                    },
                                    on: {
                                        input: (value) => {
                                            console.log("value="+value)
                                            console.log("params.row="+JSON.stringify(params.row))
                                            params.row.itemNo=value;
                                            this.tableData[params.index]=params.row
                                      }
                                    }
                                },''),
//                                h('span',{
//                                    style: {
//                                        color: 'red',
////                                        display: this.tableData[params.index].itemNo === "" ? '' : 'none'
//                                        display: 'none'
//                                    }
//                                },this.tableData[params.index].itemNo)
                            ])
                        }
                    },
                    {
                        title: '责任名称',
                        width: 180,
                        align: 'center',
                        key: 'itemName',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value:this.tableData[params.index].itemName,
                                        placeholder:'输入责任名称'
                                    },
                                    style: {
//                                        marginRight: '5px',
                                        width:'150px'
                                    },
                                    on: { input: (value) => {
                                        params.row.itemName=value;
                                        this.tableData[params.index]=params.row
                                    }
                                    }
                                },''),
                            ])
                        }
                    },
                    {
                        title: '险类',
                        align: 'center',
                        key: 'riskTypeNo',
                        width: 180,
                        render:(h,params)=>{
                            return h('Select',{
                                    props:{
                                        value:this.tableData[params.index].riskTypeNo
                                    },
                                    style: {
                                        width:'150px'
                                    },
                                    on:{
                                        'on-change':(e)=>{
                                            console.log(e)
                                            params.row.riskTypeNo=e;
                                            this.tableData[params.index]=params.row
                                        }
                                    }
                                },
                                this.riskCategoryList.map((item)=>{
                                    return h('Option',{
                                        props:{
                                            value:item.infoKey,
                                            label:item.infoValue,
                                        }
                                    })
                                }))
                        }
                    },
                    {
                        title: '条款',
                        align: 'center',
                        key: 'clauseNo',
                        width: 180,
                        render:(h,params)=>{
                            return h('Select',{
                                props:{
                                    value:this.tableData[params.index].clauseNo
                                },
                                    style: {
                                        width:'150px'
                                    },
                                on:{
                                    'on-change':(e)=>{
                                        console.log(e)
                                        params.row.clauseNo=e;
                                        this.tableData[params.index]=params.row
                                    }
                                }
                            },
                                this.clauseList.map((item)=>{
                                return h('Option',{
                                    props:{
                                        value:item.infoKey,
                                        label:item.infoValue,
                                    }
                                })
                            }))
                        }
                    },
                    {
                        title: '主附险标识',
                        width: 120,
                        align: 'center',
                        key: 'mainSubFlag',
                        render:(h,params)=>{
                            return h('Select',{
                                    props:{
                                        value:this.tableData[params.index].mainSubFlag,
                                    },
                                    style: {
                                        width:'90px'
                                    },
                                    on:{
                                        'on-change':(e)=>{
                                            console.log(e)
                                            params.row.mainSubFlag=e;
                                            this.tableData[params.index]=params.row
                                        }
                                    }
                                },
                                this.mainSubFlagList.map((item)=>{
                                    return h('Option',{
                                        props:{
                                            value:item.key,
                                            label:item.value,
                                        }
                                    })
                                }))
                        }
                    },
                    {
                        title: '每人保额上限',
                        width: 120,
                        align: 'center',
                        key: 'perPersonAmount',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value:this.tableData[params.index].perPersonAmount,
                                        placeholder:'每人保额上限'
                                    },
                                    style: {
//                                        marginRight: '5px',
                                        width:'90px'
                                    },
                                    on: { input: (value) => {
                                        params.row.perPersonAmount=value;
                                        this.tableData[params.index]=params.row
//                                        this.liabilityColumnsList[params.index].perPersonAmount=value
                                    }
                                    }
                                },''),
                            ])
                        }
                    },
                    {
                        title: '每次保额上限',
                        width: 120,
                        align: 'center',
                        key: 'perTimeAmount',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value:this.tableData[params.index].perTimeAmount,
                                        placeholder:'每人保额上限'
                                    },
                                    style: {
//                                        marginRight: '5px',
                                        width:'90px'
                                    },
                                    on: { input: (value) => {
                                        params.row.perTimeAmount=value;
                                        this.tableData[params.index]=params.row
                                    }
                                    }
                                },''),
                            ])
                        }
                    },
                    {
                        title: '保额',
                        width: 120,
                        align: 'center',
                        key: 'amount',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value:this.tableData[params.index].amount,
                                        placeholder:'请输入保额'
                                    },
                                    style: {
                                        width:'90px'
                                    },
                                    on: { input: (value) => {
                                        params.row.amount=value;
                                        this.tableData[params.index]=params.row;
                                    }
                                    }
                                },''),
                            ])
                        }
                    },
                    {
                        title: '保费',
                        width: 120,
                        align: 'center',
                        key: 'premium',//
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value:this.tableData[params.index].premium,
                                        placeholder:'请输入保费'
                                    },
                                    style: {
                                        width:'90px'
                                    },
                                    on: { input: (value) => {
                                        params.row.premium=value;
                                        this.tableData[params.index]=params.row
                                    }
                                    }
                                },''),
                            ])
                        }
                    },
                    {
                        title: '费率',
                        width: 120,
                        align: 'center',
                        key: 'amountRate',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value:this.tableData[params.index].amountRate,
                                        placeholder:'请输入费率',
                                    },
                                    style: {
                                        width:'90px'
                                    },
                                    on: { input: (value) => {
                                        params.row.amountRate=value;
                                        this.tableData[params.index]=params.row
                                    }
                                    }
                                },''),
                            ])
                        }
                    },
                    {
                        title: '是否计入保额保费',
                        width: 120,
                        align: 'center',
                        key: 'isIncluded',//
                        render:(h,params)=>{
                            return h('Select',{
                                    props:{
                                        value:this.tableData[params.index].isIncluded
                                    },
                                    style: {
                                        width:'90px'
                                    },
                                    on:{
                                        'on-change':(e)=>{
                                            console.log(e)
                                            params.row.isIncluded=e;
                                            this.tableData[params.index]=params.row
//                                            this.liabilityColumnsList[params.index].isIncluded = e.target.value;
                                        }
                                    }
                                },
                                this.isTrueList.map((item)=>{
                                    return h('Option',{
                                        props:{
                                            value:item.key,
                                            label:item.value,
                                        }
                                    })
                                }))
                        }
                    },
                    {
                        title: '免赔额',
                        width: 120,
                        align: 'center',
                        key: 'deductAmount',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value:this.tableData[params.index].deductAmount,
                                        placeholder:'请输入免赔额'
                                    },
                                    style: {
                                        width:'90px'
                                    },
                                    on: { input: (value) => {
                                        params.row.deductAmount=value;
                                        this.tableData[params.index]=params.row
                                    }
                                    }
                                },''),
                            ])
                        }
                    },
                    {
                        title: '免赔率',
                        width: 120,
                        align: 'center',
                        key: 'deductRate',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value:this.tableData[params.index].deductRate,
                                        placeholder:'请输入免赔率'
                                    },
                                    style: {
                                        width:'90px'
                                    },
                                    on: { input: (value) => {
                                        params.row.deductRate=value;
                                        this.tableData[params.index]=params.row
                                    }
                                    }
                                },''),
                            ])
                        }
                    },
                    {
                        title: '免赔策略',
                        width: 180,
                        align: 'center',
                        key: 'deductStrategy',
                        render:(h,params)=>{
                            return h('Select',{
                                    props:{
                                        value:this.tableData[params.index].deductStrategy,
                                    },
                                    style: {
                                        width:'150px'
                                    },
                                    on:{
                                        'on-change':(e)=>{
                                            params.row.deductStrategy=e;
                                            this.tableData[params.index]=params.row
                                        }
                                    }
                                },
                                this.strategyList.map((item)=>{
                                    return h('Option',{
                                        props:{
                                            value:item.key,
                                            label:item.value,
                                        }
                                    })
                                }))
                        }
                    },
                    {
                        title: '描述',
                        width: 200,
                        align: 'center',
                        key: 'description',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        value:this.tableData[params.index].description,
                                        placeholder:'请输入描述'
                                    },
                                    style: {
                                        width:'155px'
                                    },
                                    on: { input: (value) => {
                                        params.row.description=value;
                                        this.tableData[params.index]=params.row
                                    }
                                    }
                                },''),
                            ])
                        }
                    },

//                    {
//                        title: '扩展信息',
//                        width: 250,
//                        align: 'center',
//                        key: 'extendInfo'
//                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 140,
                        fixed:'right',
                        render: (h, params) => {
                            return h('div', [
//                                h('Button', {
//                                    props: {
//                                        type: 'primary',
//                                        size: 'small'
//                                    },
//                                    style: {
//                                        marginRight: '5px'
//                                    },
//                                    on: { click: () => {
//                                        this.addLiabilityTable(params.index)
////                                        console.log('length='+this.tableData.length)
//                                    }
//                                    }
//                                }, '增加'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
//                                        display:this.tableData.length==1? 'none':'inline-block'
                                    },
                                    on: { click: () => {
//                                        this.removeLiabilityTable(params.index)
                                        console.log('params.index.id='+params.index.id)
                                        this.$emit('onremove',params.index)
                                    }
                                    }
                                }, '删除'),
//                                h('Button', {
//                                    props: {
//                                        type: 'error',
//                                        size: 'small'
//                                    },
//                                    style: {
//                                        marginRight: '5px',
////                                        display:this.tableData.length==1? 'none':'inline-block'
//                                    },
//                                    on: { click: () => {
//                                    }
//                                    }
//                                }, '保存'),
                            ])
                        }
                    }
                ],
                liabilityForm:{
                    'planNo':'',
                    'itemNo':'',
                    'itemName':'',
                    'amount':'',
                    'premium':'',
                    'amountRate':'',
                    'isIncluded':1,

                    'perPersonAmount':'',
                    'perTimeAmount':'',
//                    'totalAmount':'',
                    'deductAmount':'',
                    'deductRate':'',
                    'deductStrategy':'1',
                    'description':'',
                },//责任form
                ruleValidateEditLiability:{
                    'itemNo':[{ required: true, message: '责任编号不能为空', trigger: 'change' }],
                    'itemName':[{ required: true, message: '责任名称不能为空', trigger: 'change' }],
                    'riskCategory':[{ required: true, message: '险类不能为空', pattern: /.+/,trigger: 'change' }],
                    'amount':[{ required: true, message: '保额不能为空且为数字', trigger: 'change',type: 'number'  }],
                    'premium':[{ required: true, message: '保费不能为空且为数字', trigger: 'change' ,type: 'number' }],
                    'amountRate':[{ required: true, message: '保费费率不能为空且为数字', trigger: 'change' ,type: 'number' }],
                    'perPersonAmount':[{ required: false, message: '每人保额上限只能输入数字', pattern:/^\d+$/,trigger: 'change' }],
                    'perTimeAmount':[{ required: false, message: '每次保额上限只能输入数字', pattern:/^\d+$/,trigger: 'change'}],
//                    'totalAmount':[{ required: true, message: '总保额不能为空且为数字', trigger: 'change' ,type: 'number' }],
                    'deductAmount':[{ required: false, message: '免赔额只能输入数字', pattern:/^\d+$/,trigger: 'change'}],
                    'deductRate':[{ required: false, message: '免赔率为0-1之间小数',pattern:/^(0|0\.\d+)$/, trigger: 'change'}],
                    'deductStrategy':[{ required: true, message: '免赔策略不能为空', pattern: /.+/,trigger: 'change'}],
                },//责任校验
                riskCategoryList:[
//                    {key:'1',value:'险类1'},
//                    {key:'2',value:'险类2'},
                ],
                strategyList:[  {key:1,value:'取免赔额和免赔高者'}],
                extendInputData:[],  //绑定用户在扩展表单输入的值
            };
        },
        methods: {
            addLiabilityTable(index){
                this.tableDataAddOne()
            },
            removeLiabilityTable(index){
//                return
//                if(this.tableData.length==1){
//                    return
//                }else {
//                    this.tableData.splice(0,1);
//                }
                this.tableData.splice(0,1);
            },
            tableDataAddOne(){
                console.log('push前='+ this.tableData.length)
                var obj={
                    "planNo": "",
                    "itemNo": "",
                    "itemName": "",
                    'riskTypeNo':'',
                    "clauseNo": "",
                    "mainSubFlag": '0',
                    "perPersonAmount": '',
                    "perTimeAmount": '',
                    "amount": '',
                    "premium": '',
                    "amountRate": '',
                    "isIncluded": '0',
                    "deductAmount": '',
                    "deductRate": '',
                    "deductStrategy": 1,
                    "description": '',
                    "extendInfo": null,
                };
                this.tableData.push(obj);
                console.log('push后='+ this.tableData.length)
                this.tableDataCopy=JSON.parse(JSON.stringify(this.tableData))
            },
            ajaxClauseQuery(){
                //  条款字典   可传空值查询所有条款或传值查某机构下条款
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/clauseDic';
                this.$http.post(url, {}).then(response => {
                    let res = response.data;
                    if (res.resCode == '0000') {
                        this.clauseList = res.data;
                    }
                })
            },
            ajaxRiskCategoryQuery(){
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/riskCategoryDic';
                this.$http.post(url, {}).then(response => {
                    let res = response.data;
                    console.log(res)
                    if (res.resCode == '0000') {
                        this.riskCategoryList = res.data;
                    }
                })
            },
            warnTip(t,i,content){
                this.$Modal.warning({
                    title: t,
                    content: '第'+(i+1)+'组-'+content
                });
            },
            verify(){
                for(let i=0;i<this.tableData.length;i++){
                    var regNum=/^\d+$/;
                    var regFloat=/^(0|0\.\d+)$/;
                    var that=this;
                    if(this.tableData[i].itemNo==''){
//                       this.$Message.error('第'+(i+1)+'组-责任编号不能为空');
                        this.warnTip('责任基本信息编辑-警告',i,'责任编号不能为空')
                        return false;
                    }
                    if(this.tableData[i].itemName==''){
                        this.warnTip('责任基本信息编辑-警告',i,'责任名称不能为空')
                        return false;
                    }
//                    if(this.tableData[i].riskTypeNo==''){
//                        this.warnTip('警告',i,'险类不能为空')
//                        return false;
//                    }
//                    if(this.tableData[i].clauseNo==''){
//                        this.warnTip('警告',i,'条款不能为空')
//                        return false;
//                    }
//                    if(this.tableData[i].amount==''){
//                        this.warnTip('警告',i,'保额不能为空')
//                        return false;
//                    }
//                    if(String(this.tableData[i].amount).match(regNum)==null){
//                        this.warnTip('责任基本信息编辑-警告',i,'保额必须为数字')
//                        return false;
//                    }
//                    if(this.tableData[i].premium==''){
//                        this.warnTip('警告',i,'保费不能为空')
//                        return false;
//                    }
//                    if(String(this.tableData[i].premium).match(regNum)==null){
//                        this.warnTip('责任基本信息编辑-警告',i,'保费必须为数字')
//                        return false;
//                    }
//                    if(this.tableData[i].amountRate==''){
//                        this.warnTip('警告',i,'保费费率不能为空')
//                        return false;
//                    }
//                    if(String(this.tableData[i].amountRate).match(regFloat)==null){
//                        this.warnTip('责任基本信息编辑-警告',i,'保费费率必须为0-1小数')
//                        return false;
//                    }
                }
            },
            error () {
                this.$Message.error('第'+(i+1)+'组-责任编号不能为空');
            },
        },
        mounted() {
            console.log('mounted tabledat0='+this.tableData.length)
//            if(this.tableData==null||this.tableData.length==0) {
//            this.tableDataAddOne()
//            }else {
//            }
            this.ajaxClauseQuery()
            this.ajaxRiskCategoryQuery()
        },
        computed: {},
    };

</script>

