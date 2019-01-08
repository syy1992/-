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
                        保费信息
                    </p>
                    <span style='font-size: 12px;margin-right:5px;' >选择日期:</span>
                    <DatePicker type="daterange"  placement="right-start"  v-model='dateRange' placeholder="选择日期" style="width: 200px" :split-panels='splitPanels'></DatePicker>
                    <span style='font-size: 12px;margin:0 5px;'>选择平台:</span>
                    <Select v-model="selectPlatModel" style="width:200px;">
                    <!--<Select v-model="selectPlatModel" style="width:200px;margin-top: 5px;" @on-change='selectPlatChange' >-->
                        <Option v-for="(item,index) in selectPlatList" :value="item.infoKey" :key="index">{{ item.infoValue }}</Option>
                    </Select>
                    <Button type='primary' @click='getDataQuery'>查询</Button>
                     <Row class="margin-top-10">
                            <Table :columns="premiumColumnsList" :data="premiumTableData" border></Table>
                     </Row>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="total" :current.sync="pageNum" :page-size="pageSize" showTotal @on-change="pageChange"></Page>
                        </div>
                    </div>
                </Card>
            </iCol>
        </Row>

    </div>
</template>

<script>
import canEditTable from '../common-components/canEditTable.vue';
import tableData from '../common-components/table_data.js';
import Cookies from 'js-cookie';
import format from '../../libs/format.js';
export default {
    name: 'premium',
    components: {
        canEditTable
    },
    data () {
        return {
            selectPlatModel:Cookies.get('platformNo'),
            selectPlatList: [],
            splitPanels:true,
            total: 0,
            pageNum: 1,
            pageSize: 10,
            premiumColumnsList: [
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '平台',
                    align: 'center',
                    key: 'platNo'
                },
                {
                    title: '总保费',
                    align: 'center',
                    key: 'sumPremium'
                },
                {
                    title: '手续费',
                    align: 'center',
                    key: 'sumServiceFee'
                }

            ],
            premiumTableData: [],
            userNo: Cookies.get('user'),
//            platformNo: Cookies.get('platformNo'),
            role: parseInt(Cookies.get('role')),
            dateRange: ''
        };
    },
    methods: {

        // 请求查询保费表
//        selectPlatChange(){
//            this.getDataQuery()
//        },
        selectPlatQuery(){
            let url =process.env.BASE_URL+process.env.commonPort+'/ins/common/platformDic';//
            this.$http.post(url,{}).then(response=>{
                this.selectPlatList= response.data.data;
            });
        },
        getDataQuery () {
            this.ajaxAccessQuery();
        },
        pageChange (index) {
            this.ajaxAccessQuery(null, index);
        },
        ajaxAccessQuery (event, pageIndex) {
            pageIndex = (pageIndex == undefined ? 1 : pageIndex);
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/queryPremiumAndFeePageQuery ';
//            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/queryPremiumAndFee ';
//            let platNo=this.selectPlatModel?this.selectPlatModel:''
            let params = {
                'platNo': this.selectPlatModel,
                'userNo': this.userNo,
                'pageIndex': pageIndex,
                'pageSize': this.pageSize
                //               "start":"",
                //               "end":"" ,
            };
            if (this.dateRange[0] != null && this.dateRange.length !== 0) {
                // 如果选定了日期
                params['start'] = this.dateRange[0].format('yyyy-MM-dd');
                params['end'] = this.dateRange[1].format('yyyy-MM-dd');
            }
            this.$http.post(url, params).then(response => {
                this.premiumTableData = response.data.data.result;
                this.pageNum = pageIndex;
                this.total = response.data.data.totalSize;
            });
        }

    },
    created () {
        this.ajaxAccessQuery();
        this.selectPlatQuery();
//        if(this.role<2){
//            this.selectPlatQuery();
//        }
    },
    mounted(){}
};
</script>
