<template>
	<table class="goods-container">
        <thead>
            <tr>
                 <td>索引</td>
                 <td>商品名称</td>
                 <td>商品价格(元)</td>
                 <td>商品重量</td>
                 <td>创建时间</td>
                 <td>操作</td>
             </tr>
        </thead>
        <tbody>
            <tr  v-for="(item,index) in goodsList" :key="item.goods_id">
                <td>{{index+1}}</td>
                <td>{{item.goods_name}}</td>
                <td>{{item.goods_price}}</td>
                <td>{{item.goods_weight}}</td>
                <td>{{item.add_time | dateFormat}}</td>
                <td class="btn">
                    <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="remove(item.goods_id)">删除</el-button>
                </td>
            </tr>
        </tbody>
	</table>
</template>

<script>
	export default {
		name:'Goods',
		props:{
            goodsList:{
                type:Array,
                default(){
                    return []
                }
            }
        },
		computed:{
			
		},
        methods:{
            remove(id){
                this.$toast('确定要删除这件商品吗?',async()=>{
                    const response = await this.axios.delete(`goods/${id}`);
                    if(response.meta.status == 200){
                        this.$message.success(response.meta.msg);
                        this.$emit('delSuccess');
                    }else{
                        this.$message.error(response.meta.msg);
                    }
                });
            },
        },
		
	}
</script>

<style scoped lang="less">
.goods-container{
    margin: 0 auto;
    width: 99%;
    background-color: white;
    border-collapse: collapse;
    font-size: 12px;
    thead{
        tr{
            td{
                height: 40px;
                line-height: 40px;
                text-align: center;
                border: 1px solid #d8dbde;
            }
        }
    }
    tbody{
        tr{
            td{
                height: 40px;
                line-height: 40px;
                text-align: center;
                border: 1px solid #d8dbde;
            }
        }
    }
}
</style>
