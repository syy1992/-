<style lang="less">
    @import '../../styles/common.less';
    @import '../common-components/table.less';
</style>

<template>
    <div>
        <Row>
            <Col span="24" class="padding-left-10">
                <Card>
                    <div class="edittable-con-1">
                        <can-edit-table refs="table1" @on-delete="handleDel" v-model="tableData" :columns-list="columnsList"></can-edit-table>
                    </div>
                </Card>
            </Col>
        </Row>

        <!--<Row class="margin-top-10">-->
            <!--<Col span="24">-->
                <!--<Card>-->
                    <!--<p slot="title">-->
                        <!--<Icon type="ios-keypad"></Icon>-->
                         <!--单元行和单元格两种方式编辑(始终显示编辑单元格按钮)-->
                    <!--</p>-->
                    <!--<Row :gutter="10">-->
                        <!--<Col span="24">-->
                            <!--<div class="edittable-table-height-con">-->
                                <!--<can-edit-table -->
                                    <!--refs="table4" -->
                                    <!--v-model="editInlineAndCellData" -->
                                    <!--@on-cell-change="handleCellChange" -->
                                    <!--@on-change="handleChange"  -->
                                    <!--:editIncell="true" -->
                                    <!--:columns-list="editInlineAndCellColumn"-->
                                <!--&gt;</can-edit-table>-->
                            <!--</div>-->
                        <!--</Col>-->
                        <!--<Modal :width="900" v-model="showCurrentTableData">-->
                            <!--<can-edit-table refs="table5" v-model="editInlineAndCellData" :columns-list="columnsList"></can-edit-table>-->
                        <!--</Modal>-->
                    <!--</Row>-->
                <!--</Card>-->
            <!--</Col>-->
        <!--</Row>-->

    </div>
</template>

<script>
import canEditTable from '../common-components/canEditTable.vue';
import tableData from '../common-components/table_data.js';
export default {
    name: 'fee',
    components: {
        canEditTable
    },
    data () {
        return {
            columnsList: [],
            tableData: [],
            editInlineColumns: [],
            editInlineData: [],
            editIncellColumns: [],
            editIncellData: [],
            editInlineAndCellColumn: [],
            editInlineAndCellData: [],
            showCurrentColumns: [],
            showCurrentTableData: false
        };
    },
    methods: {
        getData () {
            this.columnsList = tableData.ruleTableColumns;
            this.tableData = tableData.applyTableData;
            this.editInlineColumns = tableData.editInlineColumns;
            this.editInlineData = tableData.editInlineData;
            this.editIncellColumns = tableData.editIncellColumns;
            this.editIncellData = tableData.editIncellData;
            this.editInlineAndCellColumn = tableData.editInlineAndCellColumn;
            this.editInlineAndCellData = tableData.editInlineAndCellData;
            this.showCurrentColumns = tableData.showCurrentColumns;
        },
        handleNetConnect (state) {
            this.breakConnect = state;
        },
        handleLowSpeed (state) {
            this.lowNetSpeed = state;
        },
        getCurrentData () {
            this.showCurrentTableData = true;
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        handleCellChange (val, index, key) {
            this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
        },
        handleChange (val, index) {
            this.$Message.success('修改了第' + (index + 1) + '行数据');
        }
    },
    created () {
        this.getData();
    }
};
</script>
