export const applyTableColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    // {
    //     title: '业务流水号',
    //     align: 'center',
    //     key: 'reqNo'
    // },
    {
        title: '保单号',
        align: 'center',
        key: 'policyNo'
    },
    {
        title: '投保单号',
        align: 'center',
        key: 'reqNo'
    },
    {
        title: '业务员姓名',
        align: 'center',
        key: 'salesmanName'
    },
    {
        title: '业务员手机号(编号)',
        align: 'center',
        key: 'salesmanPhone'
    },
    {
        title: '投保人名称',
        align: 'center',
        key: 'applicantName'
    },
    {
        title: '被保人名称',
        align: 'center',
        key: 'insuredName'
    },
    {
        title: '产品方案',
        align: 'center',
        key: 'planName'
    },
    {
        title: '保费(元)',
        align: 'center',
        key: 'premium'
    },
    // {
    //     title: '保险公司',
    //     align: 'center',
    //     key: 'institName'
    // },
    {
        title: '平台名称',
        align: 'center',
        key: 'platformName'
    },
    {
        title: '渠道名称',
        align: 'center',
        key: 'channelName' // 生产上字段为channelNo 测试上为channelName
    },
    {
        title: '保单状态',
        align: 'center',
        key: 'policyStatus'
    },
    {
        title: '支付状态',
        align: 'center',
        key: 'payStatus'
    },
    {
        title: '投保时间',
        align: 'center',
        key: 'createTime'
    },
    {
        title: '起保时间',
        align: 'center',
        key: 'startTime'
    },
    {
        title: '终保时间',
        align: 'center',
        key: 'endTime'
    }

    // {
    //     title: '操作',
    //     align: 'center'
    // }
];
export const rmanTableColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '关系人ID',
        align: 'center',
        key: 'name'
    },
    {
        title: '关系人名称',
        align: 'center',
        key: 'sex'
    },
    {
        title: '关系人类别',
        align: 'center',
        key: 'work'
    },
    {
        title: '保单数',
        align: 'center',
        key: 'name'
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['detail']
    }
];

export const agencyTableColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '机构编号',
        align: 'center',
        key: 'institutionNo'
    },
    {
        title: '机构名称',
        align: 'center',
        key: 'name'
    },
    {
        title: '机构类型',
        align: 'center',
        key: 'type'
    },
    {
        title: '经营范围',
        align: 'center',
        key: 'regionRange'
    },
    {
        title: '是否有网销资质',
        align: 'center',
        key: 'isNetSale'
    },
    {
        title: '是否通过其备案',
        align: 'center',
        key: 'isRecorded'
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const riskTypeTableColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '险种名称',
        align: 'center',
        key: 'typeName'
    },
    {
        title: '险种编号',
        align: 'center',
        key: 'typeNo'
    },
    {
        title: '所属险类编号',
        align: 'center',
        key: 'categoryNo'

    },
    {
        title: '所属险类名称',
        align: 'center',
        key: 'categoryName'

    },
    // {
    //     title: '是否主险',
    //     align: 'center',
    //     key: 'work'
    // },
    {
        title: '创建时间',
        align: 'center',
        key: 'createTime'
    },
    {
        title: '更新时间',
        align: 'center',
        key: 'updateTime'
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];
export const planTableColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '产品名称',
        align: 'center',
        key: 'name'
    },
    // {
    //     title: '是否团险',
    //     align: 'center',
    //     key: 'sex'
    // },
    {
        title: '内部产品方案编号',
        align: 'center',
        key: 'planNo'
    },
    {
        title: '保险公司产品方案编号',
        align: 'center',
        key: 'insPlanNo'
    },
    {
        title: '保险机构编号',
        align: 'center',
        key: 'institNo'
    },
    {
        title: '优惠比例',
        align: 'center',
        key: 'discountRate'
    },
    {
        title: '投保份数限制',
        align: 'center',
        key: 'maxNum'
    },
    {
        title: '保险期限',
        align: 'center',
        key: 'period'
    },
    {
        title: '是否定额方案',
        align: 'center',
        key: 'isQuotaScheme'
    },
    {
        title: '固定费率',
        align: 'center',
        key: 'fixedRate'
    },
    {
        title: '险种类型',
        align: 'center',
        key: 'riskTypes'
    },
    {
        title: '创建时间',
        align: 'center',
        key: 'createTime'
    },
    {
        title: '更新时间',
        align: 'center',
        key: 'updateTime'
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const platformTableColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '平台名称',
        align: 'center',
        key: 'name'
    },
    {
        title: '平台编号',
        align: 'center',
        key: 'platNo'
    },
    {
        title: '平台描述',
        align: 'center',
        key: 'description'
    },
    {
        title: '私钥',
        align: 'center',
        key: 'privateKey'
    },
    {
        title: '创建人',
        align: 'center',
        key: 'creator'
    },
    // {
    //     title: '创建时间',
    //     align: 'center',
    //     key: 'createTime'
    // },
    {
        title: '更新时间',
        align: 'center',
        key: 'updateTime'
    }
    // {
    //     title: '是否删除',
    //     align: 'center',
    //     key: 'isDel'
    // },
    // {
    //     title: '操作',
    //     align: 'center',
    //     width: 120,
    //     key: 'handle',
    //     handle: ['edit', 'delete']
    // }
];

