<template>
    <div class="paginate">
      <ul class="page-list">
        <li class="iconfont page-item" @click="prev">&#xe600;</li>
        <li class="page-item" v-for="n in pageCount" v-bind:class="[pageIndex==n?'active':'']" @click="changePage(n)">{{n}}</li>
        <li class="iconfont page-item" v-show="pageCount>8">&#xe609;</li>
        <li class="iconfont page-item" @click="next">&#xe602;</li>
      </ul>
    </div>
</template>
<script>
    export default {
      props:{
        pageSize:{
          type:Number,
          default:8
        },
        page:{
          type:Number,
          default:1
        },
        goodsCount:{
          type:Number,
          default:0
        }
      },
      data(){
        return{
            pageIndex:1
        }
      },
      computed:{
        pageCount(){
          return Math.ceil(this.goodsCount/this.pageSize)
        },

      },
      methods:{
        prev(){
          if(this.pageIndex>1){
            this.pageIndex--;
            this.$emit('goPage',this.pageIndex)
          }else{
            return ;
          }
        },
        next(){
            if(this.pageIndex<this.pageCount){
                this.pageIndex++;
                this.$emit('goPage',this.pageIndex)
            }else{
                return;
            }
        },
        changePage(n){
          this.pageIndex = n;
          this.$emit('goPage',this.pageIndex)
        }
      }
    }
</script>

<style>
  .paginate{text-align:center;font-size: 18px;overflow: hidden}
  .page-list{float: right;}
  .page-item{float:left;margin:0 5px;padding:0 10px;line-height:32px;color:#333;background-color:#fff;}
  .page-item.active{background-color:#aaa;color:#fff;}
</style>
