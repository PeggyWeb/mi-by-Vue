<template>
  <div id="app">
    <top-bar></top-bar>
    <img src="./assets/img/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
  import Bar from './components/TopBar.vue'
export default {
    components:{
        'top-bar':Bar
      }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
