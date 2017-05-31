
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

      console.log(response.status);
      if(response.status == '403'){
      	renderMessage("This move is not yet in the bechdeltest.com database", 'status');
      }
      else if(response.rating == '3'){
      	renderMessage('This movie passes the bechdeltest!', 'status');
      }
      else if(response.rating == '2'){
      	renderMessage('This movie features two women talking, but about a man', 'status');
      }
      else if(response.rating == '1'){
      	renderMessage('This movie features two women, but they don\'t talk', 'status');
      }
      else{
      	renderMessage('This movie does not feature two women', 'status')
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
  console.log("hi")

}


function renderMessage(statusText, elementID) {
  document.getElementById(elementID).textContent = statusText;
}

function getIMDbID(url){
  var regex = /\d{7}/;
  var id = url.match(regex)[0];
  return id;
}

document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    if(url.slice(7,19) === "www.imdb.com"){
      getBechdelResults(getIMDbID(url));
    }
  });
});
