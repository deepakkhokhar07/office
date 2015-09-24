var express = require('express');
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var product = require('./routes/product');
var category = require('./routes/category');
var order = require('./routes/order');
var basicAuth = require('basic-auth-connect');
var app = express();
//var Userinfo=require("../routes/User");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(basicAuth('username', 'password'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"myenctype", "saveUninitialized": true, "resave": true}));
app.use(passport.initialize());
app.use(passport.session());
/* authentication */
var authAdmin = function(req, res, next){
  // check for admin
  success = true;
  if (success) {
    next();
  } else {
    res.status(403).json({});
  }
  };
var authUser = function(req, res, next) {
  next();
}
//pp.use('/', basicAuth('username', 'password'));
//app.use('/users', authAdmin);
//app.use('/products', authUser);
app.use('/products', authAdmin);

app.use('/', routes);
app.use('/users', users);
app.use('/product', product);
app.use('/category', category);
app.use('/order', order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
mongoose.connect("mongodb://localhost/testapp");
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
