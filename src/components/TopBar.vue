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
        <router-link to="/Login">
          登录
        </router-link>
        <router-link to="/Home">
          注册
        </router-link>

          <span class="message">
            <a href="#" rel="nofollow">消息中心</a>
          </span>


      </div>
    </div>
  </header>
</template>
<style>

</style>
<script>

</script>
