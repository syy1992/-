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
</style>

<template>
    <div>

        <Card  class="margin-top-10">

            <p slot="title">
                <Icon type="ios-keypad"></Icon>
                报表数据
            </p>

            <Row style="margin: 5px;">
                <Col span="24">
                    <span>合作平台：</span>

                    <Checkbox
                            :indeterminate="indeterminate"
                            :value="checkAll"
                            @click.prevent.native="handleCheckAll">全部</Checkbox>
                    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" style="margin-top: 10px;">
                        <Checkbox v-for="(item,key) in selectProductList" :key="key" :label="item.infoKey">
                            <span>{{item.infoValue}}</span>
                        </Checkbox>
                    </CheckboxGroup>

                </Col>
            </Row>

            <Row style="margin-top: 20px;">
                <Col span="24">
                    <span>统计时间</span>
                    <DatePicker type="daterange"  placement="right-start"  v-model='dateRange' placeholder="选择日期" style="width: 200px" @on-change='dateChange'></DatePicker>
                    <Button type="primary" @click="create" style="margin-left: 20px;">生成报表</Button>
                </Col>

            </Row>

            <premium style="height: 400px;" :startTime="startTime" :endTime="endTime" :recognizee="recognizee" ref="premium"></premium>

            <Table border :columns="columns1" :data="data1"></Table>

        </Card>

    </div>
</template>

<script>
    import premium from './components/premium.vue';
    export default {
        name: 'report_forms',
        data () {
            return {
                product: '',
                selectProductList: [],   //平台名称
                dateRange: '',
                startTime: '',
                endTime: '',
                indeterminate: false,
                checkAll: true,
                checkAllGroup: [],
                columns1: [
                    {
                        title: '平台名称',
                        align: 'center',
                        key: 'platName'
                    },
                    {
                        title: '保费',
                        align: 'center',
                        key: 'premiumSum'
                    },
                    {
                        title: '件数',
                        align: 'center',
                        key: 'pieceNum'
                    },
                    /*{
                        title: '件均保费',
                        align: 'center',
                        key: 'address'
                    },
                    {
                        title: '保额',
                        align: 'center',
                        key: 'address'
                    },
                    {
                        title: '客户数',
                        align: 'center',
                        key: 'customerNum'
                    }*/
                ],
                data1: [],
                values: [],
                recognizee: {},
                rec: []
            };
        },
        components: {
            premium
        },
        methods: {
            //公共的
            communal () {
                let urlss = process.env.BASE_URL+process.env.commonPort+'/report/plat_stats';
                let param = {
                    "startDate": '',
                    "endDate": '',
                    "platNos": this.recognizee
                }
                this.$http.post(urlss,param).then(response=>{
                    let res = response.data.data.platStatsList;
                    for( let i=0;i<res.length;i++ ){
                        if( res[i].premiumSum == '' || res[i].premiumSum == null || res[i].premiumSum == undefined ){
                            res.splice(i,1)   //删除下标为i 长度为1
                        }
                    }
                    this.data1 = res;
                })
            },

            //点击全选时
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    //把合作平台的key值给放到 checkAllGroup 中
                    let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/platformDic';
                    this.$http.post(url,{}).then(response=>{
                        console.log(response)
                        let terrace;
                        terrace = response.data.data;
                        let a;
                        for( let i in terrace ){
                            a = terrace[i].infoKey;
                            this.checkAllGroup.push(a)
                        }
                    })
                    this.$refs.premium.drawLine('', '', this.recognizee);      //父级触发子级的方法
                    this.communal();

                } else {
                    this.checkAllGroup = [];
                    //清空数据
                    this.$refs.premium.drawLine('', '', '');   //折线图
                    this.data1 = [];

                }
            },

            //时间改变时
            dateChange (e) {
                this.startTime = e[0];
                this.endTime = e[1];
            },

            //点击生成报表
            create () {
                let pp = [];
                let j;
                let g;
                let p = {}

                for( let i=0;i<this.checkAllGroup.length;i++ ){
                    j = "platNo"+(i+1);
                    g = this.checkAllGroup[i];
                    p[j] = g
                    pp.push(p)
                }

                let url = process.env.BASE_URL +process.env.commonPort+ '/report/plat_stats';
                this.$http.post(url,{startDate: this.startTime, endDate: this.endTime,'platNos': pp[0]}).then(response => {
                    let res = response.data.data.platStatsList;
                    for( let i=0;i<res.length;i++ ){
                        if( res[i].premiumSum == '' || res[i].premiumSum == null || res[i].premiumSum == undefined ){
                            res.splice(i,1)
                        }
                    }
                    this.data1 = res;
                })
                this.$refs.premium.drawLine(this.startTime,this.endTime,pp[0]);   //父组件调用子组件的方法 并传参
            },

            //状态改变时触发
            checkAllGroupChange (data) {
                console.log(data)
                if (data.length == this.selectProductList.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
                this.checkAllGroup = data;   //把选中的 key 放到 checkAllGroup
            }

        },
        mounted () {
            //获取合作平台
            let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/platformDic';
            this.$http.post(url,{}).then(response=>{
                this.selectProductList = response.data.data;
                let infok;
                //让所有的平台选中
                for( let i in this.selectProductList ){
                    infok = this.selectProductList[i].infoKey;
                    this.checkAllGroup.push(infok)
                }

                let params = {
                    "platNos":{}
                };
                let recognize=[];
                let j;
                let g;
                let p = {};
                for( let i=0;i<this.checkAllGroup.length;i++ ){
                    j =  "platNo"+(i+1);
                    g = this.checkAllGroup[i];
                    p[j] = g
                    recognize.push(p)
                }

                this.recognizee = recognize[0];

                this.$refs.premium.drawLine('', '', recognize[0])      //父级触发子级的方法 并传参
                this.communal()
            })
        }
    };
</script>
