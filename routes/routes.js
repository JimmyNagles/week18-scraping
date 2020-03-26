
var path = require("path");
var scrape = require("../script/scrape")



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  

    app.get('/', function (req, res) {
        res.render('home');
    });


     
    // app.get('/scrape', function (req, res) {

    //     scrape.scrape();
    //     // res.render('home');


        
    // });
     

 
};