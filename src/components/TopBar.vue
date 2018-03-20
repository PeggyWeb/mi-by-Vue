<template>
  <header id="topbar">
    <div class="container">
      <div class="topbar-nav">
        <router-link to="/Home">
          小米商城
        </router-link>
        <a href="#">MIUI</a>
      </div>
      <div class="topbar-cart fr">
        <router-link to="/Cart">
          <a href="#" rel="nofollow"><span class="iconfont">&#xe698;</span>购物车</a>
        </router-link>
      </div>
      <div class="topbar-info fr">
        <a href="javascript:void (0);" v-text="nickName" v-if="nickName"></a>
        <a href="javascript:void (0);" @click="loginModalFlag=true" v-if="!nickName">
          登录
        </a>
        <a href="javascript:void (0);" @click="logOut" v-if="nickName">
          登出
        </a>
        <router-link to="/Home" v-if="!nickName">
          注册
        </router-link>
        <router-link to="/contact" v-if = "nickName">
          客服
        </router-link>
        <span class="message">
            <a href="#" rel="nofollow">消息中心</a>
          </span>
      </div>
    </div>
    <!--登录弹窗-->
    <div class="md-modal modal-msg md-modal-transition " :class="{'md-show':loginModalFlag}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">Login in</div>
          <button class="md-close" @click="loginModalFlag = false">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left"
                       placeholder="User Name">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" name="password" v-model="userPwd"
                       class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password"
                       @keyup.enter="login"><!-- @keyup.enter="login"实现回车登录 -->
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登 录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag=false"></div>
  </header>

</template>
<style>

</style>
<script>
  import '../assets/css/login.css'
  import axios from 'axios'
  export default{
    data(){
      return {
        userName: '',
        userPwd: '',
        errorTip: false,
        loginModalFlag: false,
        nickName: ''
      }
    },
    mounted: function(){
        this.checkLogin();
    },
    methods: {
      //检查登录
      checkLogin(){
        axios.get("/users/checkLogin").then((response) => {
          let res = response.data;
          if (res.status == '0') {
            this.nickName = res.result;
          }
        })
      },
      //登录
      login(){
        if (!this.userName && !this.userPwd) {
          this.errorTip = true;
          return;
        } else {
          this.errorTip = false;
          axios.post("/users/login", {
            userName: this.userName,
            userPwd: this.userPwd
          }).then((response) => {
            let res = response.data;
            if (res.status == '0') {
              this.errorTip = false;
              this.loginModalFlag = false;
              this.nickName = res.result.userName;
              window.location.reload();
            } else {
              this.errorTip = true;
            }

          })
        }

      },
      logOut(){
        axios.post('/users/logout').then((response) => {
          let res = response.data;
          if (res.status == "0") {
            this.nickName = "";
            window.location.reload();
          }
        })
      }
    }
  }
</script>
