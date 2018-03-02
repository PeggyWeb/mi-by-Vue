<template>
  <div>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0);" class="default cur">Default</a>
          <a href="javascript:void(0);" class="price" @click="sortGoods">Price
            <span :class="{'down':!sortFlag}"><img src="../../assets/img/up.png"/></span>
          </a>
          <a href="javascript:void(0);" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <div class="filter shopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0);" :class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0);" :class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">{{price.startPrice}}
                  -
                  {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList.list">
                  <div class="pic">
                    <!--图片懒加载-->
                    <a href="#"><img :src="'/static//product/'+item.productImage"></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div clsss="btn-area">
                      <a href="javascript:void(0);" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">
        清先登录，否则无法加入到购物车中
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    <!--购物车弹框-->
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        加入购物车成功
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart=false">关闭</a>
        <router-link class="btn btn--m" href="javascript:;" to="/cart" @click="mdShowCart=false">查看购物车</router-link>
      </div>
    </modal>
  </div>
</template>
<script>
  import '../../assets/css/base.css'
  import '../../assets/css/product.css'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal/Modal'
  import axios from 'axios'
  export default{
    data(){
      return {
        goodsList: [],
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '100.00'
          },
          {
            startPrice: '100.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
        ],
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false,
        sortFlag: true,
        page: 1,
        pageSize: 8,
        mdShow: false,
        mdShowCart: false
      }
    },
    components: {
      NavBread,
      Modal
    },
    mounted: function () {
      this.getGoodsList();
    },
    methods: {

      getGoodsList(){
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        }
        axios.get('/goods/list', {params: param}).then((res) => {
          let _res = res.data;
          if (_res.status == '0') {
            this.goodsList = _res.result;
          } else {
            this.goodsList = [];
          }
        }).catch(function (error) {
          console.log(error)
        });
      },
      showFilterPop(){
        this.filterBy = true;
        this.overLayFlag = true;
      },
      setPriceFilter(index){
        this.priceChecked = index;
        this.page = 1;
        this.getGoodsList();
        this.closePop();
      },
      closePop(){
        this.filterBy = false;
        this.overLayFlag = false;
      },
      sortGoods(){
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList();
      },
      addCart(productId){
        axios.post("/goods/addCart", {
          productId: productId
        }).then((res) => {
          let _res = res.data;
          if (_res.status == 0) {
            this.mdShowCart = true;
          } else {
            this.mdShow = true;
          }
        })
      },
      closeModal(){
        this.mdShow = false;
        this.mdShowCart = false;
      }
    },
  }
</script>
<style type="text/css">
  .price img {
    transition: all 0.3s;
    vertical-align: text-bottom;
  }

  .down img {
    transform: rotate(180deg);
  }
</style>






