var express = require('express');
var app=express();
var router = express.Router();
var http = require('http').Server(router);
var server =app.listen("3000");
var io = require('socket.io')(server);
var path = require('path');
var fs = require('fs'),exec = require('child_process').exec,util = require('util'), Files = {};
/* GET users listing. */
router.get("/chatmessages",function(req, res){
	connection.query('SELECT content from groupchat where id=5', function(err, rows, fields) {
  if (err){ console.log(err); }
 
  res.send(rows[0].content);
 // console.log('The solution is: ', fields);
});
	connection.end();
});
app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/video', function(req, res, next) {
 console.log(path.join(__dirname, '../public'));
  res.sendFile(__dirname + '/video.html');
});
router.post('/fileUpload', function(req, res) {
  console.log(req);
  console.log(res);
});
io.on('connection', function(client){
   client.emit('setID', client.id);
   client.on('Start', function (data) { //data contains the variables that we passed through in the html file
			var Name = data['Name'];
			Files[Name] = {  //Create a new Entry in The Files Variable
				FileSize : data['Size'],
				Data	 : "",
				Downloaded : 0
			}
			var Place = 0;
			try{
				var Stat = fs.statSync(path.join(__dirname, '../public')+'/Temp/' +  Name);
				if(Stat.isFile())
				{
					Files[Name]['Downloaded'] = Stat.size;
					Place = Stat.size / 524288;
				}
			}
	  		catch(er){} //It's a New File
			fs.open(path.join(__dirname, '../public')+"/Temp/" + Name, 'a', 0755, function(err, fd){
				if(err)
				{
					console.log(err);
				}
				else
				{
					Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
					client.emit('MoreData', { 'Place' : Place, Percent : 0 });
				}
			});
	});
	
	client.on('Upload', function (data){
			var Name = data['Name'];
			Files[Name]['Downloaded'] += data['Data'].length;
			Files[Name]['Data'] += data['Data'];
			if(Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
			{
				fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
					var inp = fs.createReadStream(path.join(__dirname, '../public')+"/Temp/" + Name);
					var out = fs.createWriteStream(path.join(__dirname, '../public')+"/Video/" + Name);
					util.pump(inp, out, function(){
						fs.unlink(__dirname+"/Temp/" + Name, function () { //This Deletes The Temporary File
							exec("ffmpeg -i "+path.join(__dirname, '../public')+"/Video/" + Name  + " -ss 01:30 -r 1 -an -vframes 1 -f mjpeg "+path.join(__dirname, '../public')+"/Video/" + Name  + ".jpg", function(err){ 
                              if(err){ console.log(err);}
								client.emit('Done', {'Image' : path.join(__dirname, '../public')+'/Video/' + Name + '.jpg'});
							});
						});
					});
				});
			}
			else if(Files[Name]['Data'].length > 10485760){ //If the Data Buffer reaches 10MB
				fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function(err, Writen){
					Files[Name]['Data'] = ""; //Reset The Buffer
					var Place = Files[Name]['Downloaded'] / 524288;
					var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
					client.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
				});
			}
			else
			{
				var Place = Files[Name]['Downloaded'] / 524288;
				var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
				client.emit('MoreData', { 'Place' : Place, 'Percent' :  Percent});
			}
		});
   client.on('user image', function (from,msg) {
var base64Data = decodeBase64Image(msg.imageData);

fs.writeFile(path.join(__dirname, 'public') + "/images/" + Date.now() + ".jpg", base64Data.data, function (err) {
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
