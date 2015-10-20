var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  insertno: String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Number = mongoose.model('Number', userSchema);

// make this available to our users in our Node applications
module.exports = Number;