var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
 
  city: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  country:{type:String,required:true},
});

// the schema is useless so far
// we need to create a model using it
var Country = mongoose.model('Country', userSchema);

// make this available to our users in our Node applications
module.exports = Country;