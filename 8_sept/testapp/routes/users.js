var express = require('express');
var router = express.Router();
var User=require("./User");
/* GET users listing. */
// To register User.
router.post('/register', function(req, res, next) {
  var userdetail=new User({
    'name':req.body.name,
    'username':req.body.username,
    'password':req.body.password,
    'email':req.body.email,
    'address':req.body.address,
    'age':req.body.age,
    'city':req.body.city,
    'state':req.body.state,
    'country':req.body.country,
    'is_admin':req.body.is_admin,
    'token':req.body.token
    }); 
  userdetail.save(function(err){
    if (err) {
      console.log(err);
      res.send(err);
    }
  
    res.send("User Successfully Saved.");
    });
});
//To Delete User
router.delete("/:name",function(req,res){
  User.remove({'name':req.params.name},function(err){
     if (err) {
      console.log(err);
      res.send(err);
    }
  
    res.send("User Successfully Deleted.");
  });
  });
//Get UserDetail
router.get("/:name",function(req,res){

 User.find({}, function(err, user) {
  if (err) {
     console.log(err);
      res.send(err);
  }
 //if(user[0].token==req.headers.authorization){
 res.send(user);
 //}
});
});
router.get('/test1/test',function(req,res){
res.render("users_index",{'title':'mytitle'}); 
});
//Update User
router.post("/update/:name",function(req,res){
  var username='',password='',email='',address='',age='',city='',state='',country='';
  var res1={};
  if (typeof req.body.username === 'undefined') {}else{
   username=req.body.username;
   res1['username']=username;
   }
   if (typeof req.body.password === 'undefined') {}else{
  password=req.body.password;
  res1['password']=password;
  
  }
  if (typeof req.body.email === 'undefined') {}else{
  email=req.body.email; 
  res1['email']=email;
  }
  if (typeof req.body.address === 'undefined') {}else{
  address=req.body.address; 
  res1['address']=address;
  }
  if (typeof req.body.age === 'undefined') {}else{
  age=req.body.age;
  res1['age']=age;
  }
  if (typeof req.body.city === 'undefined') {}else{
  city=req.body.city; res1['city']=city;
  }
  if (typeof req.body.state === 'undefined') {}else{
  state=req.body.state; res1['state']=state;
  }
  if (typeof req.body.country === 'undefined') {
    
    }else{
  country=req.body.country;res1['country']=country;
  }
 
  
  
  User.findOneAndUpdate({ name: req.params.name },res1, function(err, user) {
  if (err) throw err;

  // we have the updated user returned to us
  console.log(user);
  res.send("User updated Successfully.");
});
  });

module.exports = router;
