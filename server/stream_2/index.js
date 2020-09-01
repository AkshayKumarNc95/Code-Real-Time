const server  = require('http').createServer();
const CodeStream = require('./src/stream/CodeStreamer');

// Declarations
const port = process.env.PORT || 3023; 


// Core - 
// Attach the Stream server to the  
CodeStream.io.attach(server);



server.listen(port, ()=>{
    console.log(`Socket Server Started at the PORT - ${port}`);
});


