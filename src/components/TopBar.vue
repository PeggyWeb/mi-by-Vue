<template>
  <header id="topbar">
    <div class="container">
      <div class="topbar-nav">
        <a href="#">小米商城</a><a href="#">MIUI</a>
      </div>
      <div class="topbar-cart fr">
        <a href="#" rel="nofollow"><span class="iconfont">&#xe698;</span>购物车</a>
      </div>
      <div class="topbar-info fr">
        <router-link to="/Login">
          <a href="#">登录</a>
        </router-link>
        <router-link to="/Home">
          <a href="#">注册</a>
        </router-link>
        <router-link to="/cart">
          <span class="message">
            <a href="#" rel="nofollow">消息中心</a>
          </span>
        </router-link>

      </div>
    </div>
  </header>
</template>
<style>

</style>
<script>

</script>
