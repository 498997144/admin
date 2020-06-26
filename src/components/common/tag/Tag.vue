<template>
	<div class="tag-container">
        <slot>
            <span>商品管理</span>
        </slot>
       <span class="btn">x</span>
	</div>
</template>

<script>
	export default {
		name:'Tag',
		props:[],
		computed:{
			
		},
        methods:{
            
        },
		
	}
</script>

<style scoped lang="less">
.tag-container{
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #00aaff;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    background-color: #0055ff;
    color: #f4f4f4;
    .btn{
        display: flex;
        flex: 1;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        margin-left: 5px;
        border-radius: 10px;
        &:hover{
            background-color: #4ad8ff;
            cursor: pointer;
        }
    }
}
</style>
