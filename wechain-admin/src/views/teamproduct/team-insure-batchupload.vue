<style lang="less">
    @import '../../styles/common.less';
    @import '../common-components/table.less';
        .button-row{
            text-align: center;
            margin-top: 20px;
            button{
                width: 260px;
            }
        }
</style>

<template>
    <div>
        <Row class="">
            <Col span="24" class="padding-left-10">
                <Card>
                    <Steps :current="3">                        
                        <Step  style="cursor:pointer;" title="下载名单模板" icon="ios-cloud-download" content="点击被保人名单模板下载" @click.native="download_tpl"></Step>
                        <Step title="填写模板" icon="md-list" content="被保人名单样例" ></Step>
                        <Step style="cursor:pointer;" title="上传名单" icon="ios-cloud-upload" content="点击上传名单" @click.native="upload_tpl"></Step>
                    </Steps>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span="24" class="padding-left-10">
            <Card>
                <div>
                    <Table :columns="userColumnsList" :data="userTableData"></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="total" :current.sync="pageNum" :page-size="pageSize" showTotal @on-change="pageChange"></Page>
                        </div>
                    </div>
                </div>
                <Row class="button-row">
                    <Button @click="submit_info"  type="info">提交</Button>
                </Row> 
            </Card>

            </Col>
        </Row>

    </div>
</template>

<script>
    export default {
        name: 'insur-batchupdload',
        data () {
            return {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                userColumnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '证件类型',
                        align: 'center',
                        key: 'planNo'
                    },
                    {
                        title: '证件号码',
                        align: 'center',
                        key: 'insPlanNo'
                    },
                    {
                        title: '出生日期',
                        align: 'center',
                        key: 'institNo'
                    },
                    {
                        title: '性别',
                        align: 'center',
                        key: 'discountRate'
                    },
                    {
                        title: '手机号码',
                        align: 'center',
                        key: 'maxNum'
                    },
                    {
                        title: '邮箱',
                        align: 'center',
                        key: 'period'
                    },
                    {
                        title: '保费',
                        align: 'center',
                        key: 'isQuotaScheme'
                    }
                ],
                userTableData: []
    
            };
        },
        methods: {
            // 查询方案请求
            getData () {
                this.ajaxPlanQuery();
            },
            ajaxPlanQuery (event, pageIndex) {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/insPlanPageQuery';
                pageIndex = (pageIndex == undefined ? 1 : pageIndex);
                let params = {'pageIndex': pageIndex};
                this.$http.post(url, params).then(response => {
                    let res = response.data.data;
                    // this.userTableData=res.result;
                    this.pageNum = pageIndex;
                    this.total = res.totalSize;
                });
            },
            pageChange (index) {
                this.ajaxPlanQuery(null, index);
            },
            download_tpl () {
                alert(1);
            },
            upload_tpl () {
                alert(2);
            },
            submit_info () {
                this.$router.push({
                    name: 'team-insur-confirm'
                });
            }

        },
        mounted () {
            this.getData();
        }
    };
</script>
