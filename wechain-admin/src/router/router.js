import Main from '@/views/Main.vue';

// access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

/*export const preview = {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/form/article-publish/preview.vue')
};*/

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue')},
/*        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: () => import('@/views/own-space/own-space.vue')
        },
        {
            path: 'order/:order_id',
            title: '订单详情',
            name: 'order-info',
            component: () => import('@/views/advanced-router/component/order-info.vue')
        }, // 用于展示动态路由
        {
            path: 'shopping',
            title: '购物详情',
            name: 'shopping',
            component: () => import('@/views/advanced-router/component/shopping-info.vue')
        }, // 用于展示带参路由
        {path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue')},*/
        {
            path: 'addPlan',
            title: '方案配置',
            name: 'addPlan',
            component: () => import('@/views/product/addPlan.vue')
        },
        {
            path: 'insur-plan-info',
            title: '产品方案详情',
            name: 'insur-plan-info',
            component: () => import('@/views/product/insur-plan-info.vue')
        },
        {
            path: 'team-insur/team-insur-apply/',
            title: '录入保险产品信息',
            name: 'team-insur-apply',
            component: () =>
                import ('@/views/teamproduct/team-insur-apply.vue')
        },
        {
            path: 'team-insur/team-insur-driving/',
            title: '录入保险产品信息',
            name: 'team-insur-driving',
            component: () =>
                import ('@/views/teamproduct/team-insur-driving.vue')
        },
        /*{
            path: 'team-insur/batchupload/',
            title: '上传被保险人信息',
            name: 'batchupload',
            component: () =>
                import ('@/views/teamproduct/team-insure-batchupload.vue')
        },*/
        {
            path: 'team-insur/confirm/',
            title: '核对保险信息信息和支付',
            name: 'team-insur-confirm',
            component: () =>
                import ('@/views/teamproduct/team-insur-confirm.vue')
        },
        //新增
        {
            path: 'apply/apply-confire',
            title: '合约录入确认信息',
            name: 'apply-confire',
            component: () =>
            import ('@/views/apply/apply-confire.vue')
        },
        {
            path: 'team-insur/team-insur-group/',
            title: '录入保险产品信息',
            name: 'team-insur-group',
            component: () =>
                import ('@/views/teamproduct/team-insur-group.vue')
        },
    ]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        access: ['contractCenter'],
        path: '/apply',
        icon: 'ios-paperplane',
        name: 'apply',
        title: '合约中心',
        component: Main,
        children: [
            {
                // access: [0, 1, 2, 3, 4],
                access: ['applyList'],
                path: 'apply-list',
                title: '合约查询',
                name: 'apply-list',
                icon: 'compose',
                component: () => import('@/views/apply/apply-list.vue')
            },
            {
                // access: [1],
                // access: [0, 1, 2, 3, 4],
                access: ['contract'],
                path: 'contract-new',
                title: '合约录入',
                name: 'contract-new',
                icon: 'compose',
                component: () =>
                    import ('@/views/apply/contract-new.vue')
            }
            // { path: 'rman-list', title: '关系人查询', name: 'rman-list', icon: 'arrow-swap', component: () => import('@/views/apply/rman-list.vue') }
        ]
    },
    {
        access: ['reportCenter'],
        path: '/report',
        icon: 'ios-paw',
        name: 'report',
        title: '报表数据',
        component: Main,
        children: [
            {
                // access: [1],
                access: ["report"],
                path: 'report_forms',
                title: '平台报表',
                name: 'report_forms',
                icon: 'connection-bars',
                component: () => import('@/views/report/report_forms.vue')
            },
            {
                // access: [1],
                access: ["reports"],
                path: 'report_forms',
                title: '渠道报表',
                name: 'report_formss',
                icon: 'connection-bars',
                component: () => import('@/views/report/report_forms.vue')
            }
        ]
    },

    // {
    //     path: '/preserve',
    //     icon: 'steam',
    //     name: 'preserve',
    //     title: '保全管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '保全查询', name: 'preserve-list', icon: 'compose', component: () => import('@/views/preserve/preserve-list.vue') },
    //         { path: 'modify', title: '批改申请', name: 'modify', icon: 'compose', component: () => import('@/views/preserve/modify.vue') },
    //         { path: 'surrender', title: '退保申请', name: 'surrender', icon: 'compose', component: () => import('@/views/preserve/surrender.vue') }
    //     ]
    // },

    // {
    //     path: '/claim',
    //     icon: 'monitor',
    //     name: 'claim',
    //     title: '小额快赔',
    //     component: Main,
    //     access: 0,
    //     children: [
    //       { path: 'repay-list', title: '小额快赔', name: 'repay-list', icon: 'arrow-swap', component: () => import('@/views/loaned/repay-list.vue') }
    //
    //     ]
    // },
//fixme
    {
        access: ['sceneManage'],
        path: '/scene',
        icon: 'ios-flask',
        name: 'scene',
        title: '场景管理',
        component: Main,
        children: [
            {
                // access: [0, 1],
                access: ['platform'],
                path: 'platform',
                title: '合作平台',
                name: 'platform',
                icon: 'compose',
                component: () => import('@/views/scene/platform.vue')
            },
            {
                // access: [0, 1, 2,],
                access: ['channel'],
                path: 'channel',
                title: '推广渠道',
                name: 'channel',
                icon: 'arrow-swap',
                component: () => import('@/views/scene/channel.vue')
            },
            {
                // access: [0, 1, 2],
                access: ['agent'],
                path: 'agent',
                title: '业务员',
                name: 'agent',
                icon: 'compose',
                component: () => import('@/views/scene/agent.vue')
            }

        ]
    },
