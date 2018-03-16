var mongoose = require('mongoose');

var stageSchema = new mongoose.Schema({
  "stageId":"String",
  "name":"String"
});
module.exports = mongoose.model("Goods_stage",stageSchema);




