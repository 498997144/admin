<template>
	<table class="orderslist-container">
        <thead>
            <tr>
                 <td>索引</td>
                 <td>订单编号</td>
                 <td>订单价格</td>
                 <td>是否付款</td>
                 <td>是否发货</td>
                 <td>下单时间</td>
                 <td>操作</td>
             </tr>
        </thead>
        <tbody>
            <tr  v-for="(item,index) in data" :key="item.goods_id">
                <td>{{index+1}}</td>
                <td>{{item.order_number}}</td>
                <td>{{item.order_price}}</td>
                <td>{{item.order_pay == 0 ? '否' : '是'}}</td>
                <td>{{item.is_send}}</td>
                <td>{{item.create_time | dateFormat}}</td>
                <td class="btn">
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="$emit('editClick')">修改</el-button>
                    <el-button size="mini" type="success" icon="el-icon-location" @click="$emit('expressClick')">定位</el-button>
                </td>
            </tr>
        </tbody>
	</table>
</template>

<script>
	export default {
		name:'Orderlist',
		props:{
            data:{
                type:Array,
                default(){
                    return []
                }
            }
        },
	}
</script>

<style scoped lang="less">
.orderslist-container{
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
