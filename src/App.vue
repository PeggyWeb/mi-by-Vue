<template>
  <div id="app">
    <top-bar></top-bar>
    <div class="container">
      <top-header></top-header>
    </div>
    <img src="./assets/img/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
  import Bar from './components/TopBar.vue'
  import TopHeader from './components/TopHeader.vue'
export default {
    components:{
        'top-bar':Bar,
        'top-header':TopHeader
      }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
