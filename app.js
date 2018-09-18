//dependencies

const http = require('http');
const config = require('./config');

//Instantiate the server
const server = http.createServer((req,res)=>{

  //trimming the url path
  let trimmedPath = req.url.replace(/^\/+|\/+$/g,'');

  // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
  let chosenHandler = typeof(router[trimmedPath]) !== 'undefined'? router[trimmedPath]: message.notFound;

  // route the request to the handler specified in the router
    chosenHandler((statusCode,message)=>{
      
    // Use the status code returned from the handler, or set the default status code to 200
    statusCode = (typeof(statusCode) == 'number'? statusCode: 200);

    let returnMsg = {
        msgRes:message
    }
    // Use the payload(message) returned from the handler, or set the default payload to an empty object
    message = (typeof(message) == 'object'? returnMsg.msgRes: {});

    // Converting the payload to a string
    messageString = JSON.stringify(message);

    //returning the response
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode);
    res.end(messageString);
  });
});

//listening to port 3000

server.listen(config.port,()=>{
  console.log(`the server is listening to port ${config.port}`);
});

// defining handlers
let message = {};
message.hello = (callback)=>{
  callback(200,{'Hi':'welcome to the Coding World'});
};

message.notFound = (callback)=>{
  callback(404);
};

let router = {
  'hello': message.hello
};
