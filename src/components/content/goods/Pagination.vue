<template>
    <div class="pagination-container">
        <el-pagination @current-change="getData"  background layout="prev, pager, next"
         :total="total" :page-size="pagesize"></el-pagination>
        </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        pagesize: {
            type: Number,
            default: 8
        },
        total: {
            type: Number,
            default: 0
        }
    },
    methods:{
        getData(newPage){
            this.$emit('getData',newPage);
        },
    },
};
</script>

<style scoped lang="less">
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
}
</style>
