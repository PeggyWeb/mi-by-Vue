<template>
  <div id="Home">
    <div class="container">
      <top-header></top-header>
    </div>
    <img src="../assets/img/logo.png">
  </div>
</template>
<style>

</style>
<script>
  import TopHeader from './TopHeader.vue'
  export default {
    components:{
      'top-header':TopHeader
    }

  }
</script>
