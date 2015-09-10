var express = require('express');
var router = express.Router();
var User=require("./usersmodel");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
/* GET home page. */
router.get('/', function(req, res, next) {
  /*var chris=new User({
    name:"Deepak",
    username:'deepak',
   password:"abc1233",
   email:"deepakkhokhar"
    });
  chris.save(function(err){
    if (err) {
      console.log(err);
    }
    console.log("User Successfully Saved.");
    });*/
  req.session.name = 'Deepak';
 
  User.find({},function(err,users){
    if (err) {
      console.log(err);
    }
    res.send(req.session);
  //res.json(users);
  //  res.render('index', { title: users });
    })
 
  });
router.get('/user',function(req,res,next){
  console.log(req.session.name)
  User.find({username:"deepak"},function(err,user){
     if (err) {
      console.log(err);
    }
   
   // res.render('index', { title: user });
  });
  });
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }else if (user) {
         /*if (user.password!=req.body.password) {
          return done(null, false, { message: 'Incorrect password.' });
         }else{*/
          return done(null, user);
         //}
      }
      
      
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);
router.get('/login',function(req,res){
  res.send('<form action="/login" method="post"><div><label>Username:</label><input type="text" name="username"/></div><div><label>Password:</label><input type="password" name="password"/></div><div><input type="submit" value="Log In"/></div></form>');
  });
/*router.post("/authenticate",function(req,res){
  console.log(req);
  res.send(req.body); 
  
  User.findOne({
    username:req.body.username
  },function(err,user){
    if (err) {
      throw err;
    }
    if (!user) {
      res.json({success:false,message:"User not found Authentication failed."});
    }else if ($user) {
      if (user.password!=req.body.password) {
       res.json({success:false,message:"Wrong Password Authentication failed."});
      }else{
        res.json({"success":true});
      }
    }
  })
  });*/
module.exports = router;
