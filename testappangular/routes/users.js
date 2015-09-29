var express = require('express');
var router = express.Router();
var User=require("./User");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
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

router.get('/sess',function(req,res){
  console.log(req.user);
  res.send(req.user);
  });
//To Delete User
/*router.delete("/:name",function(req,res){
  User.remove({'name':req.params.name},function(err){
     if (err) {
      console.log(err);
      res.send(err);
    }
  
    res.send("User Successfully Deleted.");
  });
  });*/
router.get('/detail/:id',function(req,res){
   User.findOne({'_id':req.params.id},function(err,user){
     if (err) {
      console.log(err);
      res.send(err);
    }
  
    res.json(user);
  });
  });
router.delete("/:id",function(req,res){
 
  User.remove({'_id':req.params.id},function(err){
    if (err) {
      //code
      res.json({'error':err});
    }
    res.json({'success':'User successfully deleted.'});
    });
  }) 
//Get UserDetail
router.get("/getUser",function(req,res){

 User.find({}, function(err, user) {
  if (err) {
     console.log(err);
      res.send(err);
  }
 //if(user[0].token==req.headers.authorization){
   res.json(user);
 //}
});
});
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json( { 'code':401, 'error':'Unauthorized', 'message':info.message } );
 }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      res.json({ 'code':0, 'success':true, 'name':user.name});
 });
  })(req, res, next);
});
router.post('/logout', function(req, res) {
    req.logout;
    req.session.destroy();

    res.json({'success':'logout'});
});

passport.use(new LocalStrategy({ usernameField: 'email'},
  function(username, password, done) {
   
  User.findOne({'email':username},function(err,user){
    if (err) {
     return done(err);
    }
     if (!user) {
        return done(null, false, { message: 'Incorrect user.' });
      }
   return done(null, user);
    });
  }));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
router.get('/checklogged/user',function(req,res,next){
  if(!req.isAuthenticated()){
    res.status(200).json( { 'code':401, 'error':'Unauthorized'} );
  }
  else {
    res.status(200).json(req.user);
  }

});
//Update User
router.post('/updateinfo',function(req,res){
  var username='',password='',address='',age='',city='',state='',country='',name='';
  var res1={};
  if (typeof req.body.username === 'undefined') {}else{
   username=req.body.username;
   res1['username']=username;
   }
   if (typeof req.body.password === 'undefined') {}else{
  password=req.body.password;
  res1['password']=password;
  
  }
  if (typeof req.body.name === 'undefined') {}else{
   name=req.body.name;
   res1['name']=name;
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
 
  
  
  User.findOneAndUpdate({ _id: req.body._id },res1, function(err, user) {
  if (err) res.json({"error":err});

  res.json({"success":"User updated Successfully."});
});
  })
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
