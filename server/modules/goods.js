var mongoose = require('mongoose')
var Schema = mongoose.Schema;

//类似Java里的对象
var productSchema = new Schema({
	"productId":Number,
	"productName":String,
	"salePrice":Number,
	"productImage":String,
  "checked":String,
  // 在列表页点击“加入购物车时”，会获取对应goods商品数据，然后给该商品添加checked和productNum属性，再将该商品添加到购物车列表中，Schema中不定义属性的话是添加不了的。
  "productNum":Number,
  "stageId":String,
  "productUrl":String
});
//这里默认的是去找goods这张表，而不是good,所有模型的第一个参数都会加上s,如果要指定查询的表要传入第三个参数
// module.exports = mongoose.model('Good',produtSchema,'goods');
module.exports = mongoose.model('Good',productSchema);















