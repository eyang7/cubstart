var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server);
var path = require('path');


app.use(express.static(path.join(__dirname,'./public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


var local_name;

// TODO: Set up a socket.io connection handler, which will be called whenever a new client connects.

//whe server is connected for each client, create a websocket that connects all of these users together 
io.on('connection', (socket) => {
  console.log("a new user has connected"); 

  //when a user joins, the name appears in the socket to everyone else 
  socket.on('join', (name) => {  //need to identify the event in index.js
    local_name = name; 
    //tells every other server (server to server connection)
    socket.broadcast.emit('message', `${name} has just entered the chat!`); 
  }); 

  // when a message is received, send to all servers  
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg); 
  }); 

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', `${local_name} has just left the chat!`)
  })
}); 

// TODO: The handler should emit a 'welcome' event to the client, with a message and a name.
// TODO: The handler should also emit a 'disconnected' event when another client disconnects.
// TODO: The handler should also broadcast a message whenever it receives a chat message.

// YOUR CODE HERE


server.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on :3000');
});


