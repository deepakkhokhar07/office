var express = require('express');
var router = express.Router();
var Order = require("./schema/ordermodel");
var Product=require("./schema/productmodel");
var User=require("./User");
var mongoose = require('mongoose');
router.post("/",function(req,res){
    var username=req.body.username;
    var productsku=req.body.productsku;
    User.findOne({ username: username }, function(err, user) {
  if (err) {
    console.log(err);
    res.send(err);
  }
 if (user!=null) {
    
   Product.find({sku:{$in: productsku} })
    .select('name categoryid sku Price description manufacture -_id')
    .exec(function(err,products){
    if (err) {
       console.log(err);
        res.send(err);
    }
    var total=0;
   products.forEach(function(product){ 
    total+=product.Price;
   });
   var orderdetail=new Order({
    userid:user._id,
    productinfo:products,
    total:total,
        created_at: Date.now(),
        updated_at: Date.now()
    });
    orderdetail.save(function(err){
    if (err) {
      console.log(err);
      res.send(err);
    }
  
    res.send("Order Successfully Created.");
    });
   });
   
  
 }else{ 
    res.send("No User found.");
 }
 
}); 
 
    
});
router.get('/orderdetail/:id',function(req,res){
    var userid=req.params.id;
    User.findById(userid, function(err, user) {
  if (err) { console.log(err);
  }

  if(user!=undefined){
   Order.find({'userid':mongoose.Types.ObjectId(userid)}).populate('userid').exec(function(req,orders){
    console.log(orders);
    res.send("Order id="+orders[0]._id);
    });
   
  }else{
    res.send("User not found.");
  }
});
    
});

router.get('/getallOrders',function(req,res){
    
   Order.find({}).populate('userid').exec(function(req,orders){
    console.log(orders);
    res.send("All Orders fetched.");
    });
});
module.exports = router;