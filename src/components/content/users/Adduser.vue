<template>
    <div class="adduser-container" @click.self="$emit('close', 'add')">
        <div class="add-box">
            <input type="text" placeholder="请输入用户名称" v-model.trim="addData.username" />
            <div v-show="unameShow" class="usernametip">用户名不能少于5位和大于15位</div>
            <input type="text" placeholder="请输入用户密码" v-model.trim="addData.password" />
            <div v-show="pwordShow" class="passwordtip">密码不能少于6位和大于16位</div>
            <input type="text" placeholder="请输入邮箱地址" v-model.trim="addData.email" />
            <div v-show="emailShow" class="emailtip">请输入正确的邮箱地址</div>
            <input type="text" placeholder="请输入手机号码" v-model.trim="addData.mobile" />
            <div v-show="mobileShow" class="mobiletip">请输入正确的手机号码</div>
            <div>
                <button @click="add">确认</button>
                <button @click.stop="$emit('close', 'add')">取消</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Adduser',
    data() {
        return {
            addData: {
                username: '',
                password: '',
                email: '',
                mobile: ''
            } //添加表单数据
        };
    },
    computed: {
        unameShow() {
            return this.addData.username.length < 5 || this.addData.username.length > 15;
        },
        pwordShow() {
            return this.addData.password.length < 6 || this.addData.password.length > 16;
        },
        emailShow() {
            const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z-9_-])+/;
            return !reg.test(this.addData.email);
        },
        mobileShow() {
            const reg = /0?(13|14|15|17|18|19)[0-9]{9}/;
            return !reg.test(this.addData.mobile);
        }
    },
    methods: {
        //添加成功后可调此方法重置表单
        reset() {
            this.addData.username = this.addData.password = this.addData.email = this.addData.mobile = '';
        },
        //添加用户数据方法
        async add() {
            if (!this.unameShow && !this.pwordShow && !this.emailShow && !this.mobileShow) {
                const response = await this.axios.post('users', this.addData);
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
.adduser-container {
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
        height: 400px;
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
        .usernametip,
        .passwordtip,
        .mobiletip,
        .emailtip {
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
        .usernametip {
            top: 45px;
        }
        .passwordtip {
            top: 125px;
        }
        .mobiletip {
            top: 285px;
        }
        .emailtip {
            top: 205px;
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
