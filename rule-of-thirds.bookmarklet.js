
function initMyBookmarklet() {
  (window.myBookmarklet = function() {
    var $ = jQuery;
    if ($('.rule-of-thirds').remove().length) {
      $('.rule-of-thirds-wrapper > img').unwrap();
      return;
    }
    jQuery('img').each(function(){
      window.el = jQuery(this);
      var el = jQuery(this),
          w = el.width(),
          h = el.height(),
          src = el.attr('src') || "",
          useWrapper = (el.siblings().length == 0) && (el.offsetParent().width() == w)

      //skip small or invisible images
      if (!el.is(':visible') || w < 100 || h < 100) {
        return;
      }

      window.overlay = jQuery('<div />')
        .addClass('rule-of-thirds')
        .css( {
           'position': 'absolute',
           'pointer-events':'none',
           'width': w,
           'height': h,
         })
        .attr('rel',src || "" ) // "undefined" chokes .attr; http://bit.ly/134P0C9
        .append(getSVGOverlaySpiral())
        // .append(getSVGOverlay())
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
        overlay.insertAfter(el);
        //XXX: why does overlay.position need to be run twice on http://bl.ocks.org/4331769
        // console.log("img offset", el.position());
        // console.log("overlay offset", overlay.position());
        overlay.position({"of": el, at: "center"});
        // console.log("overlay offset", overlay.position());
        overlay.position({"of": el, at: "center"});
        // console.log("overlay offset", overlay.position());
      }
    });
  })();
}

