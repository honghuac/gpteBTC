// get the query string from URL ... everything after the question mark
var queryString = document.URL.split('?')[1];

// if queryString is not null ... then append query string to all <a href> links
// only apply this rule for localhost
//
if (queryString !== undefined && queryString.indexOf("localhost") !== -1) {

	// get list of all <a> tags
	var a = document.getElementsByTagName('a');
	var length = a.length;

	// loop thru each and append query string
	for(var i=0; i< length; i++){
		a[i].href += '?' + queryString;
	}
}
