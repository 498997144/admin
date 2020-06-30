<template>
    <el-dialog class="express-container" title="物流信息" :visible="show" @close="$emit('close')">
        <el-timeline :reverse="true">
            <el-timeline-item v-for="(item, index) in data" :key="index" :timestamp="item.time">{{ item.context }}</el-timeline-item>
        </el-timeline>
    </el-dialog>
</template>

<script>
export default {
    name: 'Express',
    props: ['show', 'data'],
};
</script>

<style scoped lang="less">
    
</style>
