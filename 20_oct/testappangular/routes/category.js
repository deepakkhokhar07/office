var express = require('express');
var router = express.Router();
var Category=require("./schema/categorymodel");
var nodemailer = require('nodemailer');
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
router.post("/sendmail",function(req,res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'tester12344489@gmail.com', // Your email id
            pass: 'abc123@a' // Your password
        }
    });
    var mailOptions = {
    from: 'restroom256@gmail.com', // sender address
    to: 'tester12344489@gmail.com', // list of receivers
    subject: 'Email Example', // Subject line
    text: 'hello how are you.' //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
});
module.exports = router;
//Array sending
//catname=Wooden Pen Parker type1&active=true&description=this is a test description for wooden pen type&parentid=55efc9b30846e56b09909816&parenttree=55efc184cb2e0dfe0dc10d0a&parenttree=55efc9b30846e56b09909816&address=14314143434