(function(){
	// check prior inclusion and version
	var v = "1.3.2";
	if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
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
div.imgWrapper.enabled {\
  position: relative;\
  display: inline-block;\
}\
div.imgWrapper.enabled:before { \
  background:url("https://gist.github.com/raw/4331769/rule-of-thirds.png");\
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
div.imgWrapper.enabled>img { \
filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); /* Firefox 10+, Firefox on Android */\
-webkit-filter: grayscale(100%);\
-moz-filter: grayscale(100%);\
-ms-filter: grayscale(100%);\
-o-filter: grayscale(100%);\
filter: grayscale(100%);\
}\
</style>');
jQuery('img').each(function(){
  var el = jQuery(this);
  if(el.parent('.imgWrapper').length==0) {
  	el.wrap('<div class="imgWrapper" />');
  }
});
jQuery('div.imgWrapper').toggleClass('enabled');

		})();
	}
})();
