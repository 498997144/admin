<template>
	<ul class="nav-container">
        <router-link tag="li" :to="{name:'welcome'}">首页</router-link>>
       <slot>
           <li>用户管理</li>>
           <li>用户列表</li>
       </slot>
	</ul>
</template>

<script>
	export default {
		name:'Navbar',	
	}
</script>

<style scoped lang="less">
.nav-container{
    position: fixed;
    top: 80px;
    left: 245px;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 50px;
    background-color: #7c7c7c;
    width: 1121px;
    color: white;
    z-index: 6;
    li{
        height: 100%;
        padding: 0 15px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        &:first-child{
            color: #cad1c8;
            cursor: pointer;
        }
     }
}
</style>
