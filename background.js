browser.runtime.onMessage.addListener(function respondToMessage (request, sender, sendResponse){
  getCurrentTabUrl(function(url) {
    getBechdelResults(getIMDbID(url), function sendRating (response){
      sendResponse(response);
    });
  });
  return true;
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

//Make XML HTTP Request to bechdeltest.com to find the specific movie that is being requested
function getBechdelResults(id, callback){
  var url = 'http://bechdeltest.com/api/v1/getMovieByImdbId?imdbid=' + id;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(this.readyState == 4){
      var response = JSON.parse(this.responseText);
      
      callback(response);
     }
  };
  xhr.open("GET", url, true);
  xhr.send();
}


//parse URL and extract IMDb ID
function getIMDbID(url){
  var regex = /t{2}\d{7}/; //tt followed by 7 digits
  if(url.includes('title')){
    var id = url.match(regex)[0];
    var scrubID = id.slice(2);
  }
  else{
    scrubID = 0;
  }
  return scrubID;
}
