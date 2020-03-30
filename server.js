var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var routes = require("./routes/routes")
var PORT =  process.env.PORT || 3000;
var exphbs  = require('express-handlebars');
var app = express();
 

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.use(routes)

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI ;
// Connect to the Mongo DB


mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
// Require all models
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){

    console.log('connected to moongose')
})



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
