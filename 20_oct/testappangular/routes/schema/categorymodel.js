var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  catname:{type:String,required:true},
  active:Boolean,
  description: String,
  parentid:Schema.Types.ObjectId,
  parenttree:[Schema.Types.ObjectId],
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Category = mongoose.model('Category', userSchema);

// make this available to our users in our Node applications
module.exports = Category;