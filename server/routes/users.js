var express = require('express');
var router = express.Router();
var User = require('../modules/users');
require("./../util/util")
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', function (req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: "1",
        msg: err.message
      })
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: "/",
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: "/",
          maxAge: 1000 * 60 * 60
        });

        res.json({
          status: "0",
          msg: "",
          result: {
            userName: doc.userName,
          }
        })
      }
    }
  })
});
//登出
router.post("/logout", function (req, res, next) {
  res.cookie("userId", "", {
    path: "/",
    maxAge: -1
  })
  res.json({
    status: "0",
    mag: "",
    result: ""
  })
});
//获取cookie不用每次都登录
router.get("/checkLogin", function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    });
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    });
  }
});
//购物车列表
router.get("/cart", function (req, res, next) {
  var param = {
    userId: req.cookies.userId
  }
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '',
        result: {}
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }

    }
  })

});
//购物车删除
router.post("/cart/del", function (req, res, next) {
  var userId = req.cookies.userId, productId = req.body.productId;
  User.update({
    userId: userId
  }, {
    $pull: {
      'cartList': {
        'productId': productId
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '',
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
});
//修改商品数量
router.post("/cartEdit", function (req, res, next) {
  var userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked;
  User.update({
    "userId": userId,
    "cartList.productId": productId
  }, {
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '',
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
});
//选中购物车中所有商品
router.post("/editCheckAll", function (req, res, next) {
  var userId = req.cookies.userId,
    checkAll = req.body.checkAll?'1':'0';
  User.findOne({userId: userId}, function (err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (user) {
        user.cartList.forEach((item) => {
          item.checked = checkAll;
        })
        user.save(function (err1, doc) {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
    }
  })
});
//查询购物车中选中的商品(待完成)
router.get("/cartCheck",function(req,res,next){
  var userId = req.cookies.userId;
  User.find({
    userId:userId,
    "cartList.checked":"1"
  },{"cartList":1,"_id":0},function(err,doc){
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
})
//查询用户地址
router.get("/addressList",function(req,res,next){
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      res.json({
        status: '0',
        msg:'',
        result: doc.addressList
      })
    }
  })
});
//设置默认地址
router.post("/setDafault",function(req,res,next){
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status:'1003',
      msg:'address is Null',
      result:''
    })
  }
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      var addressList = doc.addressList;
      addressList.forEach((item)=>{
        if(item.addressId == addressId){
          item.isDefault = true;
        }else{
          item.isDefault = false;
        }
      });
      doc.save(function (err1,doc1) {
        if(err1){
          res.json({
            status:'1',
            msg:err1.message,
            result:''
          })
        }else{
          res.json({
            status:'0',
            msg:'',
            result:''
          })
        }
      })
    }
  })
});
//删除地址
router.post("/delAddress",function(req,res,next){
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
  User.update({
    userId:userId
  },{
    $pull:{
      'addressList':{
        'addressId':addressId
      }
    }
  },function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:''
      })
    }
  })
})
router.post("/payment",function(req,res,next){
  var userId=req.cookies.userId,
    addressId = req.body.addressId,
    orderTotal = req.body.orderTotal;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else {
      var address="",goodsList = [];
      //地址信息
      doc.addressList.forEach((item)=>{
        if(addressId == item.addressId){
          address=item;
        }
      });
      //选中的商品列表
      doc.cartList.filter((item)=>{
        if(item.checked == "1"){
          goodsList.push(item)
        }
      });
      var platForm = '622';
      var r1 = Math.floor(Math.random()*10);
      var r2 = Math.floor(Math.random()*10);
      var sysDate = new Date().Format('yyyMMMdddhhmmss')
      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
      var orderId = platForm + r1 + sysDate + r2;
      //保存到订单列表
      var order={
        orderId:orderId,
        orderTotal:orderTotal,
        addressInfo:address,
        goodsList:goodsList,
        orderStatus:'1',
        createData:createDate
      }
      doc.orderList.push(order);
      doc.save(function(err1,doc1){
        if(err){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          })
        }else {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId:order.orderId,
              orderTotal:order.orderTotal
            }
          })
        }
      })
    }
  })
})
//根据订单详情查询订单信息
router.get("/orderDetail",function(req,res,next){
  var userId = req.cookies.userId;
  var orderId = req.param("orderId");
  User.findOne({userId:userId},function(err,userInfo){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{

      var orderList = userInfo.orderList;
      if(orderList.length>0){
        var orderTotal = 0;
        orderList.forEach((item)=>{
          if(item.orderId == orderId){
            orderTotal = item.orderTotal;
          }
        });console.log(orderTotal)
        if(orderTotal>0){
          res.json({
            status:'0',
            msg:'',
            result:{
              orderId:orderId,
              orderTotal:orderTotal
            }
          });
        }else{
          res.json({
            status:'20001',
            msg:'无此订单',
            result:''
          });
        }
      }else{
        res.json({
          status:'20000',
          msg:'您还未创建订单',
          result:''
        });
      }
    }
  })
})







module.exports = router;
