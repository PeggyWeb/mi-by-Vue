<template>
  <div>
    <h2>{{title}}</h2>
    <ul class="cart-list-header" id="cart">
      <li>商品信息</li>
      <li>商品金额</li>
      <li>商品数量</li>
      <li>总金额</li>
      <li>编辑</li>
    </ul>
    <ul class="cart-list-body">
      <li class="cart-item">
        <div class="cart-item-grid"><a href="javascript:void(0)"></a></div>
        <div class="cart-item-grid"><img src="../assets/img/mitu-80.jpg" /></div>
        <div class="cart-item-grid"><a href="javascript:void(0)">小米</a></div>
        <div class="cart-item-grid"><dl><dd>屏保膜</dd></dl></div>
        <div class="cart-item-grid"><a href="javascript:void(0)">删除</a></div>
      </li>
      <li class="cart-item">
        <div class="cart-item-grid"></div>
        <div class="cart-item-grid"></div>
        <div class="cart-item-grid"></div>
        <div class="cart-item-grid"></div>
        <div class="cart-item-grid"></div>
      </li>
    </ul>
    <ul class="cart-list-footer"></ul>
  </div>
</template>
<style>
  .cart-list{display:table;}
  .cart-list-header{display:table-row;height:40px;line-height:40px;}
  .cart-list-header li{display:table-cell;}
  .cart-list-body{display:table-row-group;}
  .cart-item{display:table-row;}

</style>
<script>

</script>
