
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


function makeXMLHttpRequest(url){
  
}

function getBechdelResults(id){
  var url = 'http://bechdeltest.com/api/v1/getMovieByImdbId?imdbid=' + id;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(this.readyState == 4){
      console.log("ready state is: " + this.readyState);
      var response = JSON.parse(this.responseText);

      if(id == 0){
        sendMessage("This is not a movie page", 'status');
      }
      else if(response.status == '403' || response.status == '404'){
      	sendMessage("This movie is not yet in the bechdeltest.com database", 'status');
      }
      else if(response.rating == '3'){
      	sendMessage('This movie passes the bechdeltest!', 'status');
      }
      else if(response.rating == '2'){
      	sendMessage('This movie features two women talking, but about a man', 'status');
      }
      else if(response.rating == '1'){
      	sendMessage('This movie features two women, but they don\'t talk', 'status');
      }
      else if(response.rating == '0'){
      	sendMessage('This movie does not feature two women', 'status')
      }
     }
  };
  xhr.open("GET", url, true);
  xhr.send();
  console.log("hi")

}


function sendMessage(statusText, elementID) {
  document.getElementById(elementID).textContent = statusText;
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

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    if(url.slice(7,19) === "www.imdb.com"){
      getBechdelResults(getIMDbID(url));
    }
    else{
      sendMessage("You are not currently at imdb.com", 'status');
    }
  });
});
