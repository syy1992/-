<style lang="less">
    @import '../../styles/common.less';

    .team-insur-confirm{
        .planinfo{
            margin-bottom: 30px;
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
</style>

<template>
    <div class="team-insur-confirm">
        <Card>
            <p slot="title"  >
                <Icon type="ios-keypad"></Icon>{{planTitle}}                
            </p>
            <Row>
                <Col class="planinfo" span="6">
                    <span>起始时间:</span>
                    <DatePicker class="date-start-select" type="date"  placement="right-start"  v-model='startDate' placeholder="选择日期"></DatePicker>                    
                </Col>
                <Col class="planinfo" span="6">
                    <span>职业类别:</span>
                    <Select class="category-select"  v-model="category" >
                        <Option v-for="(item,index) in categoryList" :value="item.value" :key="index">{{ item.name }}</Option>
                    </Select>                    
                </Col>
            </Row>
            <Row>

            </Row>
            <Row class="table-head">
                <Col span="6" class="cell-head">保障险种</Col>
                <Col span="8" class="cell-head">保障责任</Col>
                <Col span="6" class="cell-head">保障额度</Col>
                <Col span="4" class="cell-head">人均保费</Col>
            </Row>
            <Row class="table-clacrow" v-for="(item ,index) in  somedata" :key="index" >
                <calcrow @onlimitchange=calcTotleFee :attrs="item" ref="calcrows"></calcrow>
            </Row>
            <Row class="rate-row">
                <Col span="6" class="cell-rate"></Col>
                <Col span="8" class="cell-rate"></Col>
                <Col span="6" class="cell-rate">加费比例:(加费比例需要在300%)</Col>
                <Col span="4" class="cell-rate">
                    <InputNumber :max="300" :min="1" style="width:80px" v-model="rate"  placeholder="请输入0-300区间的数字" @on-change=calcTotleFee></InputNumber>%
                </Col>
            </Row>
            <Row class="total-fee">
                <Col span="8" class="cell-rate"></Col>
                <Col span="6" class="cell-rate"></Col>
                <Col span="6" class="cell-rate">总保费:</Col>
                <Col span="4" class="cell-rate">{{totalFee}}元</Col>
            </Row>
        </Card>        
        <Card>
            <p slot="title"  >
                <Icon type="ios-keypad"></Icon>投保人信息               
            </p>
            <Row type="flex" justify="start" align="top">
                <Col span="6">                                          
                    <label>投保单位姓名:</label>                                                
                    <Input style="width:180px" placeholder="Enter something..." />                                            
                </Col>
                <Col span="6">                        
                    <label>证件类型:</label>                                                
                    <Select  style="width:180px" v-model="category" >
                        <Option v-for="(item,index) in categoryList" :value="item.value" :key="index">{{ item.name }}</Option>
                    </Select>                        
                </Col>
                <Col span="6">
                    <label>证件号码:</label>
                    <Input style="width:180px"  placeholder="Enter something..." />
                </Col>
            </Row>

        </Card>

        <Card>
            <p slot="title"  >
                <Icon type="ios-keypad"></Icon>企业联系人信息                
            </p>
            <Row type="flex" justify="start" align="top">
                <Col span="6">                                          
                    <label>企业联系人姓名:</label>                                                
                    <Input style="width:180px"  placeholder="Enter something..." />                                            
                </Col>
                <Col span="6">                        
                    <label>证件类型:</label>                                                
                    <Select  style="width:180px" v-model="category" >
                        <Option v-for="(item,index) in categoryList" :value="item.value" :key="index">{{ item.name }}</Option>
                    </Select>                        
                </Col>
                <Col span="6">
                    <label>证件号码:</label>
                    <Input style="width:180px"  placeholder="Enter something..." />
                </Col>
            </Row>
            <br>
            <Row type="flex" justify="start">
                <Col span="6">
                    <label>所     在    部    门:</label><Input style="width:180px"  placeholder="Enter something..." />                   
                </Col>
                <Col span="6">
                    <label>联系手机:</label><Input style="width:180px"  placeholder="Enter something..."  />                   
                </Col>  
                <Col span="6">
                    <label>联系邮箱:</label><Input style="width:180px" placeholder="Enter something..." />                   
                </Col>
            </Row>
            <Row class="button-row">
                <Button @click="submit_info"  type="info">确认无误去支付</Button>
            </Row>           
        </Card>

    </div>
</template>

<script>
    import calcrow from './calcrow.vue';
    export default {
        name: 'insur-apply',
        data () {
            return {
                planTitle: '',
                category: null, // 职业类别
                categoryList: [],
                startDate: '',
                rate: 0,
                // mock data
                somedata: [
                    {
                        insurName: '团体人身意外伤害险',
                        duty: '人身意外伤害--身故、残疾',
                        limit: {
                            unit: '万元',
                            limits: [
                                {
                                    name: '10',
                                    value: '111',
                                    price: '50.0'
                                },
                                {
                                    name: '20',
                                    value: '2222',
                                    price: '70.0'
                                }
                            ]
                        }
                    },
                    {
                        insurName: '团体住院津贴医疗保险',
                        duty: '意外住院津贴',
                        limit: {
                            unit: '万元',
                            limits: [
                                {
                                    name: '30',
                                    value: '333',
                                    price: '120.0'
                                }
                            ]
                        }
                    },
                    {
                        insurName: '团体人身意外伤害险',
                        duty: '人身意外伤害--身故、残疾',
                        limit: {
                            unit: '万元',
                            limits: [
                                {
                                    name: '10',
                                    value: '10',
                                    price: '50.0'
                                },
                                {
                                    name: '40',
                                    value: '44',
                                    price: '250.0'
                                }
                            ]
                        }
                    }
                ],
                totalFee: 0
            };
        },
        components: {
            calcrow
        },
        methods: {
            getData () {
                this.dataQuery();
            },
            selectPlatQuery () {
                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/common/platformDic';
                this.$http.post(url, {}).then(response => {
                    this.categoryList = response.data.data;
                });
            },
            calcTotleFee: function () {
                this.totalFee = 0;
                for (var i = 0; i < this.$refs.calcrows.length; i++) {
                    this.totalFee = this.totalFee + parseFloat(this.$refs['calcrows'][i].fee);
                }
                this.totalFee = (this.totalFee * (1 + (this.rate / 100))).toFixed(2);
            },
            resetTotalFee () {
                this.totalFee = 0;
            },
            submit_info () {
                this.$router.push({name: 'batchupload'});
            }
        },
        mounted () {
            this.planTitle = this.$route.params.planTitle || '';
            this.categoryList = this.$route.params.category || this.categoryList;
        }
    };
</script>
