<style lang="less">
    @import '../../styles/common.less';
    @import '../common-components/table.less';
</style>

<template>
    <div>
        <Card>
<!--            <Row>
                <Input v-model="searchConName2" @on-change="handleSearch2" icon="search" placeholder="请输入姓名搜搜..." style="width: 200px" />
                <Input v-model="searchConTel2" @on-change="handleSearch2" icon="search" placeholder="请输入手机号搜搜..." style="width: 200px" />
                <span @click="handleSearch3" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
                <Button @click="handleCancel3" type="ghost" >取消</Button>
                <span @click="handleSearch3" style="margin: 0 10px;"><Button type="primary" icon="search">新增</Button></span>
            </Row>-->
            <Row class="margin-top-10">
                <Table :columns="columnsList" :data="tableData"></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="total" :current="pageNum" showTotal @on-change="changePage"></Page>
                    </div>
                </div>
            </Row>
        </Card>
    </div>
</template>

<script>
import pageTable from '../common-components/pageTable.vue';
import tableData from '../common-components/table_data.js';
import axios from 'axios';
export default {
    name: 'rman-list',
    components: {
        pageTable
    },
    data () {
        return {
            columnsList: [],
            tableData: []
        };
    },

    methods: {
        getData () {
            var url = 'http://47.104.24.10/mis_test/smloan/order/list';
            this.columnsList = tableData.rmanTableColumns;
            //            this.tableData = tableData.applyTableData;
            axios.get(url).then(response => {
                let res = response.data;
                for (let i = 0; i < res.msg.length; i++) {
                    this.tableData.push(res.msg[i]);
                }
            });
        }
    },
    created () {
        this.getData();
    }

};
</script>
