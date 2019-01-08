<style lang="less">
    @import '../../styles/common.less';
    @import '../common-components/table.less';
    .clearfix:before,.clearfix:after {
        content: "";
        display: block;
        clear: both;
    }

    .clearfix {
        zoom: 1;
    }
</style>
<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="android-contact"></Icon>
                 账号设置
            </p>
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80" style='width: 500px;text-align:center; margin: auto;' >
                <FormItem label="原密码：" >
                    <Input type="password"  placeholder='原密码' value='pass'></Input>
                </FormItem>
                <FormItem label="新密码：" prop="passwd"  clearable>
                    <Input type="password" v-model="formCustom.passwd" placeholder='请输入登录密码' clearable></Input>
                </FormItem>
                <FormItem label="确认密码：" prop="passwdCheck">
                    <Input type="password" v-model="formCustom.passwdCheck" placeholder='请确认登录密码' clearable></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
                    <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>

        </Card>
    </div>
</template>
<script>
    import canEditTable from '../common-components/canEditTable.vue';
    export default {
        name: 'user-list',
        components: {
            canEditTable
        },
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次输入的密码不匹配!'));
                } else {
                    callback();
                }
            };

            return {
                formCustom: {
                    passwd: '',
                    passwdCheck: ''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    };
</script>

