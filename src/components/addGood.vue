<template>
    <div class="addgoods">
      <form onSubmit="return false" id="goodfrom">
        <label>名称<input type="texet" v-model="good.productName"/></label>
        <label>价格<input type="texet" v-model="good.salePrice" /></label>
        <label>image<input type="texet" v-model="good.productImage"/></label>
        <label>url<input type="texet" v-model="good.productUrl"/></label>
        <label>种类所属<input type="texet" v-model="good.stage"/></label>
        <button type="reset">重置</button>
        <button type="button" @click="add">提交</button>
      </form>
    </div>
</template>

<style>
  .addgoods{padding-top:60px;text-align:center}
  label{display: block}
  button{padding:10px;border:1px solid #666}
</style>
<script>
  import axios from "axios"
  export default {
      data(){
          return{
              good:{}
          }
      },
      methods:{
          add(){
             let formData = JSON.stringify(this.good);
            axios.post('goods/addGoods',{good:formData}).then(function(res){
             }).catch(function(err){
             });
          }
      }

  }
</script>
