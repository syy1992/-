<style lang="less">
    @import '../../styles/common.less';
    @import '../common-components/table.less';
    .clearfix:after{visibility:hidden;display:block;font-size:0;content: " ";clear:both;height:0;}
    .clearfix{*zoom:1;}
    .img-ul li{float:left;width: 48%;margin: 0 1%;}
    .img-ul li img{/*max-height: 680px;*/max-width:100%;min-height: 500px;}
    .img-ul li p{text-align: center;padding: 5px 0;font-size: 13px;}
</style>

<template>
    <div>
        <Card>
            <p slot="title"  >
                <Icon type="ios-keypad"></Icon>
                合约信息
            </p>
            <Row style='margin-bottom:10px'>
                <iCol span="24" >
                    <span style='font-size: 12px;margin-right: 5px;' >支付状态:</span>
                    <Select v-model="selectPayStatusModel" style="width:150px;margin-top: 5px;" @on-change='selectPayStatusChange'>
                        <Option v-for="(item,index) in selectPayStatusList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>
                    </Select>
                    <span style='font-size: 12px;margin:0 5px;'>保单状态:</span>
                    <Select v-model="selectPolicyStatusModel" style="width:150px;margin-top: 5px;" @on-change='selectPolicyStatusChange'>
                        <Option v-for="(item,index) in selectPolicyStatusList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>
                    </Select>
                    <span style='font-size: 12px;margin:0 5px;' >选择平台:</span>
                    <Select v-model="selectPlatModel" style="width:200px;margin-top: 5px;" @on-change='selectPlatChange' >
                        <Option v-for="(item,index) in selectPlatList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>
                    </Select>
                    <span style='font-size: 12px;margin:0 5px;' >保单号:</span>
                    <Input style="width: 140px" placeholder='输入保单号' v-model='policyNo'> </Input>
                    <span style='font-size: 12px;margin:0 5px;'>选择日期:</span>
                    <DatePicker type="daterange"  placement="right-start"  v-model='dateRange' placeholder="选择日期" style="width: 200px" @on-change='dateChange' :split-panels='splitPanels'></DatePicker>
                    <Button type='primary' @click='searchClick'>查询</Button>
                    <div class="margin-bottom-10" style='float: right' v-show='applyListDown=="applyList-download"'>
                        <!-- <span>输入文件名：</span>
                         <Input v-model="excelFileName" icon="document" placeholder="请输入文件名" style="width: 190px" />-->
                        <a id="hrefToExportTable"  target="_blank"></a>
                        <Button type="primary"  @click="exportExcel">下载表格数据</Button>
                    </div>
                    <div class="margin-bottom-10" style='float: right;margin-right: 10px' v-show='applyListDownEx=="applyList-download-ex"'>
                        <a target="_blank"></a>
                        <Button type="primary"  @click="getFormInfo2">下载展会表格数据</Button>
                    </div>
                </iCol>
            </Row>

            <Row class="margin-top-10">
                <h4 slot="title">
                    <Icon type="android-archive"></Icon>
                </h4>
                <Table :columns="columnsList" :data="tableData" border size="small"  ref="tableExcel"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="total" :current.sync="pageNum" :page-size="pageSize" showTotal @on-change="pageChange"></Page>
                    </div>
                </div>
            </Row>

        </Card>
        <Modal width="1000"  title="图片显示" v-model="isShowPic">
            <ul class='clearfix img-ul' >
                <li v-for='(item,index) in imgList'>
                    <p>图片{{index+1}}</p>
                    <img :src='item' >
                </li>
            </ul>
        </Modal>
    </div>
</template>

<script>
    //    import {tableData,applyTableColumns } from '../common-components/table_data.js';
