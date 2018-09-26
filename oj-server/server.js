var express = require('express');
var app = express();
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
let mongoose = require("mongoose");
let path = require("path");
let http = require("http");

let socket_io = require("socket.io");
let io = socket_io();
let socketService= require("./services/socketService.js")(io);

mongoose.connect("mongodb://binwei:gs123456@ds163382.mlab.com:63382/oj")
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", indexRouter);
app.use("/api/v1", restRouter);
app.use((req, res)=>{
  res.sendFile("index.html", {root:path.join(__dirname, '../public/')});
});


// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

let server = http.createServer(app);
io.attach(server);
server.listen(3000);
server.on('error', onError);
server.on('listening', onListening);

function onError(error){
  throw error;
}

function onListening(){
  let addr = server.address();
  let bind = typeof addr === 'string'
  ? 'pipe'+address
  :'port'+addr.port;

  console.log("Listening on "+bind);
}
