<style lang="less">
    @import '../../styles/common.less';
    span{
        display: inline-block;}
    .tuan_info_tit{
        display: inline-block;
        color: #999;
        width: 100px;
        margin-bottom: 10px;
        font-size: 14px;
    }
    .tuan_info_des{
        color: #333;
        font-size: 14px;
    }
    .table-clacrow{
        border-right: 1px solid #000;
        border-top: 1px solid #000;
    }
</style>

<template>
    <div>
        <Form ref="formValidate" :model="formInline" :rules="ruleValidate">
            <Card>
                <p slot="title">
                    <Icon type="ios-keypad"></Icon>
                    团意险介绍
                </p>
                <Row>
                    <Col span="8">
                    <span class="tuan_info_tit">产品优势</span>
                    <span class="tuan_info_des">大品牌，费率低 </span>
                    </Col>
                    <Col span="8">
                    <span class="tuan_info_tit">职业类别</span>
                    <span class="tuan_info_des">1-5类 </span>
                    </Col>
                    <Col span="8">
                    <span class="tuan_info_tit">医疗赔付比例</span>
                    <span class="tuan_info_des">扣100元，80%给付</span>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <span class="tuan_info_tit">投保年龄</span>
                    <span class="tuan_info_des">18-65周岁</span>
                    </Col>
                    <Col span="8">
                    <span class="tuan_info_tit">投保人数</span>
                    <span class="tuan_info_des">5-500人</span>
                    </Col>
                    <Col span="8">
                    <span class="tuan_info_tit">残疾给付标准</span>
                    <span class="tuan_info_des">行业标准1-10级</span>
                    </Col>
                </Row>
            </Card>

            <Card style="margin: 5px 0">
                <p slot="title">
                    <Icon type="ios-keypad"></Icon>
                    批量询价
                </p>
                <Row>
                    <Col span="24">
                    <span>选择职业类别</span>
                    <Select v-model="formInline.career" style="width: 250px" @on-change='clickOne($event)'>
                        <Option v-for="(item,index) in showCareer1" :key="index" :value="index">{{item.des}}</Option>
                    </Select>

                    <Select v-model="formInline.careerTwo" style="width: 250px" v-show="carTwoIsShow" @on-change="clickTwo($event)">
                        <Option v-for="(item,index) in showCareer2" :key="item.des" :value="index">{{ item.des }}</Option>
                    </Select>

                    <Select v-model="formInline.careerThree" style="width: 250px"  v-show="carThreeIsShow">
                        <Option v-for="(item,index) in showProfessionListThree" :key="item.code" :value="item.code">{{item.des}}</Option>
                    </Select>
                    </Col>
                </Row>

                <Row>
                    <Col span="24" style="margin: 15px 0;">
                        <span>选择投保区域</span>

                        <Select v-model="formInline.area1" style="width: 250px" @on-change='areaOne($event)'>
                            <Option v-for="(item,index) in showAreaOne" :key="index" :value="index">{{item.name}}</Option>
                        </Select>

                        <Select v-model="formInline.area2" style="width: 250px" @on-change="areaTwo($event)" v-show="area2IsShow">
                            <Option v-for="(item,index) in showAreaTwo" :key="item.name" :value="index">{{ item.name }}</Option>
                        </Select>

                        <Select v-model="formInline.area3" style="width: 250px" v-show="area3IsShow">
                            <Option v-for="(item,index) in showAreaThree" :key="item.id" :value="item.id" >{{ item.name }}</Option>
                        </Select>

                    </Col>
                </Row>

                <Row>
                    <Col span="8" style="margin-bottom: 15px;">
                        <span>输入投保人数</span>
                        <Input v-model="formInline.contactName" placeholder="请输入大于0小于1000的整数" style="width: 250px" />人
                    </Col>
                </Row>

                <!--表格-->
                <liability></liability>

            </Card>
        </Form>
    </div>
</template>

<script>
    import careerData from '../../libs/getProfessionList.js';   //职业
    import AreaData from '../../libs/area.js';                   //地区
    import liability from './liability';

    export default {
        name: 'team-insur-group',
        data () {
            return {
                carTwoIsShow: false,
                carThreeIsShow: false,
                area2IsShow: false,
                showCareer1: [],
                showCareer2: [],
                showProfessionListThree: [],
                showAreaOne: [],
                showAreaTwo: [],
                showAreaThree: [],
                professionList: [],
                area3IsShow: false,
                shu: [],
                quyu: [],
                formInline: {
                    career: '',
                    careerTwo: '',
                    careerThree: '',
                    area1: '',
                    area2: '',
                    area3: '',
                    contactName: ''
                },
                ruleValidate: {

                },
            };
        },
        components: {
            liability
        },
        methods: {
            //第一个职业类别改变
            clickOne (event) {
                this.shu = careerData.data.professionList[event]['children'];
                this.formInline.careerTwo = '';   //清空第二个
                this.formInline.careerThree = ''; //清空第三个
                this.showCareer2 = this.shu;
                this.carTwoIsShow = true;   //让第二个显示
                this.carThreeIsShow = false;   //让第三个隐藏
            },
            //第二个职业类别改变
            clickTwo (event) {
                if( event !== '' && event !== null && event !== undefined ){
                    this.formInline.careerThree = '';   //清空第三个
                    this.showProfessionListThree = this.shu[event].children;
                    this.carThreeIsShow = true;
                }
            },

            //第一个地区改变
            areaOne (event) {
                this.formInline.area2 = '';   //清空第二个
                this.formInline.area3 = '';   //清空第三个
                this.area2IsShow = true;      //让第二个显示
                this.area3IsShow = false;     //让第三个隐藏
                this.quyu = AreaData.data.professionList[event].city;
                this.showAreaTwo = this.quyu;
            },
            //第二个地区改变
            areaTwo (event) {
                if( event !== '' && event !== null && event !== undefined ){
                    this.formInline.area3 = '';   //清空第三个
                    this.showAreaThree = this.quyu[event].district;
                    this.area3IsShow = true;      //让第三个显示
                }
            }
        },
        mounted () {
            console.log(careerData)
            this.showCareer1 = careerData.data.professionList;   //职业
            this.showAreaOne = AreaData.data.professionList;     //地区
        }
    };
</script>
