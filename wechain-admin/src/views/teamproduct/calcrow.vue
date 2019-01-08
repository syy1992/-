<style lang="less">
    @import '../../styles/common.less';
    .cell{
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #000;
        border-top: 0px;
        border-right: 0px;
        color: rgb(71, 71, 71);
        font-size: 12px;
        .ivu-select{
            width: 50%;
        }
        .unit-cell{
            display: inline-block;
            width: 30%;
        }
    }
</style>

<template>
    <Row>
        <Col  class="cell" span="6">{{conf.insurName}}</Col>
        <Col  class="cell"  span="8">{{conf.duty}}</Col>
        <Col class="cell" span="6">
            <Select class="limit-select"   @on-change='selectLimitChange'>
                <Option v-for="(item,index) in conf.limit.limits" :value="item.value" :key="index">{{ item.name }}</Option>
            </Select>
            <div class="unit-cell">{{conf.limit.unit}}</div>                
        </Col>
        <Col class="cell" span="4">{{fee}}元</Col>
    </Row>
</template>

<script>
export default {
    name: 'calcrow',
    props: {
        attrs: Object
    },
    data: function () {
        return {
            fee: 0
        };
    },
    mounted: function () {

    },
    computed: {
        conf () {
            var defaultconf = {
                insurName: '',
                duty: '',
                limit: {
                    unit: '',
                    limits: [
                        {
                            name: '',
                            value: '',
                            price: ''
                        }
                    ]
                }
            };
            Object.assign(defaultconf, this.attrs);
            return defaultconf;
        }
    },
    methods: {
        selectLimitChange: function (item) {
            for (var i = 0; i < this.attrs.limit.limits.length; i++) {
                if (item == this.attrs.limit.limits[i].value) {
                    this.fee = this.attrs.limit.limits[i].price;
                    this.$emit('onlimitchange', parseFloat(this.fee));
                    break;
                }
            }
        }
    }
};
</script>

