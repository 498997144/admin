<template>
    <div class="header-container">
        <div class="left">
            <img src="../../../assets/images/logo.png" />
            <span>后台管理系统</span>
        </div>
        <el-button type="primary" class="logout" @click="logout">退出</el-button>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        //退出登陆方法
       logout() {
           sessionStorage.clear();
           this.$router.push('/login');
       }
    },
};
</script>

<style lang="less" scoped>
.header-container{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    height: 80px;
    background-color: #9a9a9a;
    z-index: 6;
    .left{
        img{
            width: 60px;
            height: 60px;
        }
        span{
            font-size: 25px;
            color: white;
        }
    } 
}
</style>
