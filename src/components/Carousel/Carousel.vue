<template>
    <div class="slider-wrapper">
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
      <button type="button" class="slider-btn-prev iconfont">&#xe600;</button>
      <button type="button" class="slider-btn-next iconfont">&#xe602;</button>
    </div>
</template>

<style>
  .slider-wrapper{position:relative;display: flex;}
  .slider-item{}
  .slider-btn-prev,.slider-btn-next{position:absolute;top:50%;margin-top:-35px;padding:20px 7px;font-size: 26px;color:#aaa}
  .slider-btn-prev:hover,.slider-btn-next:hover{background-color:rgba(0,0,0,.3);color:#fff}
  .slider-btn-prev{left:232px;}
  .slider-btn-next{right:-2px;}
</style>
<script>
    export default {
      data(){
        return{
          slideIndex:0,
          slide_x:400,
          slide_maxIndex:1,

        }
      },
      mounted(){
        this.initSlider();
      },
      methods:{
        initSlider(){
          let slide_dom = document.querySelector(".slider-wrapper");
          console.log(document.querySelector(".slider-wrapper"))
          this.slide_x = slide_dom.offsetWidth;
          this.slide_maxIndex = Math.abs(slide_dom.children.length) - 2;
          var slideTimeout = setInterval(()=>{this.slide},2000);

          function slide(){
            console.log(this.slide_maxIndex)
            this.slideIndex++;
            if(this.slideIndex > this.slide_maxIndex){
              this.slideIndex == 0;
            }
            slide_dom.style.transformX = "translateX(" + this.slide_x * this.slideindex + "px)"
          }
        },

      }
    }
</script>
