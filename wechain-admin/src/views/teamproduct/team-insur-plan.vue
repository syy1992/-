<style lang="less">
    @import '../../styles/common.less'; 
    .team-insur-plan{
        .plan{
            text-align: center;
            padding-top: 40px;
            font-size: 14px;
            .plan-title{
                font-size: 26px;
            }
            .plan-logo{
                margin: 30px;
            }
            .plan-info{
                
            }
            .files{                 
                margin-top: 20px;
                font-size: 10px;
                .file-item{
                    display: inline-block;
                    height: 16px;                    
                    line-height: 16px;
                    margin-right: 8px;                    
                }
                img{
                    width: 16px;
                    height: 16px;
                    vertical-align: bottom;
                }
            }
            .plan-buy{
                background-color: transparent;
                border: 1px solid;                
                border-radius:5px;
                width: 200px;
                height: 40px;             
                line-height: 100%;
                margin-top: 40px;
                &.plan-buy-A{
                    color: #2db7f5;
                    border-color: #2db7f5;
                }
                &.plan-buy-B{
                    color: #e98f36;
                    border-color: #e98f36;
                }
            }
        }
    }   
</style>

<template>
    <div class="team-insur-plan">    
        <Row>
            <Col span="8">
                <Card>
                    <p slot="title" style="text-align: center;font-size: 16px;" @click="applyInsurA">欧洲签证专用方案</p>
                    <div style="width: 120px;height: 120px;margin: 0 auto 0;" @click="applyInsurA">
                        <img @click="applyInsurA" src="https://a2cdn3.8686c.com/images/v2/Face1.png">
                    </div>
                </Card>
            </Col>
            <Col span="8">
                <Card>
                    <p slot="title" style="text-align: center;font-size: 16px;" @click="applyInsurB">驾校学员综合保险方案</p>
                    <div style="width: 120px;height: 120px;margin: 0 auto 0;" @click="applyInsurB">
                        <img @click="applyInsurB" src="https://a2cdn3.8686c.com/images/v2/Face3.png">
                    </div>
                </Card>
            </Col>
            <Col span="8">
            <Card>
                <p slot="title" style="text-align: center;font-size: 16px;" @click="applyInsurC">团意险</p>
                <div style="width: 120px;height: 120px;margin: 0 auto 0;" @click="applyInsurC">
                    <img @click="applyInsurC" src="https://a2cdn3.8686c.com/images/v2/Face.png">
                </div>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: 'team-insur-plan',
        methods: {
            applyInsurA  () {
                this.$router.push({
                    name: 'team-insur-apply'
                });
            },
            applyInsurB  () {
                this.$router.push({
                    name: 'team-insur-driving'
                })
            },
            applyInsurC () {
                this.$router.push({
                    name: 'team-insur-group'
                })
            }
        }
    };
</script>
