var express = require('express');
var router = express.Router();
var Product=require("./schema/productmodel");
router.post("/",function(req,res){
   var productdetail=new Product({
    'name':req.body.name,
    'categoryid':req.body.category,
    'sku':req.body.sku,
    'active':req.body.active,
    'Price':req.body.Price,
    'description':req.body.description,
    'manufacture':req.body.manufacture,
    'updated_at':req.body.updated_at,
    'created_at':req.body.created_at
    });
  productdetail.save(function(err){
    if (err) {
      console.log(err);
      res.send(err);
    } 
  
    res.send("Product Successfully Saved.");
    });
    });
module.exports = router;
