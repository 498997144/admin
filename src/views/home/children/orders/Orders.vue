<template>
    <div class="orders-container">
        <!-- 导航区域 -->
        <Navbar>
            <li>订单管理</li>>
            <li>订单列表</li>
        </Navbar>
        <!-- 搜索框 -->
        <div class="search-container">
            <input type="text" placeholder="请输入搜索条件" v-model="queryInfo.query" />
            <button class="el-icon-search" @click="getOrders"></button>
            <button class="allorders" @click="getAll">所有订单</button>
        </div>
        <!-- 订单列表区域 -->
        <Orderlist :data="ordersData.ordersList" @delSuccess="getOrders"
         @editClick="editShow = !editShow" @expressClick="getExpress"></Orderlist>
        <!-- 修改地址 -->
        <Editadress :show="editShow" @close="editShow = false"></Editadress>
        <!-- 获取物流信息 -->
        <Express :show='expressShow' :data="expressData" @close="expressShow = false"></Express>
        <!-- 分页器 -->
        <Pagination :total="ordersData.total" :pagesize="queryInfo.pagesize" @getData="getData"></Pagination>
    </div>
</template>

<script>
    import Orderlist from '../../../../components/content/orders/Orderlist.vue';
    import Editadress from '../../../../components/content/orders/Editadress.vue';
    import Express from '../../../../components/content/orders/Express.vue';
export default {
    name: 'Orders',
    components: {
        Orderlist,Editadress,Express,
    },
    data() {
        return {
            editShow:false,
            expressShow:false,
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:8,
            },
            ordersData:{
                total:0,
                ordersList:[],
            },
            expressData:[],
        };
    },
    methods: {
       async getOrders(){
            const response = await this.axios.get('orders',{params:this.queryInfo});
            if(response.meta.status == 200){
                this.ordersData.total = response.data.total;
                this.ordersData.ordersList = response.data.goods;
            }
        },
        getData(newPage){
            this.queryInfo.pagenum = newPage
            this.getOrders();
        },
        getAll(){
            this.queryInfo.query = '';
            this.getOrders();
        },
       async getExpress(){
            const response =await this.axios.get('kuaidi/1106975712662');
            console.log(response)
            if(response.meta.status == 200){
                this.expressData = response.data;
                this.expressShow = !this.expressShow;
            }
            
        },
    },
    created() {
        this.getOrders();
    },
};
</script>

<style lang="less" scoped>
.orders-container {
    .search-container {
        display: flex;
        align-items: center;
        height: 50px;
        margin-top: 50px;
        padding: 0 5px;
        input {
            height: 40px;
            padding-left: 10px;
        }
        button {
            height: 40px;
            width: 60px;
            cursor: pointer;
        }
        .allorders {
            height: 40px;
            width: 100px;
            margin-left: 30px;
            cursor: pointer;
        }
    }
}
</style>
