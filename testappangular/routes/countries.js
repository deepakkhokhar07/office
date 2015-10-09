var express = require('express');
var router = express.Router();
var Country=require("./Country");
var app = express();
router.get('/getcountries',function(req,res){

    Country.find({},'country',function(err, country) {
  if (err) {
     console.log(err);
      res.send(err);
  }

 res.json(country);
});
})
router.get('/getcountrydetail/:_id',function(req,res){

    Country.findOne({_id:req.params._id},'city state',function(err, country) {
  if (err) {
     console.log(err);
      res.send(err);
  }

 res.json(country);
});
})
module.exports = router;