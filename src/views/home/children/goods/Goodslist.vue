<template>
    <div class="goodslitst-container">
        <!-- 导航区域 -->
        <Navbar>
            <li>商品管理</li>>
            <li>商品列表</li>
        </Navbar>
        <!-- 搜索区域 -->
        <div class="search-container">
            <input type="text" placeholder="请输入搜索条件" v-model.trim="queryInfo.query" />
            <button class="el-icon-search" @click="getGoodsList"></button>
            <button class="addGood" @click="$router.push({name:'add'})">添加商品</button>
            <button class="allGood" @click="getAll">所有商品</button>
        </div>
        <!-- 商品列表区域 -->
        <Goods :goodsList="goodsData.goodsList" @delSuccess="getGoodsList"></Goods>
        <!-- 分页器 -->
        <Pagination :total="goodsData.total" :pagesize="queryInfo.pagesize" @getData="getData"></Pagination>
    </div>
</template>

<script>
    import Navbar from '../../../../components/common/nav/Navbar.vue';
    import Goods from '../../../../components/content/goods/Goods.vue';
    import Pagination from '../../../../components/content/goods/Pagination.vue';
    export default {
        name:'Goodslist',
        components: {
			Navbar,Goods,Pagination,
        },
        data() {
            return {
                queryInfo:{
                    query:'',
                    pagenum:1,
                    pagesize:8,
                },
                goodsData:{
                  goodsList:[],
                  total:0,
                },
            }
        },
        methods:{
           async getGoodsList(){
               const response = await this.axios.get('goods',{params:this.queryInfo});
               console.log(response)
               if(response.meta.status == 200){
                   this.goodsData.goodsList = response.data.goods;
                   this.goodsData.total = response.data.total;
               }
           },
           getData(newPage){
               this.queryInfo.pagenum = newPage;
               this.getGoodsList();
           },
           getAll(){
               this.queryInfo.query = '';
               this.getGoodsList();
           },
        },
        created() {
            this.getGoodsList();
        },
    }
</script>

<style lang="less" scoped>
.goodslitst-container{
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
        .addGood,.allGood{
            height: 40px;
            width: 100px;
            margin-left: 30px;
            cursor: pointer;
        }
    }
}
</style>
