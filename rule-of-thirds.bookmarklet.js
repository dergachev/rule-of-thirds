(function(){
	// check prior inclusion and version
	if (window.jQuery === undefined || window.jQuery.fn.jquery < "1.3.2") {
		var done = false;
		var script = document.createElement("script");
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				initMyBookmarklet();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	} else {
		initMyBookmarklet();
	}
	
	function initMyBookmarklet() {
		(window.myBookmarklet = function() {
//javascript doesn't support newlines in literal strings without backslashes :(
jQuery('head').append('<style type="text/css">\
div.imgWrapper {\
  position: relative;\
  display: inline-block;\
}\
div.imgWrapper:before { \
  background:url("http://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Photo_3x3.svg/500px-Photo_3x3.svg.png");\
  background-size: 100% 100%;\
  background-repeat:no-repeat;\
  width:100%;\
  height: 100%;\
  z-index: 1;\
  top:0;\
  left:0;\
  position: absolute;\
  content: " ";\
}\
</style>');
jQuery('img').wrap('<div class="imgWrapper" />');
		})();
	}

})();
