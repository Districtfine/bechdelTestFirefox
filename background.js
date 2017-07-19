//stuck on getting results from getBechdelResults into the response
browser.runtime.onMessage.addListener(function (request, sender, sendResponse){
  getCurrentTabUrl(function(url) {
    getBechdelResults(getIMDbID(url));
  });
  
});


function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  browser.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}


function getBechdelResults(id, callback){
  var url = 'http://bechdeltest.com/api/v1/getMovieByImdbId?imdbid=' + id;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(this.readyState == 4){
      var response = JSON.parse(this.responseText);
      
      var ratingResponse = -3;
      if(id == 0){
        ratingResponse = -2;
      }
      else if(response.status == '403' || response.status == '404'){
        ratingResponse = -1;
      }
      else{ 
        ratingResponse = response.rating;
      }
     }
  };
  xhr.open("GET", url, true);
  xhr.send();
}



function getIMDbID(url){
  var regex = /t{2}\d{7}/;
  if(url.includes('title')){
    var id = url.match(regex)[0];
    var scrubID = id.slice(2);
  }
  else{
    scrubID = 0;
  }
  return scrubID;
}