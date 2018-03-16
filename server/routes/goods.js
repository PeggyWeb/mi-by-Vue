var express = require('express')

var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../modules/goods');
var User = require('../modules/users');
var Stage = require("../modules/goods_stages");
//需要用户名和密码的
//mongoose.connect('mongodb://admin:123456@127.0.0.1:27017/mi');
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

//连接正常
mongoose.connection.on('connected', function () {
  console.log('success')
})
//连接错误
mongoose.connection.on('error', function () {
  console.log('error')
})
//连接失败
mongoose.connection.on('disconnected', function () {
  console.log('disconnected')
})
//var goodsData = require('../../mock/goodlist.json');
router.get("/list", function (req, res, next) {
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let sort = req.query.sort;
  let skip = (page - 1) * pageSize;
  let priceLevel = req.query.priceLevel;
  let params = {};
  let priceGt = '', priceLte = '';
  if (priceLevel != 'all') {
    switch (priceLevel) {
      case '0':
        priceGt = 0;
        priceLte = 100;
        break;
      case '1':
        priceGt = 100;
        priceLte = 500;
        break;
      case '2':
        priceGt = 500;
        priceLte = 1000;
        break;
      case '3':
        priceGt = 1000;
        priceLte = 5000;
        break;
    }
    params = {
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }


  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice': sort});

  goodsModel.exec(function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message
        })
      } else {
        Goods.count({},function(err,count){
          if(err){
            res.json({
              status: '0',
              msg: err.message,
              result: ''
            })
          }else{
            res.json({
              status: '0',
              msg: '',
              result: {
                count: doc.length,
                list: doc,
                goods_count:count
              }
            })
          }

        });

      }
    }
  )
});
//加入购物车
router.post("/addCart", function (req, res, next) {
  var userId = '100000077', productId = req.body.productId;
  User.findOne({userId: userId}, function (err, userDoc) {
      if (err) {
        res.json({
          status: "1",
          mas: err.message
        })
      } else {
        if (userDoc) {
          let goodsItem = '';
          userDoc.cartList.forEach(function (item) {
            if (item.productId == productId) {
              goodsItem = item;
              item.productNum ++;
            }
          });
          if (goodsItem) {
            userDoc.save(function (err2, doc2) {
              if (err2) {
                res.json({
                  status: "1",
                  msg: err2.message
                })
              } else {
                res.json({
                  status: "0",
                  msg: '',
                  result: "success"
                })
              }
            })
          }else{
            Goods.findOne({productId: productId}, function (err1, doc) {
              if (err1) {
                res.json({
                  status: "1",
                  msg: err1.message
                })
              } else {
                if (doc) {
                  doc.productNum = 1;
                  doc.checked = 1;
                  userDoc.cartList.push(doc);
                  userDoc.save(function (err2, doc2) {
                    if (err2) {
                      res.json({
                        status: "1",
                        msg: err2.message
                      })
                    } else {
                      res.json({
                        status: "0",
                        msg: '',
                        result: "success"
                      })
                    }
                  })
                }
              }
            })
          }
        }
      }
    }
  )
});
//增加商品
router.post("/addGoods",function(req,res,next) {
  let maxIndex = 1;
  let good = JSON.parse(req.body.good);
  Goods.find({}).sort({productId:-1}).then(([first,...others])=>{
    if(first){
      good.productId = Math.abs(first.productId) + 1;
      console.log(good);
      Goods.create(good,function(err1,doc1){
        if(err1){
          res.send("失败")
        }else{
          res.send("成功")
        }
      })
    }else{
      res.send("失败")
    }
  })
});
//按种类查商品
router.post("/stage",function(req,res,next){

});
module.exports = router;



