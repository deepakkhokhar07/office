var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
  name: { type: String, required: true },
  categoryid: {type:Schema.Types.ObjectId,ref:'Category'},
  sku: String,
  price: Number,
  description: String,
  manufacture: String
});
var orderSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
  productinfo: [productSchema],
  total:Number,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Order = mongoose.model('Order', orderSchema);

// make this available to our users in our Node applications
module.exports = Order;