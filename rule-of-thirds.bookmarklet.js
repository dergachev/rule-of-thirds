
function initMyBookmarklet() {
  (window.myBookmarklet = function() {
    var $ = jQuery;
    if ($('.rule-of-thirds').remove().length) {
      $('.rule-of-thirds-wrapper > img').unwrap();
      return;
    }
    jQuery('img').each(function(){
      var el = jQuery(this),
          w = el.width(),
          h = el.height(),
          src = el.attr('src') || "",
          useWrapper = (el.siblings().length == 0) && (el.offsetParent().width() == w)

      //skip small or invisible images
      if (!el.is(':visible') || w < 100 || h < 100) {
        return;
      }

      var overlay = jQuery('<div />')
        .addClass('rule-of-thirds')
        .css( {
           'position': 'absolute',
           'pointer-events':'none',
           'width': w,
           'height': h,
         })
        .attr('rel',src || "" ) // "undefined" chokes .attr; http://bit.ly/134P0C9
        .append(getSVGOverlay())
        // .append(getCanvasOverlay(w,h))

      if (useWrapper) { // should be fairly harmless; fixes pinterest zoom
        var wrapper = jQuery('<div />')
          .addClass('rule-of-thirds-wrapper')
          .css({
            'position':'relative',
            'display' : 'inline-block', //fixes super-long pins eg http://pinterest.com/pin/552113235537700759/
            'text-align' : 'center',
          })
          .appendTo(el.parent())
          .append(el)
          .append(overlay);

        overlay.css({
          'width' : '100%',
          'height' : '100%',
          'top': '0px',
          'left': '0px',
        });
      } else {
        overlay.insertAfter(el)
          .position({"of": el, at: "center"});
      }
    });
  })();
}

function getSVGOverlay() {
  // multiline strings in JS require trailing backslashes
  // including the <?xml tag causes errors, so we remove it
  // var svg = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\
  var svg = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\
<svg \
xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\
version="1.1" viewBox="0 0 300 300" preserveAspectRatio="none">\
<defs>\
<g id="horizontal-lines">\
<polyline vector-effect="non-scaling-stroke" points="0,100 300,100" />\
<polyline vector-effect="non-scaling-stroke" points="0,200 300,200" />\
</g>\
<g id="vertical-lines">\
<polyline vector-effect="non-scaling-stroke" points="100,0 100,300" />\
<polyline vector-effect="non-scaling-stroke" points="200,0 200,300" />\
</g>\
</defs>\
<use xlink:href="#horizontal-lines" style="stroke: white; stroke-width: 12"/>\
<use xlink:href="#vertical-lines" style="stroke: white; stroke-width: 12"/>\
<use xlink:href="#horizontal-lines" style="stroke: black; stroke-width: 4"/>\
<use xlink:href="#vertical-lines" style="stroke: black; stroke-width: 4"/>\
</svg>';
  return jQuery(svg);
}

function getCanvasOverlay(width,height){
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

  drawLines(lines,'white',12);
  drawLines(lines,'black',4);

  return canvas;
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
  function isUndefined(val) {
    return typeof(val) === "undefined";
  }

  var needJq = isUndefined(window.jQuery) ||
    jQuery.fn.jquery.match(/^1\.[0-9]+/) <= 1.4;

  var needJqUiPosition = isUndefined(window.jQuery) || isUndefined(jQuery.ui) || isUndefined(jQuery.ui.position);

  yepnope([{
    test: needJq,
    yep: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.4.4/jquery.min.js',
  }, {
    // check for jQuery.ui.position
    test: needJqUiPosition,
    yep: 'https://gist.github.com/raw/4331769/dbfadedd1691b5e5fa006062682bab14390bec52/jquery.ui.position.js',
    complete: function (url, result, key) {
      initMyBookmarklet();
      // TODO: makes our jQuery version not clobber pre-existing one (eg for pinterest)
      // jQuery.noConflict(true) doesn't seem to work properly
    }
  }
  ]);
}

