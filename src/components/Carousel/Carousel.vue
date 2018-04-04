<template>
  <div>
    <div class="slider-wrapper" name="fade">
      <div class="slider-item">
        <a href="#">
          <img src="/static/img/slilder.jpg"/>
        </a>
      </div>
      <div class="slider-item">
        <a href="#">
          <img src="/static/img/slider2.jpg"/>
        </a>
      </div>
      <div class="slider-item">
        <a href="#">
          <img src="/static/img/slider3.jpg"/>
        </a>
      </div>
    </div>
    <button type="button" class="slider-btn-prev iconfont" @click="prev()">&#xe600;</button>
    <button type="button" class="slider-btn-next iconfont" @click="next()">&#xe602;</button>
    <ul class="slide-nav">
      <li v-for="n in nav_length" class="slide-nav-item" :class="n == (slideIndex+1)?'active':''"></li>
    </ul>
  </div>
</template>

<style>
  .slider-wrapper{display: flex;transition:transform .5s}
  .slider-item{}
  .slider-btn-prev,.slider-btn-next{position:absolute;top:50%;margin-top:-35px;padding:20px 7px;font-size: 26px;color:#aaa}
  .slider-btn-prev:hover,.slider-btn-next:hover{background-color:rgba(0,0,0,.3);color:#fff}
  .slider-btn-prev{left:232px;}
  .slider-btn-next{right:-2px;}
  .slide-nav{position:absolute;right:30px;bottom:30px;}
  .slide-nav-item{float: left;width:10px;height:10px;margin-left:10px;border:2px solid #aaa;border-radius:50%;background-color:#888; }
  .slide-nav-item.active{background-color:#fff;border:2px solid #888;}
</style>
<script>
    export default {
      data(){
        return{
          slideIndex:0,
          slide_x:400,
          slide_maxIndex:1,
          nav_length:0,
          slide_dom:{},
          slide_inter:{}
        }
      },

      mounted(){
        this.initSlider();
      },
      methods:{
        initSlider(){
          this.slide_dom= document.querySelector(".slider-wrapper");
          this.slide_x = this.slide_dom.offsetWidth;
          this.nav_length = Math.abs(this.slide_dom.children.length);
          this.slide_maxIndex = Math.abs(this.slide_dom.children.length) -1;
          this.slide_inter = setInterval(()=>{this.slide()},4000);
        },
        slide(){
          if(this.slideIndex >= this.slide_maxIndex){
            this.slideIndex = 0;
          }else{
            this.slideIndex++;
          }
          this.slide_dom.style.transform = "translateX(-"+this.slide_x * this.slideIndex+"px)"
        },
        change(){
          this.slide_dom.style.transform = "translateX(-"+this.slide_x * this.slideIndex+"px)"
          this.slide_inter = setInterval(()=>{this.slide()},4000);
        },
        prev(){
          clearInterval(this.slide_inter);
          if(this.slideIndex > 0){
            this.slideIndex--;
            this.change();
          }else{
            this.slideIndex = 0;
            this.change();
          }
        },
        next(){
          clearInterval(this.slide_inter);
          if(this.slideIndex < this.slide_maxIndex){
            this.slideIndex++;
            this.change();
          }else{
            this.slideIndex=0;
            this.change();
          }
        }
      },

    }
</script>
