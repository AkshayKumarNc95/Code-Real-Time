// initialize express
var express = require('express');
var app = express();
// create express peer server
var ExpressPeerServer = require('peer').ExpressPeerServer;

var options = {
    debug: true
}

const PORT = process.env.PORT || 9000; 

// create a http server instance to listen to request
var server = require('http').createServer(app);

// peerjs is the path that the peerjs server will be connected to.
app.use('/peerjs', ExpressPeerServer(server, options));
// Now listen to your ip and port.
server.listen(PORT,()=>{
    console.log(`Peer-server started at the port - ${PORT}`)
});