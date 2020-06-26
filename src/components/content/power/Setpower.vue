<template>
    <div class="setpower-container" @click.self="$emit('close', 'set')">
        <div class="add-box">
            <ul class="power-list">
                <li v-for="itemOne in powerList" :key="itemOne.id">
                    <div class="triangle" style="margin: 8px 0;" @click.self="toggle">
                        <input type="checkbox" :id="itemOne.id" :value="itemOne.id" v-model="mydefaultPower">
                        <label class="el-icon-check" :for="itemOne.id">{{itemOne.authName}}</label>
                    </div>
                    <ul style="margin-left: 25px;">
                        <li v-for="itemTwo in itemOne.children" :key="itemTwo.id">
                           <div class="triangle2" style="margin: 8px 0;" @click.self="toggle">
                                <input type="checkbox" ref="twoPower" :id="itemTwo.id" :value="itemTwo.id" v-model="mydefaultPower">
                                <label class="el-icon-check" :for="itemTwo.id">{{itemTwo.authName}}</label>
                           </div>
                            <ul style="margin-left: 25px;">
                                <li v-for="itemThree in itemTwo.children" :key="itemThree.id">
                                    <div style="margin: 8px 0;">
                                        <input type="checkbox" ref="threePower" :id="itemThree.id" :value="itemThree.id" v-model="mydefaultPower">
                                        <label class="el-icon-check" :for="itemThree.id">{{itemThree.authName}}</label>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="btn">
                <button @click="setPower">确认</button>
                <button @click.stop="$emit('close','set')">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Setpower',
    props:{
        powerList:{
            type:Array,
            default(){
                return []
            }
        },
        defaultPower:{
            type:Array,
            default(){
                return []
            }
        },
        rid:{
            type:Number,
            default:null,
        },
    },
    data() {
        return {
           mydefaultPower: this.defaultPower,
        }
    },
    watch:{
        mydefaultPower(newData){
            this.$emit('update:defaultPower',newData);
        },
    },
    methods: {
        //重置表单
        reset() {
            this.mydefaultPower = [];
        },
        //分配权限方法
        async setPower(){
            const response = await this.axios.post(`roles/${this.rid}/rights`,{rids:this.mydefaultPower.join(',')});
            console.log(response);
            if(response.meta.status == 200){
                this.$message({message:response.meta.msg,type:'success'});
                this.$emit('setSuccess');
                // this.$emit('close','set');
            }else{
                this.$message({message:response.meta.msg,type:'error'});
            }
        },
        toggle(){
            event.target.classList.toggle('triangleActive');
            event.target.nextSibling.classList.toggle('show');
        },
    }
};
</script>

<style scoped lang="less">
.setpower-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 180%;
    background-color: rgba(38, 38, 38, 0.3);
    z-index: 7;
    .add-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 360px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #f8f8f8;
        .power-list{
            margin-top:20px ;
            width: 240px;
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
        input[type='checkbox']{
           // width: 0;
           // height: 0;
           // position: relative;
           display: none;
        }
        input:checked+ .el-icon-check::before{
            background-color: #00aaff;
        }
        .el-icon-check{
            position: relative;
            cursor: pointer;
        }
        .el-icon-check::before{
            content: '\e6da';
            position: absolute;
            top: -2px;
            left: -25px;
            display: block;
            width: 16px;
            height: 16px;
            text-align: center;
            line-height: 16px;
            color: white;
            font-weight: 900;
            border: 1px solid #666666;
            background-color: white;
        }
    }
}
.triangle{
    position: relative;
    cursor: pointer;
}

.triangle::after{
    position: absolute;
    right: 270px;
    top: 5px;
    transform: rotate(90deg);
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 7px solid #b3b3b3;
    border-top-color:transparent;
    border-right-color:transparent;
    border-bottom-color:transparent;
}
.triangle2{
    position: relative;
    cursor: pointer;
}
.triangle2::after{
    position: absolute;
    right: 245px;
    top: 5px;
    transform: rotate(90deg);
    content: '';
    display: block;
    width: 0;
    height: 0;
    border: 7px solid #b3b3b3;
    border-top-color:transparent;
    border-right-color:transparent;
    border-bottom-color:transparent;
}
.triangleActive::after{
    // right: 265px;
    top: 0px;
    transform: rotate(0deg);
     transform: translateX(5px);
}
.show{
        display: none!important;
    }
</style>
