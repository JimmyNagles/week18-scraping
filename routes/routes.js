const router = require("express").Router();
const scrape = require("../script/scrape");
var axios = require("axios");
var cheerio = require("cheerio");
const db = require("../models")


router.get('/', function (req, res) {

res.render('home')

 });



  module.exports = router;