<template>
    <div class="toast-container" v-show="isShow" @click.self="isShow = !isShow">
        <div class="msg-box">
            <div class="tip-msg">
                {{message}}
            </div>
            <div class='btn'>
                <button @click="callback">确认</button>
                <button @click.stop="isShow = !isShow">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Toast',
    data() {
        return {
            message: '',
            isShow: false,
        };
    },
    methods:{
        callback(){},
    },
};
</script>

<style scoped lang="less">
.toast-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(38, 38, 38, 0.3);
    z-index: 5;
    .msg-box {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 420px;
        height: 140px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #f8f8f8;
        .tip-msg{
            display: flex;
            width: 300px;
            height: 100px;
            margin: 10px 0;
            justify-content: center;
            align-items: center;
            color: red;
            font-size: 18px;
        }
        .btn {
            display: flex;
            width: 260px;
            justify-content: space-around;
            margin: 10px 0;
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
