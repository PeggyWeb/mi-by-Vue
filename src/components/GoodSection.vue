<template>
  <div class="home-smart">
    <div class="section-header">
      <h2 class="section-title">智能</h2>
      <ul class="section-nav">
        <li>热门</li>
        <li>电视影音</li>
        <li>电脑</li>
        <li>家居</li>
      </ul>
    </div>
    <a href="" class="img-wrap fl"><img src="../assets/img/cleanFloor.jpg" /></a>
    <ul class="goods-list">
      <!--<li class="goods-list-item">
        <span class="flag flag-new">新品</span>
        <a href="#" class="img-wrap">
          <img src="../assets/img/xmad-gd-01.png" />
        </a>
        <h3 class="good-title"><a href="">小米手环</a></h3>
        <p class="good-desc">OLED 显示屏幕，升级计步算法</p>
        <p class="good-price">588</p>
        <p class="review-wrap">
          <a href="">
            <span class="review">听说小米客服美眉很厉害送我一首藏头诗可好我爱钱天玉</span>
            <span class="author">来自橙子的</span>
          </a>
        </p>
      </li>-->
      <li v-for="(item,index) in arrList" class="goods-list-item">
        <span class="flag flag-new" v-if="item.flag">{{item.flag}}</span>
        <a href="#" class="img-wrap">
          <img :src="item.img" /><!--或者v-bind:src="item.img"-->
        </a>
        <h3 class="good-title"><a href="">{{item.gname}}</a></h3>
        <p class="good-desc">{{item.goods_des}}</p>
        <p class="good-price">{{item.price}}</p>
        <p class="review-wrap" v-if="item.review"><!--如果review存在就显示-->
          <a href="">
            <span class="review">{{item.review}}</span>
            <span class="author">{{item.review_author}}</span>
          </a>
        </p>
      </li>
    </ul>
  </div>
</template>
<style>

</style>
<script>
  export default{
      data(){
        return{
            arrList:[]
        }
      },
      mounted(){
          this.fetchData();
      },
      methods:{
          fetchData(){
            var _this = this;
            this.$http.get('./data/goodlist.json').then(function(res){

             _this.arrList=res.data;
            }).catch(function(err){

              console.log("goodSection",err);
            });
          }
      }
  }
</script>