//from http://en.wikipedia.org/wiki/File:Fibonacci_spiral.svg
// according to lightroom this is the vertical orientation.
// for horizontal images, need to rotate 90 degrees CW
function getSVGOverlaySpiral() {
  var svg = '<svg\
   xmlns:dc="http://purl.org/dc/elements/1.1/"\
   xmlns:xlink="http://www.w3.org/1999/xlink"\
   xmlns:cc="http://web.resource.org/cc/"\
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\
   xmlns:svg="http://www.w3.org/2000/svg"\
   xmlns="http://www.w3.org/2000/svg"\
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"\
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"\
   id="svg2"\
   sodipodi:version="0.32"\
   inkscape:version="0.44"\
   version="1.0"\
   preserveAspectRatio="none"\
   viewbox="0 0 987.6 611"\
   sodipodi:docbase="/Users/dicklyon/Desktop"\
   sodipodi:docname="Fibonacci_spiral.svg">\
<defs>\
<g id="spiral">\
  <path\
     sodipodi:type="arc"\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;stroke-miterlimit:4;"\
     id="path1873"\
     sodipodi:cx="337.94031"\
     sodipodi:cy="2354.0146"\
     sodipodi:rx="301.58487"\
     sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927"\
     sodipodi:end="4.712389"\
     sodipodi:open="true"\
     transform="matrix(2.022351,0,0,2.164687,-73.02346,-4485.255)" />\
  <path\
     transform="matrix(-1.247009,0,0,1.334775,1031.657,-2765.459)"\
     sodipodi:open="true"\
     sodipodi:end="4.712389"\
     sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464"\
     sodipodi:rx="301.58487"\
     sodipodi:cy="2354.0146"\
     sodipodi:cx="337.94031"\
     id="path1875"\
     style="fill:none;fill-rule:nonzero;stroke-width:1.55021227;stroke-linejoin:miter;stroke-miterlimit:4;"\
     sodipodi:type="arc" />\
  <path\
     sodipodi:type="arc"\
     style="fill:none;fill-rule:nonzero;stroke-width:2.50958937;stroke-linejoin:miter;stroke-miterlimit:4;"\
     id="path2762"\
     sodipodi:cx="337.94031"\
     sodipodi:cy="2354.0146"\
     sodipodi:rx="301.58487"\
     sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927"\
     sodipodi:end="4.712389"\
     sodipodi:open="true"\
     transform="matrix(0,-0.770297,-0.824511,0,2694.923,636.9008)" />\
  <path\
     transform="matrix(0.473354,0,0,-0.50667,594.0855,1658.848)"\
     sodipodi:open="true"\
     sodipodi:end="4.712389"\
     sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464"\
     sodipodi:rx="301.58487"\
     sodipodi:cy="2354.0146"\
     sodipodi:cx="337.94031"\
     id="path2764"\
     style="fill:none;fill-rule:nonzero;stroke-width:4.08389319;stroke-linejoin:miter;stroke-miterlimit:4;"\
     sodipodi:type="arc" />\
  <path\
     sodipodi:type="arc"\
     style="fill:none;fill-rule:nonzero;stroke-width:6.65950083;stroke-linejoin:miter;stroke-miterlimit:4;"\
     id="path2766"\
     sodipodi:cx="337.94031"\
     sodipodi:cy="2354.0146"\
     sodipodi:rx="301.58487"\
     sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927"\
     sodipodi:end="4.712389"\
     sodipodi:open="true"\
     transform="matrix(0.290281,0,0,0.310712,600.7412,-265.2473)" />\
  <path\
     transform="matrix(-0.181793,0,0,0.194589,760.2218,-24.60904)"\
     sodipodi:open="true"\
     sodipodi:end="4.712389"\
     sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464"\
     sodipodi:rx="301.58487"\
     sodipodi:cy="2354.0146"\
     sodipodi:cx="337.94031"\
     id="path2768"\
     style="fill:none;fill-rule:nonzero;stroke-width:10.63364786;stroke-linejoin:miter;stroke-miterlimit:4;"\
     sodipodi:type="arc" />\
  <path\
     sodipodi:type="arc"\
     style="fill:none;fill-rule:nonzero;stroke-width:17.63328083;stroke-linejoin:miter;stroke-miterlimit:4;"\
     id="path2770"\
     sodipodi:cx="337.94031"\
     sodipodi:cy="2354.0146"\
     sodipodi:rx="301.58487"\
     sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927"\
     sodipodi:end="4.712389"\
     sodipodi:open="true"\
     transform="matrix(-0.109629,0,0,-0.117346,757.5983,709.0538)" />\
  <path\
     transform="matrix(6.725143e-2,0,0,-7.198541e-2,697.9484,615.0548)"\
     sodipodi:open="true"\
     sodipodi:end="4.712389"\
     sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464"\
     sodipodi:rx="301.58487"\
     sodipodi:cy="2354.0146"\
     sodipodi:cx="337.94031"\
     id="path2772"\
     style="fill:none;fill-rule:nonzero;stroke-width:28.74464786;stroke-linejoin:miter;stroke-miterlimit:4;"\
     sodipodi:type="arc" />\
  <path\
     sodipodi:type="arc"\
     style="fill:none;fill-rule:nonzero;stroke-width:46.76108466;stroke-linejoin:miter;stroke-miterlimit:4;"\
     id="path2774"\
     sodipodi:cx="337.94031"\
     sodipodi:cy="2354.0146"\
     sodipodi:rx="301.58487"\
     sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927"\
     sodipodi:end="4.712389"\
     sodipodi:open="true"\
     transform="matrix(4.134032e-2,0,0,4.425038e-2,698.8904,341.5598)" />\
  <path\
     transform="matrix(-2.269401e-2,0,0,2.429152e-2,720.4049,382.9198)"\
     sodipodi:open="true"\
     sodipodi:end="4.712389"\
     sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464"\
     sodipodi:rx="301.58487"\
     sodipodi:cy="2354.0146"\
     sodipodi:cx="337.94031"\
     id="path2776"\
     style="fill:none;fill-rule:nonzero;stroke-width:85.18184241;stroke-linejoin:miter;stroke-miterlimit:4;"\
     sodipodi:type="arc" />\
  <path\
     sodipodi:type="arc"\
     style="fill:none;fill-rule:nonzero;stroke-width:123.35285286;stroke-linejoin:miter;stroke-miterlimit:4;"\
     id="path2778"\
     sodipodi:cx="337.94031"\
     sodipodi:cy="2354.0146"\
     sodipodi:rx="301.58487"\
     sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927"\
     sodipodi:end="4.712389"\
     sodipodi:open="true"\
     transform="matrix(0,-1.567144e-2,-1.677462e-2,0,754.3412,445.2738)" />\
  <path\
     transform="matrix(6.469458e-3,0,0,-6.924892e-3,712.7925,459.0548)"\
     sodipodi:open="true"\
     sodipodi:end="4.712389"\
     sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464"\
     sodipodi:rx="301.58487"\
     sodipodi:cy="2354.0146"\
     sodipodi:cx="337.94031"\
     id="path2780"\
     style="fill:none;fill-rule:nonzero;stroke-width:298.80615871;stroke-linejoin:miter;stroke-miterlimit:4;"\
     sodipodi:type="arc" />\
  <path\
     sodipodi:type="arc"\
     style="fill:none;fill-rule:nonzero;stroke-width:326.76929026;stroke-linejoin:miter;stroke-miterlimit:4;"\
     id="path2782"\
     sodipodi:cx="337.94031"\
     sodipodi:cy="2354.0146"\
     sodipodi:rx="301.58487"\
     sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927"\
     sodipodi:end="4.712389"\
     sodipodi:open="true"\
     transform="matrix(0,5.077039e-3,7.378482e-3,0,697.7376,441.2188)" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 712.3099,445.48994 L 712.3099,432.52678"\
     id="rect2784"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 720.30713,445.48994 L 699.38339,445.48994"\
     id="rect2786"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 712.30972,440.52336 L 720.23381,440.52336"\
     id="rect2788"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 715.2674,440.52336 L 715.2674,445.48954"\
     id="rect2790"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 715.2674,442.49549 L 712.30948,442.49549"\
     id="rect2792"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 720.30713,432.52653 L 720.30713,466.52284"\
     id="rect2794"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 699.38363,432.52653 L 754.2489,432.52653"\
     id="rect2796"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 699.38363,466.52217 L 699.38363,377.48576"\
     id="rect2798"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 754.24901,466.52217 L 610.30258,466.52217"\
     id="rect2800"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 754.24901,377.48564 L 754.24901,610.4945"\
     id="rect2802"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 610.30252,377.48564 L 987.15967,377.48564"\
     id="rect2804"\
     sodipodi:nodetypes="cc" />\
  <path\
     style="fill:none;fill-rule:nonzero;stroke-width:1;stroke-linejoin:miter;"\
     d="M 610.30252,610.49292 L 610.30252,0.50000006"\
     id="rect2806"\
     sodipodi:nodetypes="cc" />\
</g>\
</defs>\
<use xlink:href="#spiral" style="stroke: white; stroke-width: 2;"/>\
<use xlink:href="#spiral" style="stroke: black; stroke-width: 2;stroke-dasharray: 2;"/>\
</svg>';
  return svg;
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
<use xlink:href="#horizontal-lines" style="stroke: white; stroke-width: 2;"/>\
<use xlink:href="#vertical-lines" style="stroke: white; stroke-width: 2;"/>\
<use xlink:href="#horizontal-lines" style="stroke: grey; stroke-width: 2; stroke-dasharray: 2;"/>\
<use xlink:href="#vertical-lines" style="stroke: grey; stroke-width: 2; stroke-dasharray: 2;"/>\
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

