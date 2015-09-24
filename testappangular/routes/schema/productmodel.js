var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: { type: String, required: true },
  categoryid: {type:Schema.Types.ObjectId,ref:'Category'},
  sku: String,
  active:Boolean,
  Price: Number,
  description: String,
  manufacture:String,
  created_at: {type: Date, default: Date.now},
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model('Product', userSchema);

// make this available to our users in our Node applications
module.exports = Product;