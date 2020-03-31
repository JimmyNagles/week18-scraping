$(document).ready(() => {


$("#SearchArticles").on("click",()=>{

    $.get('/scrape').then(result => {

        location.reload(true)
        
        console.log('result', result);
   

      })


} )












});