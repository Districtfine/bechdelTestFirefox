
//send background.js a message and use response to populate the dom
browser.runtime.sendMessage('Did this movie pass?', function(response){
    console.log(response.status);
		var DOM_img = document.createElement("img");
		var DOM_link = document.createElement("a");

		//specify bechdel test page for current movie
		if(response.staus){
		}
		//Choose appropriate image to insert
    if(response.status == "404"){
			DOM_img.src = browser.extension.getURL("icons/question_mark.png");
			DOM_img.title = "This movie is not in the bechdeltest.com database";

			DOM_link.appendChild(DOM_img);
			DOM_link.href = "http://bechdeltest.com/add/";
    }
    else if(response.rating == 0 || response.rating == 1 || response.rating == 2){
			DOM_img.src = browser.extension.getURL("icons/x_mark.png");
			DOM_img.title = "This movie did not pass the bechdel test.";
			
			DOM_link.appendChild(DOM_img);
			DOM_link.href = "http://bechdeltest.com/view/" + response.id;

    }
		else if(response.rating == 3){
			DOM_img.src = browser.extension.getURL("icons/yes_mark.png");
			DOM_img.title = "This movie passed the bechdel test!";

			DOM_link.appendChild(DOM_img);
			DOM_link.href = "http://bechdeltest.com/view/" + response.id;
		}
				
		insertSymbol(DOM_link);

});

function insertSymbol(picture){
	try {
		//find place to insert image
		var titleDiv = document.getElementsByClassName("title_wrapper");
		var titleHead = titleDiv[0].getElementsByTagName("h1");
		titleHead[0].append(picture);
	}
	catch (error){
		console.log("somethings wrong: ", error);
	}
}

