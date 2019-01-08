<style lang="less">
    @import './login.less';
    .paths{
        width: 130px; border-radius: 5px;  border: 1px solid #ccc; height:32px;float: right;cursor:pointer;margin-top: -31px;
    }
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <i-input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </i-input>
                        </FormItem>
                        <FormItem prop="password">
                            <i-input  type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                            </i-input>
                        </FormItem>
                        <FormItem prop="code">
                            <i-input type="text" v-model="form.code" placeholder="请输入验证码" style="width: 130px;">
                                <span slot="prepend">
                                    <Icon type="sad" :size="14"/>
                                </span>
                            </i-input>
                            <img :src="paths" title="换一张" class="paths" @click="switcher">
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    export default {
        data () {
            return {
                paths: '',
                form: {
                    userName: '',
                    password: '',
                    code: ''
                },
                rules: {
                    userName: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '验证码不能为空', trigger: 'blur' },
                        { validator:this.validatorFn,trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            validatorFn(rule, value, callback,source,options){
                if( value.length == 4 ){
                    let yan = source.code
                    let urls = process.env.BASE_URL+process.env.commonPort+ '/captcha/validate';
                    let pars = {code: yan};
                    this.$http.get(urls, {params: pars}).then(response => {
                        if( response.data.res == false ){
                            var errors = '验证码错误';
                            callback(errors)
                        }
                        callback()
                    })
                }
            },
            handleSubmit () {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        //判断验证码是否正确
                        let urls = process.env.BASE_URL+process.env.commonPort+ '/captcha/validate';
                        let pars = {code: this.form.code};
                         this.$http.get(urls, {params: pars}).then(response => {
                            if( response.data.res == false ){
                                this.$Message.error('验证码错误');
                            }
                            else{
                                //验证码正确 直接判断用户名 密码 就行
                                let formData = this.form;
                                let url = process.env.BASE_URL+process.env.commonPort+ '/ins/manage/userLogin';
                                 this.$http.post(url, formData)
                                    .then(response => {
                                        console.log(response)
                                        let res = response.data;
                                        if (res.resCode == '0000') {
                                            Cookies.set('user', this.form.userName);
//                                            Cookies.set('password', this.form.password);
                                            let role = parseInt(response.data.data.role);
                                            let id = parseInt(response.data.data.id);
                                            let platformNo = response.data.data.platformNo;// 平台存入cookie

                                            //新增
                                            let arr = response.data.data.permissions;
                                            let arr2 = [];
                                            let arr3 = [];
                                            for( let i=0;i<arr.length;i++ ){
                                                if( arr[i].pType == "menu" ){
                                                    arr2.push(arr[i].pCode);
                                                }
                                                if( arr[i].pType == "button" ){
                                                    arr3.push(arr[i]);
                                                }
                                            }
//                                            Cookies.set('access', arr2);
                                            localStorage.setItem('access',JSON.stringify(arr2))
                                            localStorage.setItem('buttonArr',JSON.stringify(arr3))
                                            if (response.data.data.platformNo == null) {
                                                platformNo = '';
                                            } else {
                                                platformNo = response.data.data.platformNo;
                                            }

                                            Cookies.set('role', role);
                                            Cookies.set('userId', id);// 存用户id
                                            Cookies.set('platformNo', platformNo);// 存用户平台

                                            this.$router.push({
                                                name: 'home_index'
                                            });
                                            this.$Message.success('登录成功');
                                        } else {
                                            this.$Message.error(response.data.resMsg);
                                            return;
                                        }

                                        console.log(response.data.data);
                                    })
                                    .catch(error => {
                                        //                                this.$Message.error('用户名与密码不匹配，不能访问!');
                                    });
                                this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                            }
                        })
                    }
                });
            },
            //点击验证码
            switcher () {
                this.paths = process.env.BASE_URL+process.env.commonPort+ '/captcha/getCaptcha?width=500&height=100&codeCount=4&times='+new Date().getTime();
            },
            //检验验证码
            checkouts () {
                let urls = process.env.BASE_URL+process.env.commonPort+ '/captcha/validate';
                let pars = {code: this.form.code};
                 this.$http.get(urls, {params: pars}).then(response => {
                    if( response.data.res == false ){
                        this.$Message.error('验证码错误');
                    }
                })
            }
        },
        mounted () {
            this.paths = process.env.BASE_URL+process.env.commonPort+ '/captcha/getCaptcha?width=500&height=100&codeCount=4&times='+new Date().getTime();
        }
    };
</script>

<style>

</style>
