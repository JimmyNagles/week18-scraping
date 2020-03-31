const router = require("express").Router();

var axios = require("axios");
var cheerio = require("cheerio");
const db = require("../models");


router.get('/scrape', function (req, res) {
  console.log('-------------------------------------------------')
        var resultsArray=[];
    
    
            axios.get("https://www.miamiherald.com/news/").then(function (response) {
                // Then, we load that into cheerio and save it to $ for a shorthand selector
                var $ = cheerio.load(response.data);
                // Now, we grab every h2 within an article tag, and do the following:
                $("article").each(function (i, element) {
                    // Save an empty result object
                    

                    // Add the text and href of every link, and save them as properties of the result object
                    const link = $(element).find("h3").children().attr("href");
                    const title = $(element).find("h3").text();
                    const topic = $(element).find("h2").text();
                    const time = $(element).find("time").text();
                    const image = $(element).find("img").attr("src");
                      
                  
                        resultsArray.push({
                            title,
                            topic,
                            time,
                            link,
                            image

                        })

                        console.log('resultsArray', resultsArray)

                    });

              
                    db.Article.create(resultsArray)
                    .then(function(dbArticle) {
                      // View the added result in the console
                      console.log("added new article",dbArticle);
                    })
                  

                
                    db.Article.find({})
                    .then(function(dbArticle) {
                      // If we were able to successfully find Articles, send them back to the client
                      console.log("dbbb articles",dbArticle)
                      res.render('home',{articles: dbArticle});
                    //   res.json(dbArticle);
                    })
                    .catch(function(err) {
                      // If an error occurred, send it to the client
                      res.json(err);
                    });



            });





 });


 router.get('/', function (req, res) {
  
  db.Article.find({})
  .then(function(dbArticle) {
    // If we were able to successfully find Articles, send them back to the client
    console.log("dbbb articles",dbArticle)
    res.render('home',{articles: dbArticle});
  //   res.json(dbArticle);
  })
});

  module.exports = router;