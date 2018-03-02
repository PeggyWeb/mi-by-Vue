<template>
  <div class="home-stage">
    <h2 class="section-title">内容</h2>
    <ul class="stage-list" >
      <li class="stage-item" v-for="item in hotList.stageList" >
        <h3 class="stage-name">{{item.stage}}</h3>
        <ul class="item-list" :style="{marginLeft: currPage*(-296) + 'px'  }">
          <li v-for="(good,index) in item.goodsList">
            <h4 class="name">{{good.gname}}</h4>
            <p class="desc">{{good.gdesc}}</p>
            <p class="price">{{good.price }}</p>
            <a href="" class="img-wrap">
              <img src="../../static//img/sgood01.png">
            </a>
          </li>
          <!--<li>
            <h4 class="name">哈利波特与被诅咒的孩子</h4>
            <p class="desc">“哈利·波特”第八个故事中文版震撼来袭！特别彩排版剧本！</p>
            <p class="price">29.37</p>
            <a href="" class="img-wrap">
              <img src="../../static/img/sgood01.png">
            </a>
          </li>
          <li>
            <h4 class="name">哈利波特与被诅咒的孩子</h4>
            <p class="desc">“哈利·波特”第八个故事中文版震撼来袭！特别彩排版剧本！</p>
            <p class="price">29.37</p>
            <a href="" class="img-wrap">
              <img src="../../static/img/sgood01.png">
            </a>
          </li>-->
        </ul>
        <ul class="page-control">
          <li v-for="(item,index) in item.goodsList.length" :class="{'active':currPage===index}"></li>
        </ul>
        <div class="page-button">
          <span class="iconfont btn-previous" @click="chanegeslide(item,-1,$event)">&#xe600;</span>
          <span class="iconfont btn-next" @click="chanegeslide(item,1,$event)">&#xe602;</span>
        </div>
      </li>
      <!--<li class="stage-item">
        <h3 class="stage-name">图书</h3>
        <ul class="item-list">

          <li>
            <h4 class="name">哈利波特与被诅咒的孩子</h4>
            <p class="desc">“哈利·波特”第八个故事中文版震撼来袭！特别彩排版剧本！</p>
            <p class="price">29.37</p>
            <a href="" class="img-wrap">
              <img src="../../static/img/sgood01.png">
            </a>
          </li>

        </ul>
        <ul class="page-control">
          <li class="active"></li><li></li><li></li>
        </ul>
        <div class="page-button">
          <a href="javascript:void(0);" class="iconfont btn-previous">&#xe600;</a>
          <a href="javascript:void(0);" class="iconfont btn-next">&#xe602;</a>
        </div>
      </li>-->
    </ul>
    </transition>
  </div>
</template>
<style>
.fade-enter-active,.fade-leave-active{
  transition:opacity .5s;
}
.fade-enter,.fade-leave-to{opacity: 0;transform:translateX(296px);}
</style>
<script>
  export default{
      data(){
          return{
              currPage:0,
              hotList:[]
          }
      },
    filters:{
          formatMoney:value=>{
              return '￥'+value.toFixed(2);
          }
    },
    mounted(){
          this.fetchData();
    },methods:{
        fetchData(){
            this.$http.get('./data/hotGoods.json').then(res=>{
                this.hotList=res.data
              // console.log(this.hotList)
            }).catch(err=>{
                console.log("sorry,losing way" +err);
          })
        },
        slideindex:function(){
          this.$set()
        },
        chanegeslide:function(good,distange,event){
          if(typeof good.currPage == 'undefined'){
            this.$set(good,'currPage')
          }
          if(distange>0){
            if(this.currPage<Math.floor(this.hotList.stageList.length)){
              this.currPage++;
              if(this.currPage>=3)this.currPage=0
            }
          }else if(distange<0){
            if(this.currPage>0&&this.currPage!==0){
              this.currPage--;
            }
          }else{return}
              console.log(this.currPage);
          if(event)
            event.preventDefault()
        }
    }
  }
</script>
