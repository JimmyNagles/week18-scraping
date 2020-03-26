var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
var PORT = 3000;
var exphbs  = require('express-handlebars');

var routes = require("./routes/routes")
 

var app = express();
 

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(routes)

// Connect to the Mongo DB

mongoose.connect("mongodb://localhost/week18-scraping", { useNewUrlParser: true });
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
