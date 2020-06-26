<template>
    <div class="roles-container">
        <!-- 导航区域 -->
        <Navbar>
            <li>权限管理</li>>
            <li>角色列表</li>
        </Navbar>
        <!-- 添加角色 -->
        <div class="addRole-container">
            <button class="addRole" @click="addShow = !addShow">添加角色</button>
        </div>
         <!-- 角色列表 -->
         <table>
              <thead>
                  <tr>
                      <td>下拉</td>
                      <td>索引</td>
                      <td>角色名称</td>
                      <td>角色描述</td>
                      <td>操作</td>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item,index) in roleList" :key="item.id">
                      <td class="rotate" @click.self="dorpDown">
                         <div class="power-container">
                            <ul  class="powerList" v-for="itemOne in item.children" :key="itemOne.id">
                               <li class="one">
                                  <div> 
                                     <Tag  class="triangle" @click.native="deletePower(item.id,itemOne.id)">{{itemOne.authName}}</Tag>
                                  </div>
                               </li>
                               <li class="two">
                                   <div class="children" v-for="itemTwo in itemOne.children" :key="itemTwo.id">
                                       <div class="children-one">
                                           <Tag  class="triangle" @click.native="deletePower(item.id,itemTwo.id)">{{itemTwo.authName}}</Tag>
                                       </div>
                                       <div class="children-two">
                                          <div class="three" v-for="itemThree in itemTwo.children" :key="itemThree.id">
                                              <Tag @click.native="deletePower(item.id,itemThree.id)"> {{itemThree.authName}}</Tag>
                                          </div>
                                       </div>
                                   </div>
                               </li> 
                            </ul>
                         </div>
                      </td>
                      <td>{{index+1}}</td>
                      <td>{{item.roleName}}</td>
                      <td>{{item.roleDesc}}</td>
                      <td width="240px">
                         <el-button type="primary" size="mini" @click="getEditrole(item.id)">修改</el-button>
                         <el-button type="primary" size="mini" @click="deleteTip(item.roleName,item.id)">删除</el-button>
                         <el-button type="primary" size="mini" @click="setPower(item.id)">分配权限</el-button>
                      </td>
                  </tr>
              </tbody>
         </table>
          <Addrole v-show="addShow" @addSuccess="getRolelist" @close="close" ref="addRole"></addRole>
          <Editrole v-show="editShow" @updateSuccess="getRolelist" @close="close" ref="editRole" :editData="editRoleData"></Editrole>
          <Setpower v-show="setShow" @setSuccess="getRolelist" :powerList="powerList" :defaultPower.sync="defaultPower" :rid="currentRid" @close="close" ref="setPower"></Setpower>
    </div>
</template>

<script>
    import Navbar from '../../../../components/common/nav/Navbar.vue';
    import Addrole from '../../../../components/content/power/Addrole.vue';
    import Editrole from '../../../../components/content/power/Editrole.vue';
    import Setpower from '../../../../components/content/power/Setpower.vue';
    import Tag from '../../../../components/common/tag/Tag.vue';
    export default {
        name:'Roles',
        components: {
			Navbar,Addrole,Editrole,Setpower,Tag,
        },
        data() {
            return {
                addShow:false,
                editShow:false,
                setShow:false,
                roleList: [],
                editRoleData:{},
                powerList:[],
                defaultPower:[],
                currentRid:null,
            }
        },
        methods:{
            async getRolelist(){
                const response = await this.axios.get('roles');
                if(response.meta.status == 200){
                    this.roleList = response.data;
                }
            },
            async getEditrole(id){
                const response = await this.axios.get(`roles/${id}`);
                if(response.meta.status == 200){
                    this.editRoleData = response.data;
                }else{
                    this.$message({ message: response.meta.msg, type: 'error' });
                }
                this.editShow = !this.editShow;
            },
            deleteTip(roleName,id){
                this.$toast(`确定要删除${roleName}这个角色吗?`,async ()=>{
                    const response = await this.axios.delete(`roles/${id}`);
                    if(response.meta.status == 200){
                        this.$message({message:response.meta.msg,type:'success'});
                        this.getRolelist();
                    }else{
                        this.$message({message:response.meta.msg,type:'error'});
                    }
                });
            },
            dorpDown(){
                event.target.classList.toggle('rotateActive');
                event.target.children[0].classList.toggle('show');
            },
            // 递归获取角色已有权限
            getPowers(item,list){
                list.push(item.id);
                if(item.children){
                    item.children.forEach(item => this.getPowers(item,list))
                }
                // else{
                //     list.push(item.id);
                // }
            },
           async setPower(rid){
               const item = this.roleList.filter(item => item.id == rid)[0];
               this.getPowers(item,this.defaultPower);
               this.currentRid = rid;
               // console.log(this.defaultPower)
               // console.log(this.roleList)
                const response = await this.axios.get('rights/tree');
                if(response.meta.status == 200){
                    this.powerList = response.data;
                    // console.log(response.data)
                    this.setShow = !this.setShow;
                }
            },
            deletePower(rid,pid){
                this.$toast(`确定要移除这条权限吗?`,async ()=>{
                    const response = await this.axios.delete(`roles/${rid}/rights/${pid}`);
                    if(response.meta.status == 200){
                        this.$message({message:response.meta.msg,type:'success'});
                        this.getRolelist();
                    }else{
                        this.$message({message:response.meta.msg,type:'error'});
                    }
                });
            },
            close(type) {
                switch (type) {
                    case 'add':
                        this.addShow = !this.addShow;
                        this.$refs.addRole.reset();
                        break;
                    case 'edit':
                        this.editShow = !this.editShow;
                        this.$refs.editRole.reset();
                        break; 
                    case 'set':
                        this.setShow = !this.setShow;
                        this.$refs.setPower.reset();
                        this.defaultPower = [];
                        break;
                }
            },
            
        },
        created() {
            this.getRolelist();
        },
               
    }
</script>

<style lang="less" scoped>
.addRole-container {
    display: flex;
    align-items: center;
    height: 50px;
    margin-top: 50px;
    padding: 0 5px;
    .addRole {
        height: 40px;
        width: 100px;
        // margin-left: 30px;
        cursor: pointer;
    }
}
table{
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
.rotate{
    position: relative;
    width: 40px;
    .show{
        display: block!important;
    }
    .power-container{
        display: none;
        position: absolute;
        top: 40px;
        left: -1px;
        width: 1092px;
        // height: 200px;
        background-color: red;
        z-index: 1;
        .powerList{
            flex: 1;
            display: flex;
            &:last-child .one,&:last-child .two{
                border-bottom:1px solid #cfcfcf;
            }
            .one{
                flex: 15% 0 0;
                display: flex;
                justify-content: center;
                align-items: center;
                border-top:1px solid #cfcfcf;
            }
            .two{
                display: flex;
                flex: 85%;
                flex-direction: column;
                .children{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    border-top:1px solid  #cfcfcf;
                    .children-one{
                        flex: 15% 0 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 50px;
                    }
                    .children-two{
                        flex: 85%;
                        display: flex;
                        // justify-content: space-around;
                        flex-wrap: wrap;
                        .three{
                            display: flex;
                            align-items: center;
                            height: 50px;
                            margin-left:30px ;
                        }
                    }
                }
            }
        }
    }
}
.triangle{
    position: relative;
}
.triangle::after{
    position: absolute;
    right: -25px;
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 8px solid #ffff00;
    border-top-color:transparent;
    border-right-color:transparent;
    border-bottom-color:transparent;
}
</style>
