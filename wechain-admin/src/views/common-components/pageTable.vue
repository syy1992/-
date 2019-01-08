

<template>
    <div>
        <Table :columns="columnsList" :data="pTableData" border disabled-hover></Table>
    </div>

</template>

<script>

export default {
    name: 'pageTable',
    props: {
        columnsList: Array,
        value: Array

    },
    data () {
        return {
            columns: [],
            pTableData: []
        };
    },
    created () {
        this.init();
    },
    methods: {
        init () {
            this.pTableData = this.value;
        }
    }
};
</script>
