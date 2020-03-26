var axios = require("axios");
var cheerio = require("cheerio");




module.exports = {
    scrape: function (){ 

        
        axios.get("https://www.nytimes.com/").then(function(response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
        
            // Now, we grab every h2 within an article tag, and do the following:
            $(".skin .skin-card .large .def-feed").each(function(i, element) {
              // Save an empty result object
              var result = {};
        
              // Add the text and href of every link, and save them as properties of the result object
              result.title = $(this)
                .children("a")
                .text();
              result.link = $(this)
                .children("a")
                .attr("href");
        
              // Create a new Article using the `result` object built from scraping
                    console.log(result)
        
            });
              
            });
            
        }  
    }