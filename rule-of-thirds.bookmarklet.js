function createOverlay(width,height){
  var canvas = jQuery('<canvas />')
    .attr({ 
      'width':width, 
      'height':height
    });
 
  var ctx = canvas[0].getContext('2d');

  var drawLine = function(line,strokeStyle,lineWidth) {
    var x1 = line[0],
        y1 = line[1],
        x2 = line[2],
        y2 = line[3];
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
  }

  function drawLines(lines,color,size) {
    lines.forEach(function(line) {
      drawLine(line,color,size);
    });
  }

  /*   |  |
     --+--+-- h1
       |  |
     --+--+-- h2
       |  |    
      v1  v2   */

  var h1 = [0, height/3, width, height/3],
      h2 = [0, 2*height/3, width, 2*height/3],
      v1 = [width/3, 0, width/3, height],
      v2 = [2*width/3, 0, 2*width/3, height];

  var lines = [h1,h2,v1,v2];

  drawLines(lines,'white',4);
  drawLines(lines,'black',2);

  return canvas;
}

function initMyBookmarklet() {
  (window.myBookmarklet = function() {
    var $ = jQuery;
    if ($('canvas.rule-of-thirds').remove().length) {
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
        .addClass('rule-of-thirds')
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
