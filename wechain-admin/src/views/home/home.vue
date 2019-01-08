<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <iCol :md="24" :lg="24">
                <Row :gutter="5">
                    <iCol :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.newContracts"
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="今日新增出单"
                        ></infor-card>
                    </iCol>
                    <iCol :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.newPremium"
                            iconType="ios-eye"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="今日新增保费（元）"
                        ></infor-card>
                    </iCol>
                    <iCol :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.allContracts"
                            iconType="upload"
                            color="#ffd572"
                            intro-text="总出单数"
                        ></infor-card>
                    </iCol>
                    <iCol :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.allPremium"
                            iconType="shuffle"
                            color="#f25e43"
                            intro-text="总保费收入（元）"
                        ></infor-card>
                    </iCol>
                </Row>
                <!--<Row>-->
                    <!--<Card :padding="0">-->
                        <!--<p slot="title" class="card-title">-->
                            <!--<Icon type="map"></Icon>-->
                            <!--各地区出单统计-->
                        <!--</p>-->
                        <!--<div class="map-con">-->
                            <!--<iCol span="10">-->
                                <!--<map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>-->
                            <!--</iCol>-->
                            <!--<iCol span="14" class="map-incon">-->
                                <!--<Row type="flex" justify="center" align="middle">-->
                                    <!--<home-map :city-data="cityData"></home-map>-->
                                <!--</Row>-->
                            <!--</iCol>-->
                        <!--</div>-->
                    <!--</Card>-->
                <!--</Row>-->
            </iCol>
        </Row>
<!--        <Row :gutter="10" class="margin-top-10">
            <iCol :md="24" :lg="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        平台保费统计
                    </p>
                    <div class="data-source-row">
                        <visite-volume></visite-volume>
                    </div>
                </Card>
            </iCol>
            <iCol :md="24" :lg="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        保险产品保费统计（按险类）
                    </p>
                    <div class="data-source-row">
                        <data-source-pie></data-source-pie>
                    </div>
                </Card>
            </iCol>
        </Row>-->
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title" style='height:32px; '>
                    <Icon type="ios-shuffle-strong"></Icon>
                    上周/上月每日保费规模(万)
                    <Select v-model="model1" style="width:200px;float: right" @on-change='selectChange'>
                        <Option v-for="item in premiumSelectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </p>

                <div class="line-chart-con">
                    <premium-requests ref='premiumSelectChart'></premium-requests>
                    <!--<service-requests></service-requests>-->
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import PremiumRequests from './components/PremiumRequests.vue';
// import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';
import Cookies from 'js-cookie';
// import axios from 'axios';
// import PremiumRequests from './components/PremiumRequests'

export default {
    name: 'home',
    components: {
        PremiumRequests,
        homeMap,
        dataSourcePie,
        visiteVolume,
        //        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem
    },
    data () {
        return {
            count: {
                newContracts: 0,
                newPremium: 0,
                allContracts: 0,
                allPremium: 0
            },
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: '',
            model1: '1',
            premiumSelectList: [
                {
                    value: '1',
                    label: '最近一周保费'
                },
                {
                    value: '2',
                    label: '最近一个月保费'
                }

            ]
            //            premiumData:[]
            //            times:[],
            //            premiums:[]
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        },

        getData () {
            let userId = Cookies.get('userId');
            //            let testURL='http://47.104.24.10:8767';
            let url = process.env.BASE_URL+process.env.commonPort+ '/cargo/queryDayAndAll';
            console.log('BASE_URL=' + url);
            this.$http.post(url, {'userId': userId}).then(response => {
                let res = response.data.data;
                this.count.newContracts = res.totalInfos.dayNums;
                this.count.newPremium = res.totalInfos.dayPremium;
                this.count.allContracts = res.totalInfos.nums;
                this.count.allPremium = res.totalInfos.premium;
            });
        },
        selectChange () {
            this.$refs.premiumSelectChart.getpremium(this.model1);
        }
    },
    created () {
        this.getData();
    }
};
</script>
