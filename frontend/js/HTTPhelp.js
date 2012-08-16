
function createHttpObject() {
	try {
		return new XMLHttpRequest();
	}
	catch (err) {
		//cannot create ordinary XMLHttpRequest, probably IE
	}
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch (err) {}
	try {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	catch (err) {}

	throw new Error("HTTP request object not created.");
}

/**
* DB getters for article objects
*/
function getArticle(){
	//get last article
	return getArticle(null);
}
function getArticle(num){
	var adr = "article";
	if(num != null && num > 0){
		adr += "?" + num;
	}
	var request = createHttpObject();
	request.open("GET", adr , false);
	request.send(null);
	var article = JSON.parse(request.responseText)[0];
	return article;
}