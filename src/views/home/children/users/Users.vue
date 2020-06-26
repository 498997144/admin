<template>
    <div class="users-container">
        <!-- 导航区 -->
        <Navbar></Navbar>
        <!-- 搜索框 -->
        <div class="search-container">
            <input type="text" placeholder="请输入搜索条件" v-model.trim="queryInfo.query" />
            <button class="el-icon-search" @click="searchData"></button>
            <button class="addUser" @click="addShow = !addShow">添加用户</button>
            <button class="allUser" @click="getUsers()">所有用户</button>
        </div>
        <!-- //用户列表区域 -->
        <table>
            <thead>
                <tr>
                    <td>索引</td>
                    <td>用户名</td>
                    <td>邮箱</td>
                    <td>电话</td>
                    <td>角色</td>
                    <td>创建时间</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in userdata.userList" :key="item.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.mobile }}</td>
                    <td>{{ item.role_name }}</td>
                    <td>{{ item.create_time }}</td>
                    <td width="240px">
                        <el-button type="primary" size="mini" @click="getEdituser(item.id)">修改</el-button>
                        <el-button type="primary" size="mini" @click="deleteTip(item.username,item.id)">删除</el-button>
                        <el-button type="primary" size="mini" @click="setRole(item.username,item.role_name,item.id)">分配角色</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- //分页器 -->
        <div class="pagination-container">
            <el-pagination
                @prev-click="getData"
                @current-change="getData"
                @next-click="getData"
                background
                layout="prev, pager, next"
                :total="userdata.total"
                :page-size="8"
            ></el-pagination>
        </div>
        <!-- 添加用户// -->
        <Adduser v-show="addShow" @close="close" ref="addUser" 
        @addSuccess="getData(currentPage)"></Adduser>
        <!-- 编辑用户 -->
        <Edituser v-show="editShow" @close="close"
          @updateSuccess="getData(currentPage)" ref="editUser" :editData="editData"></Edituser>
          <!-- 分配角色 -->
          <Setrole v-show="setRoleshow" @setSuccess="getData(currentPage)"
          @close="close" ref="setRole" :setData="setRoleData"></Setrole>
    </div>
</template>

<script>
import Adduser from '../../../../components/content/users/Adduser.vue';
import Edituser from '../../../../components/content/users/Edituser.vue';
import Setrole from '../../../../components/content/users/Setrole.vue';
import Navbar from '../../../../components/common/nav/Navbar.vue';
export default {
    name: 'Users',
    components: {
        Adduser,Edituser,Navbar,Setrole
    },
    data() {
        return {
            setRoleshow:false,
            addShow: false,
            editShow: false,
            currentPage:1,
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 8
            }, //查询参数
            userdata: {
                userList: [],
                toal: 0,
                pgenum: 0
            }, //分页数据
            editData: {}, //编辑表单数据
            setRoleData: {
                roleList:[],
                uname:'',
                rname:'',
            } //分配角色数据
        };
    },
    methods: {
        async getUsers(query = '', pagenum = 1, pagesize = 8) {
            const response = await this.axios.get('users', { params: { query, pagenum, pagesize } });
            if (response.meta.status == 200) {
                this.userdata.userList = response.data.users;
                this.userdata.total = response.data.total;
                this.userdata.pagenum = response.data.pagenum;
            }
        },
        getData(newPage) {
            this.getUsers('', newPage);
            this.currentPage = newPage;
        },
        searchData() {
            this.getUsers(this.queryInfo.query);
        },
        async getEdituser(id) {
            const response = await this.axios.get(`users/${id}`);
            if (response.meta.status == 200) {
                this.editData = response.data;
            } else {
                this.$message({ message: response.meta.msg, type: 'error' });
            }
            this.editShow = !this.editShow;
        },
        deleteTip(username,id){
            this.$toast(`确定要删除${username}这条记录吗?`,async () => {
               const response =  await this.axios.delete(`users/${id}`);
               if(response.meta.status == 200){
                   this.$message({ message: response.meta.msg, type: 'success' });
                   this.getData(this.currentPage);
               }else{
                   this.$message({ message: response.meta.msg, type: 'error' });
               }
            });
        },
        async setRole(uname,rname,id){
            const response = await this.axios.get('roles');
            if(response.meta.status == 200){
                this.setRoleData.roleList = response.data;
                this.setRoleData.uname = uname;
                this.setRoleData.rname = rname;
                this.setRoleData.uid = id;
            }
            this.setRoleshow = !this.setRoleshow;
        },
        close(type) {
            switch (type) {
                case 'add':
                    this.addShow = !this.addShow;
                    this.$refs.addUser.reset();
                    break;
                case 'edit':
                    this.editShow = !this.editShow;
                    this.$refs.editUser.reset();
                    break;
                 case 'set':
                    this.setRoleshow = !this.setRoleshow;
                     this.$refs.setRole.reset();
                    break;
            }
        },
    },
    created() {
        this.getUsers();
    }
};
</script>

<style scoped lang="less">
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
    .addUser,
    .allUser {
        height: 40px;
        width: 100px;
        margin-left: 30px;
        cursor: pointer;
    }
}

table {
    width: 99%;
    margin:0 auto ;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: #ffffff;
    color: black;
    thead {
        tr {
            height: 40px;
            width: 100%;
            text-align: center;
            td {
                border: 1px solid #d8dbde;
                // width: 60px;
            }
        }
    }
    tbody {
        tr {
            height: 40px;
            width: 100%;
            text-align: center;
            td {
                border: 1px solid #d8dbde;
            }
        }
    }
}
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
}
</style>
