<template>
  <div>
    <nav-bread>

    </nav-bread>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>My Cart</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li v-for="item in cartList">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn iconfont" @click="editCart('check',item)">
                      {{item.checked == '0'? '&#xe75d;' : '&#xe619;'}}
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img :src="'/static/product/'+item.productImage" :alt="item.productName"/>
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.productName}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.salePrice | currency('$')}}</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="editCart('minu',item)">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a class="input-add" @click="editCart('add',item)">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{(item.productNum*item.salePrice) | currency('$')}}</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="delCartComfirm(item.productId)">
                      <span class="iconfont">&#xe656;</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;" class="checkbox-btn item-check-btn " @click="toggleCheckAll">
                    <span class="iconfont">
                      {{checkAllFlag?'&#xe619;':'&#xe75d;'}}
                    </span>
                  <span>Select all</span>
                </a>

              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">{{totalPrice | currency('$')}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" :class="{'btn-dis':checkedCount==0}" @click="checkOut">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 模态框 -->
    <Modal :mdShow="modalShowCart" @close="closeModal">
      <p slot="message">你确认要删除此条数据吗？</p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="delCart">确认</a>
        <a href="javascript:;" class="btn btn--m" @click="modalShowCart = false">关闭</a>
      </div>
    </Modal>
  </div>
</template>
<style>
  .item-edit-btn {
    font-size: 22px
  }

  .item-check-btn.iconfont {
    border: 0;
    font-size: 20px;
    color: #d1434a
  }

  .item-check-btn {
    border: 0;
    font-size: 20px;
    color: #d1434a
  }
</style>
<script>
  import '../../assets/css/base.css'
  import '../../assets/css/product.css'
  import {currency} from '@/util/currency.js'
  import Modal from '@/components/Modal/Modal'
  import NavBread from '@/components/NavBread'

  import axios from 'axios'
  export default{
    data(){
      return {
        cartList: [],
        productId: '',
        modalShowCart: false,
      }
    },
    filters:{
      currency:currency
    },
    components: {
      Modal,
      NavBread
    },
    mounted(){
      this.init();
    },
    computed: {
      checkAllFlag(){
        return this.checkedCount == this.cartList.length;
      },
      checkedCount(){
        var i = 0;
        this.cartList.forEach((item) => {
          if (item.checked == '1') i++
        })
        return i;
      },
      totalPrice(){
          var money = 0;
          this.cartList.forEach((item)=>{
              if(item.checked == '1'){
                  money+=parseFloat(item.salePrice)*parseInt(item.productNum);
              }
          })
        return money;
      },

    },
    methods: {
      init(){
        axios.get("/users/cart").then((response) => {
          let res = response.data;
          this.cartList = res.result;
        })
      },
      delCartComfirm(productId){
        this.productId = productId;
        this.modalShowCart = true;
      },
      delCart(){
        axios.post("/users/cart/del", {
          productId: this.productId
        }).then((response) => {
          let res = response.data;
          if (res.status == '0') {
            this.modalShowCart = false;
            this.init();
          }
        })
      },
      closeModal(){
        this.modalShowCart = false;
      },
      editCart(flag, item){
        if (flag == 'add') {
          item.productNum++;
        } else if (flag == 'minu') {
          if (item.productNum <= 1) {
            return;
          }
          item.productNum--;
        } else {
          item.checked = item.checked == "1" ? '0' : '1';
        }
        axios.post("/users/cartEdit", {
          productId: item.productId,
          productNum: item.productNum,
          checked: item.checked
        }).then((response) => {
          let res = response.data;
//          if (res.status == '0') {
//
//            this.init();
//          }
        })
      },
      toggleCheckAll(){
        let flag = !this.checkAllFlag;
        this.cartList.forEach((item) => {
          item.checked = flag?'1':'0';
        })
        axios.post('/users/editCheckAll', {
          checkAll: flag
        }).then((response) => {
          let res = response.data;
          if (res.status == '0') {
            console.log("update success")
          }
        })
      },
      checkOut(){
        if(this.checkedCount>0){
          this.$router.push({
            path:"/address"
          });
        }
      }
    }
  }
</script>
