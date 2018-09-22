var express = require('express');
var app = express();
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
let mongoose = require("mongoose");
let path = require("path");

mongoose.connect("mongodb://binwei:gs123456@ds163382.mlab.com:63382/oj")
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", indexRouter);
app.use("/api/v1", restRouter);
app.use((req, res)=>{
  res.sendFile("index.html", {root:path.join(__dirname, '../public/')});
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
