<template>
  <div id="app">
    <!--<loading v-show="loading"></loading>-->
    <top-bar v-show="headerShow"></top-bar>
    <router-view></router-view>
    <footer_view></footer_view>
  </div>
</template>

<script>
  import Top_view from './components/TopBar.vue'
  import Home from './components/Home.vue'
  import footer_view from './components/Footer.vue'
  import {mapGetters,matpActions} from 'vuex'
export default {
    computed:mapGetters([
      'headerShow',
      'loading'
    ]),
    watch:{
        $route(to,from){
            if(to.path=='/Login'){
                this.$store.dispatch('hideHeader');
            }else{
                this.$store.dispatch('showHeader')
            }
        }
    },
    created(){

    },
    methods:{

    },
    components:{
        'top-bar':Top_view,
        'home-index':Home,
        'footer_view':footer_view,

      }

}
</script>

<style>

</style>
