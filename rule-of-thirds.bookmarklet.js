(function(){
	// check prior inclusion and version
	var v = "1.4";
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
	
})();
function initMyBookmarklet() {
  (window.myBookmarklet = function() {

    var $ = jQuery;
    if ($('.imgBefore').remove().length) {
      console.log("RETURNING");
      // means we're running a second time, so turning off
      return;
    } 

    //jQuery('img[src="http://media-cache-ec4.pinterest.com/upload/552113235537700745_J0r1RRQP_c.jpg"]').each(function(){ 
    jQuery('img').each(function(){ 
      //console.log(this);
      var el = jQuery(this);
      if (!el.is(':visible') || el.width() < 100 || el.height() < 100) {
        //skip small or invisible images
        return;
      } 
      // console.log([el.width(), el.height(),el.offset(), el.css('z-index')]);


      var overlay = jQuery('<div class="imgBefore" />')
      .height(el.height())
      .width(el.width())
      .offset(el.offset())
      .css('z-index', 100)
      // .css('z-index', el.css('z-index'))
      .appendTo('body');
    });

    //javascript doesn't support newlines in literal strings without backslashes :(
    jQuery('head').append('<style type="text/css">\
        .imgBefore {\
          //background:url("http://localhost:9090/rule-of-thirds.svg");\
          background:url("https://gist.github.com/raw/4331769/d61a2c473189e09731bda7a2d4ff3620bc99eece/rule-of-thirds.svg");\
      background-size: 100% 100%;\
      z-index:100;\
      pointer-events: none;\
      position: absolute;\
        }\
        </style>');


  })();
  }
