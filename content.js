
//send background.js a message and use response to populate the dom
browser.runtime.sendMessage('Did this movie pass?', function(response){
    console.log(response.rating);
    if(response.rating == 3){
        //use check mark
    }
    else{
        //use x mark
    }

});

//TODO: Implement this
function insertSymbol(picture){

}

