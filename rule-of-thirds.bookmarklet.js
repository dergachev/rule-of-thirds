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
      // if (!el.is(':visible') || el.width() < 100 || el.height() < 100) {
      if (el.width() < 100 || el.height() < 100) {
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
	// check prior inclusion and version
	// var v = "1.4";
	var v = "1.8";
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
	
// })();
}); //define but dont run


(function(){
		var done = false;
		var script = document.createElement("script");
		//script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js";
		script.src = "//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.1/require.min.js";
		script.onload = script.onreadystatechange = function(){
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				requireDeps();
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
})();


function depsDone($) {
  initMyBookmarklet();
}
function requireDeps() {
  require.config({
    baseUrl: "//cdnjs.cloudflare.com/ajax/libs",
    paths: { //remember that requirejs appends .js to all paths!
        "jquery": "jquery/1.8.3/jquery.min"
      , "jquery-ui": "jqueryui/1.9.2/jquery-ui.min"
      // performance enhancement: load only jquery-ui-position, ideally from a CDN or via gist
      // , "jquery-ui-position": "http://view.jqueryui.com/master/ui/jquery.ui.position"
    },
    shim: {
        "jquery-ui": {
             exports: "$"
           , deps: ['jquery']
         }
      // , "jquery-ui-position": {
      //        exports: "$"
      //      , deps: ['jquery']
      //    }
    }
  });
  require(['jquery-ui'], function($){ 
    depsDone($);
  });
}

