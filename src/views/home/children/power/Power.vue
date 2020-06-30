<template>
    <div class="power-container">
        <!-- 导航区域 -->
        <Navbar>
            <li>权限管理</li>>
            <li>权限列表</li>
        </Navbar>
        <!-- 权限列表 -->
        <table>
            <thead>
                <tr>
                    <td>索引</td>
                    <td>权限名称</td>
                    <td>路径</td>
                    <td>权限等级</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in powerList" :key="item.id">
                    <td>{{index+1}}</td>
                    <td>{{item.authName}}</td>
                    <td>{{item.path}}</td>
                    <td v-if="item.level == 0">一级</td>
                    <td v-else-if="item.level == 1">二级</td>
                    <td v-else>三级</td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>

<script>
    export default {
        name:'Power',
        data() {
            return {
                powerList:[],
            }
        },
        methods:{
           async getpowerList(){
              const response =  await this.axios.get('rights/list');
              if(response.meta.status == 200){
                  this.powerList = response.data;
              }
            },
        },
        created() {
            this.getpowerList();
        },
               
    }
</script>

<style lang="less" scoped>
table{
    // display: none;
    width: 99%;
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 10px;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: #ffffff;
    color: black;
    thead{
        tr{
            td{
                text-align: center;
                height: 40px;
                line-height: 40px;
                border: 1px solid #d8dbde;
            }
        }
    }
    tbody{
        tr{
            td{
                text-align: center;
                height: 40px;
                line-height: 40px;
                border: 1px solid #d8dbde;
            }
        }
    }
}
</style>