export const channelTableColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '渠道名称',
        align: 'center',
        key: 'channelName'
    },
    {
        title: '渠道标识',
        align: 'center',
        key: 'channelNo'
    },
    {
        title: '平台编号',
        align: 'center',
        key: 'platNo'
    },
    {
        title: '渠道描述',
        align: 'center',
        key: 'description'
    }
    // {
    //     title: '更新时间',
    //     align: 'center',
    //     key: 'updateTime'
    // },
    // {
    //     title: '创建时间',
    //     align: 'center',
    //     key: 'createTime'
    // },
    // {
    //     title: '操作',
    //     align: 'center',
    //     width: 120,
    //     key: 'handle',
    //     handle: ['edit', 'delete']
    // }
];

export const agentTableColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '编号',
        align: 'center',
        key: 'salesmanNo'
    },
    {
        title: '姓名',
        align: 'center',
        key: 'name'
    },
    {
        title: '手机号',
        align: 'center',
        key: 'phone'
    },
    {
        title: '地址',
        align: 'center',
        key: 'address'
    },
    {
        title: '平台号',
        align: 'center',
        key: 'platformNo'
    },
    {
        title: '渠道号',
        align: 'center',
        key: 'salesmanNo'
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];

export const ruleTableColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '规则集名称',
        align: 'center',
        key: 'name',
        editable: true
    },
    {
        title: '规则名称',
        align: 'center',
        key: 'sex'
    },
    {
        title: '拒绝代码',
        align: 'center',
        key: 'work',
        editable: true
    },
    {
        title: '风险等级',
        align: 'center',
        key: 'work',
        editable: true
    },
    {
        title: '扫描结果',
        align: 'center',
        key: 'work',
        editable: true
    },
    {
        title: '证据链信息',
        align: 'center',
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['delete']
    }
];

export const applyTableData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发',
        name: 'Aresn',
        sex: '男',
        work: '前端开发',
        name: 'Aresn',
        sex: '男',
        work: '前端开发',
        name: 'Aresn',
        sex: '男',
        work: '前端开发',
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    }
];

export const sceneTableData = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

export const table1Columns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        title: '场景名称',
        align: 'center',
        key: 'name',
        editable: true
    },
    {
        title: '场景类型',
        align: 'center',
        key: 'sex'
    },
    {
        title: '创建日期',
        align: 'center',
        key: 'work',
        editable: true
    },
    {
        title: '创建人',
        align: 'center',
        key: 'work',
        editable: true
    },
    {
        title: '更新日期',
        align: 'center',
        key: 'work',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['delete']
    }
];

export const table1Data = [
    {
        name: 'Aresn',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'Lison',
        sex: '男',
        work: '前端开发'
    },
    {
        name: 'lisa',
        sex: '女',
        work: '程序员鼓励师'
    }
];

const tableData = {
    applyTableColumns: applyTableColumns,
    rmanTableColumns: rmanTableColumns,

    agencyTableColumns: agencyTableColumns,
    riskTypeTableColumns: riskTypeTableColumns,
    planTableColumns: planTableColumns,

    platformTableColumns: platformTableColumns,
    channelTableColumns: channelTableColumns,
    agentTableColumns: agentTableColumns,

    sceneTableData: sceneTableData,
    applyTableData: applyTableData,

    table1Columns: table1Columns,
    table1Data: table1Data
};

export default tableData;
