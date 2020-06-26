<template>
   <div class="setrole-container" @click.self="$emit('close','set')">
       <div class="add-box">
           <div class="title">用户:<span>{{setData.uname}}</span> 当前的角色为:<span>{{setData.rname}}</span></div>
           <select v-model="roleId">
               <option value="请选择">请选择</option>
               <option v-for="item in setData.roleList" :key="item.id" :value="item.id">{{item.roleName}}</option>
           </select>
           <div class="btn">
               <button @click="setRole(setData.uid)">确认</button>
               <button @click.stop="$emit('close','set')">取消</button>
           </div>
       </div>
   </div>
</template>

<script>
    export default {
        name:'Setrole',
        props:{
            setData:{
                type:Object,
                default(){
                    return {}
                }
            },
        },
        data() {
            return {
                roleId: '请选择',
            }
        },
        methods:{
           async setRole(id){
                const response = await this.axios.put(`users/${id}/role`,{rid:this.roleId});
                if(response.meta.status == 200){
                      this.$message({ message: response.meta.msg, type: 'success' });
                      this.reset();
                      this.$emit('close', 'set');
                      this.$emit('setSuccess');
                }else{
                    this.$message({ message: response.meta.msg, type: 'error' });
                }
            },
            reset(){
                this.roleName = '请选择';
            },
        },
               
    }
</script>

<style lang="less" scoped>
    .setrole-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(38, 38, 38, 0.3);
        .add-box {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            width: 420px;
            height: 240px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-color: #f8f8f8;
            .title{
                width: 380px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                span{
                    color: red;
                }
            }
            select{
                width: 200px;
                height: 30px;
            }
            .btn {
                display: flex;
                width: 260px;
                justify-content: space-around;
                margin: 20px 0;
                button {
                    height: 40px;
                    width: 60px;
                    margin: 0 10px;
                    background-color: #a3a8a2;
                }
            }
        }
    }
</style>