//fixme
    /*{
        // access: [0, 1],
        // access: [],
        path: '/teamproduct',
        icon: 'ios-flask',
        name: 'teamproduct',
        title: '团险产品',
        component: Main,
        children: [{
            access: ['teamInsPlan'],
            path: 'team-insur-plan',
            title: '团险产品方案',
            name: 'team-insur-plan',
            icon: 'compose',
            component: () =>
                import ('@/views/teamproduct/team-insur-plan.vue')
        }]
    },*/

//fixme
    {
        access: ['productCenter'],
        path: '/product',
        icon: 'ios-flask',
        name: 'product',
        title: '产品中心',
        component: Main,
        children: [
            {
                access: ['productInfo'],
                path: 'productInfo',
                title: '产品信息',
                name: 'productInfo',
                icon: 'compose',
                component: () => import('@/views/product/productInfo.vue')
            },
            {
                access: ['insPlan'],
                path: 'insur-plan',
                title: '产品方案',
                name: 'insur-plan',
                icon: 'compose',
                component: () => import('@/views/product/insur-plan.vue')
            },
            {
                access: ['riskType'],
                path: 'risk-type',
                title: '险种配置',
                name: 'risk-type',
                icon: 'arrow-swap',
                component: () => import('@/views/product/risk-type.vue')
            },

            {
                access: ['insurAgency'],
                path: 'insur-agency',
                title: '保险机构',
                name: 'insur-agency',
                icon: 'compose',
                component: () => import('@/views/product/insur-agency.vue')
            },

            // {
            //     path: 'editTable',
            //     title: '可编辑责任表',
            //     name: 'editTable',
            //     icon: 'compose',
            //     component: () => import('@/views/product/editLiabilityTable.vue')
            // },
        ]
    },

    //fixme
    {
        //access: [0, 1, 2, 3],
        access:['balance'],
        path: '/balance',
        icon: 'ios-flask',
        name: 'balance',
        title: '结算中心',
        component: Main,
        children: [
            {
                access: ["premium"],
                path: '/premium',
                title: '保费统计',
                name: 'premium',
                icon: 'compose',
                component: () => import('@/views/balance/premium.vue')
            }
            // { path: 'fee', title: '服务费统计', name: 'fee', icon: 'arrow-swap', component: () => import('@/views/balance/fee.vue') },
            // { path: 'cost', title: '营销费用', name: 'cost', icon: 'compose', component: () => import('@/views/balance/cost.vue') }
        ]
    },

    {
        access: ['sysManage'],
        path: '/system',
        icon: 'settings',
        name: 'system',
        title: '系统管理',
        component: Main,
        children: [
            {
                access: ['accessIndex'],
                path: 'index',
                title: '权限管理',
                name: 'access_index',
                icon: 'key',
                component: () => import('@/views/system/access.vue')
            },
            //新增
            /*{
                access: ['accessIndex'],
                path: 'log',
                title: '系统日志',
                name: 'access_log',
                icon: 'key',
                component: () => import('@/views/system/log/index.vue')
            },
            {
                access: ['accessIndex'],
                path: 'user',
                title: '用户管理',
                name: 'access_user',
                icon: 'key',
                component: () => import('@/views/system/user/index.vue')
            },
            {
                access: ['accessIndex'],
                path: 'role',
                title: '角色管理',
                name: 'access_role',
                icon: 'key',
                component: () => import('@/views/system/role/index.vue')
            },
            {
                access: ['accessIndex'],
                path: 'resource',
                title: '资源管理',
                name: 'access_rescource',
                icon: 'key',
                component: () => import('@/views/system/resource/index.vue')
            },*/


            {
                access: ['accountIndex'],
                path: 'account',
                title: '账号设置',
                name: 'account_index',
                icon: 'key',
                component: () => import('@/views/system/account.vue')
            }
        ]
    },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: () => import('@/views/access/access-test.vue') }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: () => import('@/views/international/international.vue') }
    //     ]
    // },
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: () => import('@/views/my-components/text-editor/text-editor.vue')
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: () => import('@/views/my-components/markdown-editor/markdown-editor.vue')
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: () => import('@/views/my-components/image-editor/image-editor.vue')
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: () => import('@/views/my-components/draggable-list/draggable-list.vue')
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: () => import('@/views/my-components/file-upload/file-upload.vue')
    //         },
    //         {
    //             path: 'scroll-bar',
    //             icon: 'android-upload',
    //             name: 'scroll-bar',
    //             title: '滚动条',
    //             component: () => import('@/views/my-components/scroll-bar/scroll-bar-page.vue')
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             // component: () => import('@/views/my-components/count-to/count-to.vue')
    //             component: () => import('@/views/my-components/count-to/count-to.vue')
    //         },
    //         {
    //             path: 'split-pane-page',
    //             icon: 'ios-pause',
    //             name: 'split-pane-page',
    //             title: 'split-pane',
    //             component: () => import('@/views/my-components/split-pane/split-pane-page.vue')
    //         }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: () => import('@/views/form/article-publish/article-publish.vue') },
    //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: () => import('@/views/form/work-flow/work-flow.vue') }
    //
    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
    //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
    //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
    //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
    //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: () => import('@/views/error-page/error-page.vue') }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
   /* preview,*/
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
