<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view></router-view>
    <footer_view></footer_view>
  </div>
</template>

<script>
  import Top_view from './components/TopBar.vue'
  import Home from './components/Home.vue'
  import footer_view from './components/Footer.vue'
export default {
    components:{
        'top-bar':Top_view,
        'home-index':Home,
        'footer_view':footer_view
      }

}
</script>

<style>

</style>