//    import table2excel from './table2excel.js';
    import Cookies from 'js-cookie';
    import format from '../../libs/format.js';
    export default {
        name: 'apply-list',
        data() {
            return {
                splitPanels:true,
                imgList:[],
                selectPlatModel:'',
                selectPayStatusModel:'1',
                selectPolicyStatusModel:'2',

                selectPlatList: [],
                selectPayStatusList: [{infoKey:'0',infoValue:'未支付'},{infoKey:'1',infoValue: '支付成功'},{infoKey:'2',infoValue: '支付失败'}],
                selectPolicyStatusList: [/*{infoKey:'',infoValue:''},*/{infoKey:'0',infoValue:'投保失败'},{infoKey:'1',infoValue: '已投保'},{infoKey:'2',infoValue: '已承保'},{infoKey:'3',infoValue: '已退保'}],//展示全部
                columnsList:[
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center',
                        fixed: 'left'
                    },
                    // {
                    //     title: '业务流水号',
                    //     align: 'center',
                    //     key: 'reqNo'
                    // },
                    {
                        title: '保单号',
                        align: 'center',
                        key: 'policyNo',
                        width: 200
                    },
                    {
                        title: '投保单号',
                        align: 'center',
                        key: 'reqNo',
                        width: 200
                    },
//                    {
//                        title: '业务员姓名',
//                        align: 'center',
//                        key: 'salesmanName'
//                    },
                    {
                        title: '业务员编号',
                        align: 'center',
                        key: 'salesmanNo',
                        width: 120
                    },
//                    {
//                        title: '业务员手机号(编号)',
//                        align: 'center',
//                        key: 'salesmanPhone'
//                    },
                    {
                        title: '投保人名称',
                        align: 'center',
                        key: 'applicantName',
                        width: 150
                    },
                    {
                        title: '被保人名称',
                        align: 'center',
                        key: 'insuredName',
                        width: 150
                    },
                    {
                        title: '产品方案',
                        align: 'center',
                        key: 'planName',
                        width: 180
                    },
                    {
                        title: '保费(元)',
                        align: 'center',
                        key: 'premium',
                        width: 100
                    },
                    // {
                    //     title: '保险公司',
                    //     align: 'center',
                    //     key: 'institName'
                    // },
                    {
                        title: '平台名称',
                        align: 'center',
                        key: 'platformName',
                        width: 120
                    },
                    {
                        title: '渠道名称',
                        align: 'center',
                        key: 'channelName',
                        width: 120
                    },
                    {
                        title: '渠道编号',
                        align: 'center',
                        key: 'channelNo',
                        width: 120
                    },
                    {
                        title: '保单状态',
                        align: 'center',
                        key: 'policyStatus',
                        width: 100
                    },
                    {
                        title: '支付状态',
                        align: 'center',
                        key: 'payStatus',
                        width: 100
                    },
                    {
                        title: '投保时间',
                        align: 'center',
                        key: 'createTime',
                        width: 100
                    },
                    {
                        title: '起保时间',
                        align: 'center',
                        key: 'startTime',
                        width: 100
                    },
                    {
                        title: '终保时间',
                        align: 'center',
                        key: 'endTime',
                        width: 100
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 120,
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display:(params.row.picNames==null)?"none":"inline-block",
                                    },
                                    on: { click: () => {
                                        this.showPicModal(params.index)
                                    }
                                    }
                                }, '查看图像'),

                            ])
                        }
                    }
                ],
                policyNo:'',
                isShowPic:false,
                tableData: [],
                total: 0,
                pageNum: 1,
                pageSize:10,
                /*    excelFileName: '',*/
                tableExcel: {},
                dateRange:"",
                userName: Cookies.get('user'),
                userId: Cookies.get('userId'),
                startDate:'',
                endDate:'',
                access: /*Cookies.get('access'),*/localStorage.getItem('access'),
                applyListDown:'',
                applyListDownEx:''
            };
        },
        methods: {
            getbutton(){
                let buttonList=JSON.parse(localStorage.getItem('buttonArr'));
                buttonList.forEach((item, index, arr)=> {
                    if (buttonList[index]['pCode']=='applyList-download') {
                       this.applyListDown='applyList-download'
                    }
                    if(buttonList[index]['pCode']=='applyList-download-ex'){
                        this.applyListDownEx='applyList-download-ex'
                    }
                })
            },

            getData() {
//                this.tableData=[];
                this.dataQuery()
            },
            pageChange(index){
                this.dataQuery(index)
            },
            dateChange(e){
                console.log(this.dateRange)
                console.log(this.dateRange.length)
            },
            searchClick(event){
                this.dataQuery()
            },
            dataQuery(pageIndex){
                pageIndex=(pageIndex==undefined ?1:pageIndex);
                let url =process.env.BASE_URL+process.env.commonPort+'/cargo/query';
                let params= {
//                    'userId': this.userId,
                    'pageIndex': pageIndex,
                    'pageSize': 10,
                    "platformNo":this.selectPlatModel,
                    "policyStatus":this.selectPolicyStatusModel,
                    "payStatus":this.selectPayStatusModel,
                    "policyNo":this.policyNo
                }

                if(this.dateRange[0]!=null&&this.dateRange.length!==0) {
                    //如果选定了日期
                    params["startDateStr"]=this.dateRange[0].format("yyyy-MM-dd");
                    params["endDateStr"]=this.dateRange[1].format("yyyy-MM-dd");
                }

                this.$http.post(url, params).then(response => {
                    let res = response.data.data;
//                    console.log(response.data)
                    this.tableData=res.result;
                    for( let i=0;i<res.result.length;i++ ) {
                        for (let j in this.selectPolicyStatusList) {
                            if (res.result[i].policyStatus == this.selectPolicyStatusList[j].infoKey) {
                                res.result[i].policyStatus = this.selectPolicyStatusList[j].infoValue
                            }
                        }
                        for (let j in this.selectPayStatusList) {
                            if (res.result[i].payStatus == this.selectPayStatusList[j].infoKey) {
                                res.result[i].payStatus = this.selectPayStatusList[j].infoValue
                            }
                        }
                    }

                    //读取分页信息
                    //由于后端返回的res.currentPageNo数值不正确（始终为1），因此临时改为取上传的pageIndex参数，作为当前页码
//                    this.pageNum=res.currentPageNo;
                    this.pageNum=pageIndex;
                    this.total=res.totalSize;
                })

            },
            selectPlatQuery(){
                let url =process.env.BASE_URL+process.env.commonPort+'/ins/common/platformDic';//
                this.$http.post(url,{}).then(response=>{
                    this.selectPlatList= response.data.data;
                });
            },
            selectPlatChange(){
                this.dataQuery()
            },
            selectPayStatusChange(){
                this.dataQuery()
            },
            selectPolicyStatusChange(){
                this.dataQuery()
            },
            showPicModal(index){
                console.log(index)
                this.imgList=[];
                this.isShowPic = true;
                let picNames= this.tableData[index].picNames
                if(picNames==null||picNames==''||picNames==undefined){
                    return ;
                }else{
                    let arr = picNames.split('|');
                    for (let i = 0; i < arr.length; i++) {
                        let pic = arr[i];
                        let imgUrl=process.env.newUrl+'/images/insurance-upload-files/' + pic;
                        this.imgList.push(imgUrl)
                    }
                }
            },
            formPost(url,params) {
                //参考：JS动态创建from表单 - CSDN博客  https://blog.csdn.net/cai_eternal/article/details/53454914
                var turnForm = document.createElement("form");
                //一定要加入到body中
                document.body.appendChild(turnForm);
                turnForm.method = 'post';
                turnForm.action = url;
                /* turnForm.target = '_blank';*/

                for (var key in params) {
                    var value=params[key];
                    //创建若干隐藏表单域
                    var newElement = document.createElement("input");
                    newElement.setAttribute("name",key);
                    newElement.setAttribute("value",value);
                    newElement.setAttribute("type","hidden");
                    turnForm.appendChild(newElement);
                }
                turnForm.submit();
            },
            exportExcel() {
                /* table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.excelFileName);*/
                let url =process.env.BASE_URL+process.env.commonPort+'/ins/common/checkExcelDownload'; //验证有没有权限
                this.$http.get(url,{}).then(res=>{
                    if(res.data.resCode=='0000'){
                        this.getFormInfo()
                    }
                }).catch(error => {
                    console.log('error=' + error);
                });
            },
            getFormInfo(){
                let copyColumnsList = JSON.parse(JSON.stringify(this.columnsList))
                let arrDataHeader = [];
                let arrDataField = [];
                for (let i = 0; i < copyColumnsList.length; i++) {
                    arrDataHeader.push(copyColumnsList[i].title)
                    arrDataField.push(copyColumnsList[i].key)
                }
                arrDataHeader=this.truncate(arrDataHeader).toString()
                arrDataField=this.truncate(arrDataField).toString()
                console.log('arrDataHeader='+typeof arrDataHeader)
                console.log('arrDataField='+arrDataField)
                let form = {
                    "header": arrDataHeader,
                    "field": arrDataField,
                    "userId":this.userId,
                };
                let url=process.env.BASE_URL+process.env.commonPort+'/ins/common/contractToExcel';
                this.formPost(url, form)
            },
            getFormInfo2(){
                let copyColumnsList = JSON.parse(JSON.stringify(this.columnsList))
                let arrDataHeader = [];
                let arrDataField = [];
                for (let i = 0; i < copyColumnsList.length; i++) {
                    arrDataHeader.push(copyColumnsList[i].title)
                    arrDataField.push(copyColumnsList[i].key)
                }
                arrDataHeader=this.truncate(arrDataHeader).toString()
                arrDataField=this.truncate(arrDataField).toString()
                console.log('arrDataHeader='+typeof arrDataHeader)
                console.log('arrDataField='+arrDataField)
                let form = {
                    "header": arrDataHeader,
                    "field": arrDataField,
                    "userId":this.userId,
                };
                let url=process.env.BASE_URL+process.env.commonPort+'/ins/common/exhibitToExcel';
                this.formPost(url, form)
            },
            truncate(arr) {
                var newArr = arr.join().split(',');    //join后再拆分为新数组
                newArr.pop();
                newArr.splice(0,1);
                return newArr;
            },
        },
        mounted() {
            this.getbutton()
            this.getData();
            this.selectPlatQuery();
        }
    };
</script>
