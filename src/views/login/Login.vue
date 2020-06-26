<template>
	<div class="login-container" @keyup.enter="login">
        <div class="login">
            <img src="../../assets/logo.png">
            <el-input placeholder="请输入用户名"  @input="tip" class="username" prefix-icon="el-icon-user"  v-model.trim="username"> </el-input>
            <div v-show="username.length < 5 || username.length > 15" class="usernametip">{{usernameTip}}</div>
			<el-input placeholder="请输入密码"  @input="tip" class="password" prefix-icon="el-icon-lock"  v-model.trim="password" show-password> </el-input>
            <div v-show="password.length < 6 || password.length > 16" class="passwordtip" >{{passwordTip}}</div>
			<div class="login-btn">
                <el-button type="primary" @click="login">登陆</el-button>
                <el-button type="info" @click.native='reset' >重置</el-button>
			</div>
		</div>
    </div>
</template>

<script>
	export default{
		name:'Login',
		data(){
			return{
				username:'admin', //用户名
				password:'123456', //密码
                usernameTip:'',//提示信息
                passwordTip:'',//提示信息
			}
		},
        methods:{
           //重置表单方法
            reset(){
                this.username = ''
                this.password = ''
            },
            //登陆方法
           async login(){
               if(this.username.length >= 5 && this.username.length <= 15 && this.password.length >= 6 && this.password.length <= 16 ){
                   const response = await this.axios.post('login',{username:this.username,password:this.password})
                  if(response.meta.status == 200){
                        this.$message({message:response.meta.msg,type:'success'})
                       sessionStorage.setItem('token',response.data.token)
                       this.$router.push('/home')
                  }
                  else{
                      this.$message({message:response.meta.msg,type:'error'})
                  }
               } 
               else{
                   this.$message({message:'请输入符合规则的数据',type:'warning'})
               }
            },
          //提示信息框方法
          tip(){
                if (this.username.length < 5 && this.username.length > 0){
                    this.usernameTip = '用户名不能 少于5位!'
                }else if(this.username.length > 15 ){
                    this.usernameTip = '用户名不能大于15位!'
                }else if(this.username.length == 0){
                    this.usernameTip = '用户名不能为空!'
                }
                
                if (this.password.length < 6  && this.password.length > 0){
                    this.passwordTip = '密码不能 少于6位!'
                }else if(this.password.length > 16 ){
                    this.passwordTip = '密码名不能大于16位!'
                }else if(this.password.length == 0){
                    this.passwordTip = '密码名不能为空!'
                }
                
            },
            
        },
		
	}
</script>

<style lang="less" scoped>
    .login-container{
        position: relative;
        background-color: rgb(212, 212, 212);
        height: 657px;
        .login{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 400px;
            height: 300px;
            transform: translate(-50%,-50%);
            background-color: white;
            box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
            img{
                position: absolute;
                top: -50px;
                left: 50%;
                margin-left: -50px;
                width: 100px;
                height: 100px;
                animation: rotateY 2s infinite linear forwards;
				z-index: 1;
            }
            .login-btn{
                display: flex;
                justify-content: space-around;
            }
			.username,.password,.login-btn{
				width: 80%;
                margin-top: 40px;
			}
            .usernametip,.passwordtip{
               display: flex;
               height: 30px;
               width: 320px;
               justify-content: center;
               align-items: center;
               border: 1px solid #d8d8d8;
               border-radius:5px ;
               color: red;
            }
            .usernametip{
                position: absolute;
                top: 115px;
                left: 50%;
                transform: translateX(-50%);
            }
            .passwordtip{
                position: absolute;
                top: 195px;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
    
   @keyframes rotateY{
       from{
           transform: rotateY(0deg);
       }
       to{
            transform: rotateY(360deg);
       }
   }
</style>