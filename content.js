browser.runtime.sendMessage('Did this movie pass?', function(response){
    console.log(response);
});

