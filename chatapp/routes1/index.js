var express = require('express');
var app=express();
var router = express.Router();
var http = require('http').Server(router);
var server =app.listen("3010");
var io = require('socket.io')(server);
app.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
});    

io.on('connection', function(client){ 
  console.log("client id="+client.id);
  // To get current socket id.
     client.emit('currentuser_socketid', client.id);
  //Update socket id corresponding to user.
   client.on('user_socket',function(from){
   
    connection.query('UPDATE users SET socketid="'+client.id+'" WHERE userID='+from, function(err, rows) {
    if (err) console.log(err);
    });
	
  });
   //single chat message 
 client.on('chat_message',function(from,to,message){
 
 connection.query('Select socketid from users where userID='+from, function(err, rows, fields) {
   if (err) console.log(err);
   if (rows[0].socketid!='') {
    io.in(rows[0].socketid).emit('send', {"message":message});
   }
  });
    
    connection.query('Select socketid from users where userID='+to, function(err, rows, fields) {
    if (err) console.log(err);
     if (rows[0].socketid!='') {
    io.in(rows[0].socketid).emit('receive', {"message":message});
   }
  });
   
  });   
  //CreateRoom or Group code
  client.on('createroom',function(data){
   
   var description=data.description; 
   var groupID=data.groupID; 
   var name=data.name; 
   var groupAdmin =data.userID;
   var currentdate = new Date();
 
   var date=currentdate.getFullYear()+"-"+(currentdate.getMonth()+1)+"-"+currentdate.getDate()+" "+currentdate.getHours() + ":"+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
   if (groupID=='') {
   connection.query('insert into groups (groupAdmin,name,description,created) values ("' + groupAdmin + '", "' + name + '","'+description+'","'+date+'")',function(err, results, fields){
      if (err) console.log(err);
      groupId=results.insertId;
      members=data.memberId;
      member_array=members.split(",");
     for(var i = 0; i < member_array.length; i++) {
     
      connection.query('insert into groupMembers (userID,groupID,memberID) values ("' + groupAdmin + '", "' + groupId + '","'+member_array[i]+'")',function(err, results, fields){
        if (err) console.log(err);
      });
     }
    // To check online users
     connection.query('Select socketid from users where userID='+groupAdmin, function(err, rows, fields) {
    if (err) console.log(err);
     
      
    connection.query('Select * from groups where groupID="'+groupId+'"', function(err, result1, fields) {
     
     var countloop1=0;
     var total_result = [];
       result1.forEach(function(res,index){
   
     
     connection.query('Select groupMembers.notifyStatus,groupMembers.memberId as userID,users.username,users.userAvatar  from groupMembers LEFT JOIN users ON users.userID =  groupMembers.memberId where groupMembers.groupID="'+groupId+'"', function(err, result2, fields) {
     countloop1=Number(countloop1)+Number(1);
      result1[index].users=result2;
  
      total_result.push(result1[index]);
      
       if ((rows[0].socketid!='') && (total_result.length==countloop1)) {
        
    io.in(rows[0].socketid).emit('creategroupsuccess', total_result[0]);
   }
     }); }); }); }); });
   
   }else{
    // To update group data
    
   }
 
    });
  
  //Group chat history
  client.on("groupchathistory",function(data){

    connection.query('Select users.username,users.userAvatar,groupchat.senderID,groupchat.content,groupchat.type,groupchat.groupID,groupchat.ThumbImage,groupchat.time,groupchat.id from groupchat LEFT JOIN groups ON groupchat.groupID=groups.groupID LEFT JOIN users ON groupchat.senderID=users.userID where groupchat.groupID="'+data.groupID+'" and groupchat.time >"'+data.time+'"', function(err, result, fields) {
       
       connection.query('Select socketid from users where userID='+data.userID, function(err, rows, fields) {
          if (err) console.log(err);
          console.log(result);
           if (rows[0].socketid!='') {
        
            io.in(rows[0].socketid).emit('groupchathistoryresult',result);
         }
        });
    });
  });
  //Group chat message
  client.on("groupchatmessage",function(data){
    var userID=data.userID;
    var message=data.message;
   
    var countloop=0;
    var sockets=[];
    var currentdate = new Date();
  
   var date=currentdate.getFullYear()+"-"+(currentdate.getMonth()+1)+"-"+currentdate.getDate()+" "+currentdate.getHours() + ":"+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
   connection.query('insert into groupchat (senderID,content,type,groupID,time) values ("' + userID + '", "' + message + '","'+data.type+'","'+data.groupID+'","'+date+'")',function(err, results, fields){
        if (err) console.log(err);
      }); 
    connection.query('Select users.userID,users.socketid from groupMembers LEFT JOIN groups ON groupMembers.groupID=groups.groupID LEFT JOIN users ON groupMembers.memberId=users.userID where groups.groupID="'+data.groupID+'"', function(err, result1, fields) {
      result1.forEach(function(res,index){
        countloop=Number(countloop)+Number(1); 
       
         if (result1[index].socketid!='') {
          sockets.push(result1[index].socketid);
         }
     });
     if (countloop==result1.length) {

      for (i = 0; i < sockets.length; i++) {
      
      io.in(sockets[i]).emit('groupchatmessagesend', {"groupid":data.groupID,"message":message}); 
      }
     }
    });
    });
  
  //notify User
  client.on("notifygroup",function(data){
    var userID=data.userID;
    var groupID=data.groupID;
    
    connection.query('select memberId from groupMembers where groupID="'+groupID+'" and memberId!="'+userID+'"', function(err, result, fields) {
     result.forEach(function(res,index){
       connection.query('Select socketid from users where userID='+res.memberId, function(err, rows, fields) {
          if (err) console.log(err);
          
           if (rows[0].socketid!='') {
           
            io.in(rows[0].socketid).emit('notify_user',"1 user is typing.");
         }
        });
      });
    });
    }); 
  
  //Group Listing
  client.on('grouplisting',function(data){
   
   connection.query('Select groups.* from groupMembers LEFT JOIN groups ON groupMembers.groupID=groups.groupID where groupMembers.memberId="'+data.userID+'"', function(err, result1, fields) {
    var total_result = [];
    
    var countloop=0;
    result1.forEach(function(res,index){
   countloop=Number(countloop)+Number(1); 
     connection.query('Select groupMembers.notifyStatus,groupMembers.memberId as userID,users.username,users.userAvatar  from groupMembers LEFT JOIN users ON users.userID =  groupMembers.memberId where groupMembers.groupID="'+result1[index].groupID+'"', function(err, result2, fields) {
     
      result1[index].users=result2;
      
      total_result.push(result1[index]);
     
     });
     
      });
    if (countloop==result1.length) {
      
        connection.query('Select socketid from users where userID='+data.userID, function(err, rows, fields) {
          if (err) console.log(err);
          
           if (rows[0].socketid!='') {
           
            io.in(rows[0].socketid).emit('grouplisting_user',total_result);
         }
        });
      }
    
   });

     
  }); 
  client.on('disconnect', function () {
   
    connection.query('Select userID from users where socketid="'+client.id+'"', function(err, rows, fields) {
    if (err) console.log(err);
   
    
    
    if (typeof rows !== 'undefined' && rows.length > 0) {
    connection.query('UPDATE users SET socketid="" WHERE userID='+rows[0].userID, function(err, rows) {
    if(err) console.log(err);
   
    });
   } 
  });
            
  }); 

 
}); 


module.exports = router;
