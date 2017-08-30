<template>
  <div id="Home">
    <div class="container">
      <top-header></top-header>

    </div>
    <good-section></good-section>
    <hot-product></hot-product>
    <img src="../assets/img/logo.png">
  </div>
</template>
<style>

</style>
<script>
  import TopHeader from './TopHeader.vue'
  import GoodSection from './GoodSection.vue'
  import HotProduct from './HotProduct.vue'
  export default {
    components:{
      'top-header':TopHeader,
      'good-section':GoodSection,
      'hot-product':HotProduct
    }

  }
</script>
