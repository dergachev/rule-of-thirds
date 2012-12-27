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
      var el = jQuery(this);
      //TODO: deal with invisible images gracefully
      if (!el.is(':visible') || el.width() < 100 || el.height() < 100) {
        //skip small or invisible images
        return;
      } 
      createOverlay(el.width(),el.height())
        // .css( { 
        //   'position':'absolute',
        //   'z-index':'1000', //TODO: make this dynamic via maxZIndex implementation
        //   'pointer-events':'none'})
        // .offset(el.offset())
        .addClass('rule-of-thirds')
        .css( { 
          //'z-index':'10000', //TODO: make this dynamic via maxZIndex implementation
          'position': 'absolute',
          'pointer-events':'none'
        })
        .insertAfter(el)
        // http://stackoverflow.com/questions/158070/jquery-how-to-position-one-element-relative-to-another
        // http://css-tricks.com/jquery-ui-position-function/
        .position({"of": el, at: "center"});
    });
  })();
}

(function(){
		var done = false;
		var script = document.createElement("script");
		script.src = "//cdnjs.cloudflare.com/ajax/libs/yepnope/1.5.4/yepnope.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				requireDeps();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
})();

function requireDeps() {
  yepnope([{
    test: typeof(jQuery) === "undefined" || jQuery.fn.jquery.match(/^1\.[0-9]+/) <= 1.4,
    yep: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.4.4/jquery.min.js',
  }, {
    // check for jQuery.ui.position
    test: typeof(jQuery) === "undefined" || typeof(jQuery.ui) === "undefined",
    yep: 'http://view.jqueryui.com/master/ui/jquery.ui.position.js',
    complete: function (url, result, key) {
      initMyBookmarklet();
      // makes our jQuery version not clobber pre-existing one (eg for pinterest)
      // jQuery.noConflict(true); // doesn't seem to work properly
    }
  }
  ]);
}

