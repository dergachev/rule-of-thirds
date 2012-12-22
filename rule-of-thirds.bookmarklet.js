function createOverlay(width,height){
  var canvas = jQuery('<canvas />')
    .attr({ 
      'width':width, 
      'height':height
    });
 
  var ctx = canvas[0].getContext('2d');

  var drawLine = function(x1,y1,x2,y2) {
    drawLineHelper(x1,y1,x2,y2,'white',8);
    drawLineHelper(x1,y1,x2,y2,'black',4);
  }

  var drawLineHelper = function(x1,y1,x2,y2,strokeStyle,lineWidth) { 
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
  }

  // horizontal lines
  drawLine(0,height/3, width,height/3);
  drawLine(0,2*height/3, width,2*height/3);

  // vertical lines
  drawLine(width/3,0, width/3,height);
  drawLine(2*width/3,0, 2*width/3,height);

  return canvas;
}

function initMyBookmarklet() {
  (window.myBookmarklet = function() {
    var $ = jQuery;
    if ($('.imgBefore').remove().length) {
      return;
    } 
    jQuery('img').each(function(){ 
      //console.log(this);
      var el = jQuery(this);
      if (!el.is(':visible') || el.width() < 100 || el.height() < 100) {
        //skip small or invisible images
        return;
      } 
      createOverlay(el.width(),el.height())
        .css( { 
          'position':'absolute',
          'z-index':'1000', //TODO: make this dynamic via maxZIndex implementation
          'pointer-events':'none'})
        .offset(el.offset())
        .prependTo('body');
    });
  })();
}
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
