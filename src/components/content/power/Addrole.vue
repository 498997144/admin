<template>
    <div class="addrole-container" @click.self="$emit('close', 'add')">
        <div class="add-box">
            <input type="text" placeholder="请输入角色名称" v-model.trim="addData.roleName" />
            <div v-show="rnameShow" class="rnametip">角色名称不能为空</div>
            <input type="text" placeholder="请输入角色描述" v-model.trim="addData.roleDesc" />
            <div v-show="descShow" class="desctip">角色描述不能为空</div>
            <div>
                <button @click="add">确认</button>
                <button @click.stop="$emit('close', 'add')">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Addrole',
    data() {
        return {
            addData: {
                roleName: '',
                roleDesc: '',
            } //添加表单数据
        };
    },
    computed:{
        rnameShow(){
            return this.addData.roleName.length < 1;
        },
        descShow(){
            return this.addData.roleDesc.length < 1;
        },
    },
    methods: {
        //添加成功后可调此方法重置表单
        reset() {
            this.addData.roleName = this.addData.roleDesc = '';
        },
        //添加角数据方法
        async add() {
            if (!this.rnameShow && !this.descShow) {
                const response = await this.axios.post('roles', this.addData);
                if (response.meta.status == 201) {
                    this.$message({ message: response.meta.msg, type: 'success' });
                    this.$emit('addSuccess');
                    this.reset();
                } else {
                    this.$message({ message: response.meta.msg, type: 'error' });
                }
            } else {
                this.$message({ message: '请按规则填写数据', type: 'warning' });
            }
        }
    }
};
</script>

<style scoped lang="less">
.addrole-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(38, 38, 38, 0.3);
    .add-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 420px;
        height: 240px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #f8f8f8;
        input {
            border-radius: 5px;
            border: 1px solid #dadada;
            height: 40px;
            width: 260px;
            padding-left: 10px;
            margin: 20px 0;
        }
        .rnametip,
        .desctip
        {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            height: 30px;
            width: 260px;
            justify-content: center;
            align-items: center;
            border: 1px solid #d8d8d8;
            border-radius: 5px;
            color: red;
        }
        .rnametip {
            top: 45px;
        }
        .desctip {
            top: 125px;
            }
        div {
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
