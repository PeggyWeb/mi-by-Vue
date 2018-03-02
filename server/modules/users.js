/**
 * Created by tl on 2018/1/31.
 */
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "salePrice":String,
      "productImage":String,
      "checked":String,
      "productNum":String
    }
  ],
  "addressList":[
    {
      "addressId":String,
      "userName":String,
      "streetName": String,
      "postCode":Number,
      "tel":Number,
      "isDefault": Boolean
    }
  ]
});
//别忘记加大写
module.exports = mongoose.model("User",userSchema);
