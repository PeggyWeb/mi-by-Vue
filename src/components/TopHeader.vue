<template>
  <div class="site-header" id="topheader">
    <div class="header-logo">
      <a href="#" class="logo"></a>
    </div>
    <div class="header-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <a href="#">小米手机</a>
        </li>
        <li class="nav-item">
          <a href="#">红米</a>
        </li>
        <li class="nav-item">
          <a href="#">平板·笔记本</a>
        </li>
        <li class="nav-item">
          <a href="#">电视</a>
        </li>
      </ul>
    </div>
    <div class="header-nav-menu">
      <div class="container">
        <ul class="children-list">
          <li>
            <div class="figure">
              <a href="#">
                <img src="../../static/img/3C.png" />
              </a>
            </div>
            <div class="title">
              <a href="#">红米Note 4X</a>
            </div>
            <span class="price">999元起</span>
          </li><li>
          <p class="flags"><span class="flag">现货</span></p>
          <div class="figure">
            <a href="#">
              <img src="../../static/img/3C.png" />
            </a>
          </div>
          <div class="title">
            <a href="#">红米Note 4X</a>
          </div>
          <span class="price">999元起</span>
        </li><li>
          <div class="figure">
            <a href="#">
              <img src="../../static/img/3C.png" />
            </a>
          </div>
          <div class="title">
            <a href="#">红米Note 4X</a>
          </div>
          <span class="price">999元起</span>
        </li>
        </ul>
      </div>
    </div>
    <div class="header-search fr">
      <form class="search-from">
        <input class="search-text" id="search" name="keyword"  /><a class="search-btn iconfont icon-search">&#xe6ac;</a>
      </form>
    </div>
    <div class="home-slide">
      <header-aside></header-aside>
      <slider></slider>
    </div>
    <ul class="home-server">
      <li class="home-server-item ">
        <a href="#" class="home-server-icon"><span class="iconfont">&#xe601;</span>选购手机</a><a href="#" class="home-server-icon"><span class="iconfont">&#xe61a;</span>企业团购</a><a href="#" class="home-server-icon"><span class="iconfont">&#xe670;</span>一元活动</a><a href="#" class="home-server-icon"><span class="iconfont">&#xe6d1;</span>米粉卡</a><a href="#" class="home-server-icon"><span class="iconfont">&#xe658;</span>以旧换新</a><a href="#" class="home-server-icon"><span class="iconfont">&#xe63e;</span>话费充值</a>
      </li><li class="home-server-item">
      <a href="#"><img src="../../static//img/mi-servers-01.jpg" /></a>
    </li><li class="home-server-item">
      <a href="#"><img src="../../static//img/mi-serves-02.jpg" /></a>
    </li><li class="home-server-item">
      <a href="#"><img src="../../static/img/mi-serves-03.png" /></a>
    </li>
    </ul>
  </div>
</template>
<style>
  .home-slide{position:relative}
</style>
<script>
import Aside from './Aside.vue'
import slider from './Carousel/Carousel'
  export default{
    components:{
      'header-aside':Aside,
      slider
    }
  }
</script>
