<template>
  <div>
    <nav-bread>
    </nav-bread>
    <div class="container">
      <div class="checkout-addr">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- process step 步骤-->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li><span>View your</span> order</li>
            <li><span>Make</span> payment</li>
            <li><span>Order</span> confirmation</li>
          </ul>
        </div>

        <!-- address list 地址列表-->
        <div class="page-title-normal checkout-title">
          <h2><span>Shipping address</span></h2>
        </div>
        <div class="addr-list-wrap">
          <div class="addr-list">
            <ul>
              <li v-for="(item,index) in addressListFilter" :class="{'check':checkIndex == index}" @click="checkIndex=index">
                <dl>
                  <dt>{{item.userName}}</dt>
                  <dd class="address">{{item.streetName}}</dd>
                  <dd class="tel">{{item.tel}}</dd>
                </dl>
                <div class="addr-opration addr-del">
                  <a href="javascript:;" class="addr-del-btn iconfont" @click="delAddressComfirm(item.addressId)">&#xe656;</a>
                </div>
                <div class="addr-opration addr-set-default">
                  <a href="javascript:;" class="addr-set-default-btn" v-if="!item.isDefault" @click="setDefault(item.addressId)"><i>Set default</i></a>
                </div>
                <div class="addr-opration addr-default" v-if="item.isDefault">Default address</div>
              </li>
              <li class="addr-new">
                <div class="add-new-inner">
                  <i class="icon-add">
                  </i>
                  <p>Add new address</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="shipping-addr-more">
            <a class="addr-more-btn up-down-btn" href="javascript:;" @click="expand" :class="{'open':limit>3}" >
              more
              <i class="i-up-down">
                <i class="i-up-down-l"></i>
                <i class="i-up-down-r"></i>
              </i>
            </a>
          </div>
        </div>

        <!-- shipping method-->
        <div class="page-title-normal checkout-title">
          <h2><span>Shipping method</span></h2>
        </div>
        <div class="lemall-msg-info hidden">
          <span>The region you selected is not within our delivery area. Please select another shipping address within our delivery areas.</span>
        </div>
        <div class="shipping-method-wrap">
          <div class="shipping-method">
            <ul>
              <li class="check">
                <div class="name">Standard shipping</div>
                <div class="price">Free</div>
                <div class="shipping-tips">
                  <p>Once shipped，Order should arrive in the destination in 1-7 business days</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="next-btn-wrap">
          <!-- a标签跳转 -->
          <router-link class="btn btn--m btn--red" :to="{path:'orderComfirm',query:{addressId:selectAddressId}}">Next</router-link>
        </div>
      </div>
    </div>
    <!-- 模态框 -->
    <Modal :md-show="modalShow" @close="closeModal">
      <p slot="message" >你确认要删除此地址吗？</p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="delAddress">确认</a>
        <a href="javascript:;" class="btn btn--m" @click="modalShow = false">关闭</a>
      </div>
    </Modal>
  </div>
</template>
<style>
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
        limit:3,
        checkIndex:0,
        addressList:[],
        selectAddressId:'',
        modalShow:false,
        addressId:''
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
        addressListFilter(){
            return this.addressList.slice(0,this.limit)
        }
    },
    methods: {
      init(){
          axios.get("/users/addressList").then((response)=>{
              let res = response.data;
              this.addressList = res.result;
            this.addressList.forEach((item)=>{
              if(item.isDefault == true){
                this.selectAddressId = item.addressId;
              }
            })
          });
      },
      expand(){
        if(this.limit == 3){
          this.limit = this.addressList.length;
        }else{
            this.limit = 3;
        }
      },
      setDefault(addressId){
        axios.post("/users/setDafault",{
            addressId:addressId
        }).then((response)=>{
          let res = response.data;
          if(res.status == '0'){
            //两种方式更新
            //第一种this.init();
            //第二种
            this.addressList.forEach((item)=>{
              if(item.addressId == addressId){
                item.isDefault = true
              }else{
                item.isDefault = false
              }
            });
            this.selectAddressId = addressId
          }
        })
      },
      closeModal(){
        this.modalShow = false;
      },
      delAddressComfirm(addressId){
        this.modalShow = true;
        this.addressId = addressId;
      },
      delAddress(){
        this.modalShow = true;
        axios.post("/users/delAddress",{
            addressId:this.addressId
        }).then((response)=>{
            let res = response.data;
            if(res.status == "0"){
                this.modalShow = false;
                this.addressList.forEach((item,index)=>{
                    if(item.addressId == this.addressId){
                        this.addressList.splice(index,1);
                    }
                });

            }
        })
      },
      addAddress(){

      }

    }
  }
</script>
