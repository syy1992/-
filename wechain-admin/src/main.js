import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from './libs/util';
import {Message} from 'iview'

import Cookies from 'js-cookie';

import axios from 'axios';
Vue.prototype.$http = axios;


Vue.use(VueI18n);
Vue.use(iView);




new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // 检查更新
        util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});


Vue.prototype.$Message = Message;
// 创建axios实例
// axios.create({
//     timeout: 1000 * 30,
//     withCredentials: true,
//     headers: { }
// });

// request拦截器
axios.interceptors.request.use(config => {
    // config.headers['Authorization'] = Cookies.get('token');
    config.withCredentials = true;
    return config;
}, error => {
    return Promise.reject(error);
});

// response拦截器
axios.interceptors.response.use(response => {
    // console.log('response='+JSON.stringify(response));

    if (response.data.resCode== "9990") { // -1, token失效 9999 没有token

        // 恢复默认样式
        let themeLink = document.querySelector('link[name="theme"]');
        themeLink.setAttribute('href', '');
        // 清空打开的页面等数据，但是保存主题数据
        // let theme = '';
        // if (localStorage.theme) {
        //     theme = localStorage.theme;
        // }
       store.commit('logout', this);
       store.commit('clearOpenedSubmenu');
        //关闭所有的标签
       store.commit('clearAllTags');
        localStorage.clear();

        Message.success(response.data.resMsg);
        router.push({'name':'login'})

    }
    if (response.data.resCode== "9991") {
        Message.error(response.data.resMsg);
    }
    return response;
}, error => {
    return Promise.reject(error);
});
