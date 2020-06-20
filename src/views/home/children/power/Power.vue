<template>
    <div class="power-container">
        <!-- 导航区域 -->
        <Navbar>
            <li>权限管理</li>
            <li>权限列表</li>
        </Navbar>
    </div>
</template>

<script>
    import Navbar from '../../../../components/common/nav/Navbar.vue';
    export default {
        name:'Power',
        components: {
			Navbar,
        },
        data() {
            return {
                b: 1,
            }
        },
        computed:{
            
        },
        methods:{
            
        },
        created() {
            
        },
        mounted() {
            
        },
               
    }
</script>

<style lang="less" scoped>

</style>
