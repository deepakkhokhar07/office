var express = require('express');
var app=express();
var router = express.Router();
var http = require('http').Server(router);
var server =app.listen("3000");
var io = require('socket.io')(server);
var path = require('path');
var fs = require('fs'); 
var exec = require('child_process').exec; 
var util = require('util'); 
/* GET users listing. */

app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/video', function(req, res, next) {
  res.sendFile(__dirname + '/video.html');
});
router.post('/fileUpload', function(req, res) {
  console.log(req);
  console.log(res);
});
io.on('connection', function(client){
   client.emit('setID', client.id);
   
   client.on('user image', function (from,msg) {
var base64Data = decodeBase64Image(msg.imageData);

fs.writeFile(__dirname + "/images/" + Date.now() + ".jpg", base64Data.data, function (err) {
if (err) {
console.log('ERROR:: ' + err);
throw err;
}
io.emit('user image',from, msg.imageData);
});
//client.emit('user image', msg.imageData);

});
 console.log(client.id);
  client.on('chatMessage', function(from, msg){
   
    io.emit('chatMessage', from, msg);
  });
  client.on('disconnect', function () {
   
    io.emit('chatMessage', client.id, '<li>The user with socket '+client.id+'  diconnnected.</li>');
    console.log('disconnected event'); 

  });
  client.on('notifyUser', function(user){
   
    io.emit('notifyUser', user);
  });
  client.on('message', function (m) {
// do something
});
client.on('disconnect', function () {
connected = false;
});
//TODO: function to decode base64 to binary
function decodeBase64Image(dataString) {
var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
response = {};
if (matches.length !== 3) {
return new Error('Invalid input string');
}
response.type = matches[1];
response.data = new Buffer(matches[2], 'base64');
return response;
}
});


module.exports = router;
