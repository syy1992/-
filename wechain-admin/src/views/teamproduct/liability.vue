<style lang="less">
    @import '../../styles/common.less';
    span{display: inline-block;}
    .duty{
        border: 1px solid #ccc;
        width: 100%;
        padding: 15px;
    }
    .accidently{height: 72px;line-height: 45px; border-top: none;border-bottom: none;}

</style>

<template>
    <div>
        <Card>
            <Row>
                <Col span="8">
                    <span class="duty">保险责任</span>
                </Col>
                <Col span="8">
                    <span class="duty" style="border-left: none;border-right: none;">保障金额</span>
                </Col>
                <Col span="8">
                    <span class="duty">保障说明</span>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <span class="duty accidently">团体意外身故、残疾</span>
                </Col>
                <Col span="8">
                    <div class="duty" style="height: 72px;border:none">
                        <Select style="width:150px;">
                            <Option value="0">不投保</Option>
                            <Option value="1000000">1000000</Option>
                            <Option value="90000">90000</Option>
                            <Option value="80000">80000</Option>
                        </Select>
                    </div>
                </Col>
                <Col span="8">
                    <span class="duty" style="border-top: none;border-bottom: none;height: 72px;">国寿：1-2类，限额50万；3-5类，限额30万；阳光：4类职业限额60万；5类职业限额40万；6类职业限额30万;</span>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <span class="duty" style="height: 72px;line-height: 45px;border-bottom: none;">附加意外伤害医疗</span>
                </Col>
                <Col span="8">
                <div class="duty" style="height: 72px;border-left: none;border-right: none;">
                    <Select  style="width:150px; float: left;">
                        <Option value="0">不投保</Option>
                        <Option value="1000000">1000000</Option>
                        <Option value="90000">90000</Option>
                        <Option value="80000">80000</Option>
                    </Select>
                    <Select  style="width:150px; float: left;margin-left: 20px;">
                        <Option value="1">不投保</Option>
                        <Option value="2">1000000</Option>
                        <Option value="3">90000</Option>
                        <Option value="800400">80000</Option>
                    </Select>
                </div>

                </Col>
                <Col span="8">
                <span class="duty" style="border-bottom: none; height: 72px;">国寿：1-2类，限额50万；3-5类，限额30万；阳光：4类职业限额60万；5类职业限额40万；6类职业限额30万;</span>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <span class="duty" style="height: 72px;line-height: 45px;">附加意外伤害医疗</span>
                </Col>
                <Col span="8">
                <div class="duty" style="height: 72px;border-left: none;border-right: none;border-top: none;">
                    <Select  style="width:150px;" >
                        <Option value="0">不投保</Option>
                        <Option value="1000000">1000000</Option>
                        <Option value="90000">90000</Option>
                        <Option value="80000">80000</Option>
                    </Select>
                </div>
                </Col>
                <Col span="8">
                <span class="duty">国寿：1-2类，限额50万；3-5类，限额30万；阳光：4类职业限额60万；5类职业限额40万；6类职业限额30万;</span>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>

    export default {
        name: 'liability',
        data () {
            return {

            }
        },
        components: {

        },
        methods: {

        },
        mounted () {

        }
    };
</script>
