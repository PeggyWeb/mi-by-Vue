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
        <input class="search-text" id="search" name="keyword"  /><input class="search-btn iconfont icon-search" value="&#xe6ac;"/>
      </form>
    </div>
    <header-aside></header-aside>
    <header-server></header-server>
  </div>
</template>
<style>

</style>
<script>
import Aside from './Aside.vue'
import hServer from './hServer.vue'
  export default{
    components:{
        'header-aside':Aside,
        'header-server':hServer
    }
  }
</script>
