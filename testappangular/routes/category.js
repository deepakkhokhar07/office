var express = require('express');
var router = express.Router();
var Category=require("./schema/categorymodel");
router.post("/",function(req,res){
  // console.log(req.body);
   var categorydetail=new Category({
    'catname':req.body.catname,
    'active':req.body.active,
    'description':req.body.description,
     'parentid':req.body.parentid,
    'parenttree':req.body.parenttree,
    'address':req.body.address,
    'created_at':req.body.created_at
    });
  categorydetail.save(function(err){
    if (err) { 
      console.log(err);
      res.send(err);
    } 
  
    
    });
res.send("Category Successfully Saved.");
    });
module.exports = router;
//Array sending
//catname=Wooden Pen Parker type1&active=true&description=this is a test description for wooden pen type&parentid=55efc9b30846e56b09909816&parenttree=55efc184cb2e0dfe0dc10d0a&parenttree=55efc9b30846e56b09909816&address=14314143434