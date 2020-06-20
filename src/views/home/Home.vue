<template>
    <div class="home-container">
        <!-- 头部区域 -->
        <Header></Header>
        <!-- 主体区域 -->
        <Main :menuList="menuList"></Main>
    </div>
</template>

<script>
import Header from './children/Header.vue';
import Main from './children/Main.vue';

export default {
    name: 'Home',
    components: {
        Header,
        Main
    },
    data() {
        return {
            menuList: []
        };
    },
    computed: {},
    methods: {
        //网络请求相关方法
        async getmenuList() {
            const response = await this.axios.get('menus');
            if (response.meta.status == 200) {
                this.menuList = response.data;
            }
        }
    },
    created() {
        //请求菜单栏数据
        this.getmenuList();
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.home-container {
    height: 100%;
    background-color: red;
}
</style>
