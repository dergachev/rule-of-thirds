function initMyBookmarklet() {
  (window.myBookmarklet = function() {
    // TODO: simplify state handling on multiple-clicks of bookmarklet
    RuleOfThirds.stateMachine.advance();
  })();
}

// inspired by http://lamehacks.net/blog/implementing-a-state-machine-in-javascript/
RuleOfThirds = window.RuleOfThirds || {}
RuleOfThirds.stateMachine = RuleOfThirds.stateMachine || new (function (){
  states = [
    { name:'OFF',
      onEnter: function() {
        removeOverlays();
      }
    },
    { name:'GRID_THIRDS',
      onEnter: function() {
        removeOverlays(); // unnecessary due to order of state advance()
        createOverlays(function() { return getSVGOverlayThirdsGrid("GRID_THIRDS")} );
      }
    },
    { name:'GRID_PHI',
      onEnter: function() {
        removeOverlays(); // unnecessary due to order of state advance()
        createOverlays(function() { return getSVGOverlayThirdsGrid("GRID_PHI")} );
      }
    },
    { name:'TRIANGLES',
      onEnter: function() {
        removeOverlays(); // unnecessary due to order of state advance()
        createOverlays(function() { return getSVGOverlayThirdsGrid("TRIANGLES")} );
      }
    },
    { name:'SPIRAL',
      onEnter: function() {
        removeOverlays();
        createOverlays(getSVGOverlaySpiral);
      }
    }
  ];

  this.currentState = states[0];
  this.advance = function(){
    this.currentState = states[(states.indexOf(this.currentState) + 1) % states.length];
    this.currentState.onEnter();
  }
})();

/*
 * Removes RuleOfThirds overlays.
 */
function removeOverlays() {
    if (jQuery('.rule-of-thirds').remove().length) {
      jQuery('.rule-of-thirds-wrapper > img').unwrap();
    }
}

function createOverlays(overlayFactory) {
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
      .append(overlayFactory())
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
   sodipodi:docname="Fibonacci_spiral.svg">\
<defs>\
<filter id="offsetAndBlack" x="0" y="0" width="200%" height="200%">\
  <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />\
  <feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />\
  <feBlend in="SourceGraphic" in2="matrixOut" mode="normal" />\
</filter>\
<g id="spiral">\
  <path id="path1873" sodipodi:type="arc"\
     vector-effect="non-scaling-stroke"\
     sodipodi:cx="337.94031" sodipodi:cy="2354.0146" sodipodi:rx="301.58487" sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927" sodipodi:end="4.712389" sodipodi:open="true"\
     transform="matrix(2.022351,0,0,2.164687,-73.02346,-4485.255)"\
     vector-effect="non-scaling-stroke" />\
  <path id="path1875" sodipodi:type="arc"\
     transform="matrix(-1.247009,0,0,1.334775,1031.657,-2765.459)"\
     sodipodi:open="true" sodipodi:end="4.712389" sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     vector-effect="non-scaling-stroke"\
     sodipodi:ry="281.75464" sodipodi:rx="301.58487" sodipodi:cy="2354.0146" sodipodi:cx="337.94031"\
     vector-effect="non-scaling-stroke" />\
  <path id="path2762" sodipodi:type="arc"\
     sodipodi:cx="337.94031" sodipodi:cy="2354.0146" sodipodi:rx="301.58487" sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927" sodipodi:end="4.712389" sodipodi:open="true"\
     transform="matrix(0,-0.770297,-0.824511,0,2694.923,636.9008)"\
     vector-effect="non-scaling-stroke" />\
  <path id="path2764" sodipodi:type="arc"\
     transform="matrix(0.473354,0,0,-0.50667,594.0855,1658.848)"\
     sodipodi:open="true" sodipodi:end="4.712389" sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464" sodipodi:rx="301.58487" sodipodi:cy="2354.0146" sodipodi:cx="337.94031"\
     vector-effect="non-scaling-stroke" />\
  <path id="path2766" sodipodi:type="arc"\
     sodipodi:cx="337.94031" sodipodi:cy="2354.0146" sodipodi:rx="301.58487" sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927" sodipodi:end="4.712389" sodipodi:open="true"\
     transform="matrix(0.290281,0,0,0.310712,600.7412,-265.2473)"\
     vector-effect="non-scaling-stroke" />\
  <path id="path2768" sodipodi:type="arc"\
     transform="matrix(-0.181793,0,0,0.194589,760.2218,-24.60904)"\
     sodipodi:open="true" sodipodi:end="4.712389" sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464" sodipodi:rx="301.58487" sodipodi:cy="2354.0146" sodipodi:cx="337.94031"\
     vector-effect="non-scaling-stroke" />\
  <path id="path2770" sodipodi:type="arc"\
     sodipodi:cx="337.94031" sodipodi:cy="2354.0146" sodipodi:rx="301.58487" sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927" sodipodi:end="4.712389" sodipodi:open="true"\
     transform="matrix(-0.109629,0,0,-0.117346,757.5983,709.0538)"\
     vector-effect="non-scaling-stroke" />\
  <path id="path2772" sodipodi:type="arc"\
     transform="matrix(6.725143e-2,0,0,-7.198541e-2,697.9484,615.0548)"\
     sodipodi:open="true" sodipodi:end="4.712389" sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464" sodipodi:rx="301.58487" sodipodi:cy="2354.0146" sodipodi:cx="337.94031"\
     vector-effect="non-scaling-stroke"\ />\
</g>\
<g id="rectangles">\
  <path d="M 754.24901,466.52217 L 610.30258,466.52217" id="rect2800" sodipodi:nodetypes="cc" vector-effect="non-scaling-stroke" />\
  <path d="M 754.24901,377.48564 L 754.24901,610.4945" id="rect2802" sodipodi:nodetypes="cc" vector-effect="non-scaling-stroke" />\
  <path d="M 610.30252,377.48564 L 987.15967,377.48564" id="rect2804" sodipodi:nodetypes="cc" vector-effect="non-scaling-stroke" />\
  <path d="M 610.30252,610.49292 L 610.30252,0.50000006" id="rect2806" sodipodi:nodetypes="cc" vector-effect="non-scaling-stroke" />\
</g>\
</defs>\
<use xlink:href="#spiral" style="fill:none; stroke: grey; stroke-width: 4;" />\
<use xlink:href="#spiral" style="fill:none; stroke: white; stroke-width: 2;" />\
<use xlink:href="#rectangles" style="vector-effect:none; stroke: grey; stroke-width: 4;"/>\
<use xlink:href="#rectangles" style="vector-effect:none; stroke: white; stroke-width: 2;"/>\
</svg>';
  /*

  // Removed inner spirals
  <path d="M 712.3099,445.48994 L 712.3099,432.52678" id="rect2784" sodipodi:nodetypes="cc" />\
  <path d="M 720.30713,445.48994 L 699.38339,445.48994" id="rect2786" sodipodi:nodetypes="cc" />\
  <path d="M 712.30972,440.52336 L 720.23381,440.52336" id="rect2788" sodipodi:nodetypes="cc" />\
  <path d="M 715.2674,440.52336 L 715.2674,445.48954" id="rect2790" sodipodi:nodetypes="cc" />\
  <path d="M 715.2674,442.49549 L 712.30948,442.49549" id="rect2792" sodipodi:nodetypes="cc" />\
  <path d="M 720.30713,432.52653 L 720.30713,466.52284" id="rect2794" sodipodi:nodetypes="cc" />\
  <path d="M 699.38363,432.52653 L 754.2489,432.52653" id="rect2796" sodipodi:nodetypes="cc" />\
  <path d="M 699.38363,466.52217 L 699.38363,377.48576" id="rect2798" sodipodi:nodetypes="cc" />\

  // Removed inner lines
  <path id="path2774" sodipodi:type="arc"\
     style=""\
     sodipodi:cx="337.94031" sodipodi:cy="2354.0146" sodipodi:rx="301.58487" sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927" sodipodi:end="4.712389" sodipodi:open="true"\
     transform="matrix(4.134032e-2,0,0,4.425038e-2,698.8904,341.5598)" />\
  <path id="path2776" sodipodi:type="arc"\
     transform="matrix(-2.269401e-2,0,0,2.429152e-2,720.4049,382.9198)"\
     sodipodi:open="true" sodipodi:end="4.712389" sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464" sodipodi:rx="301.58487" sodipodi:cy="2354.0146" sodipodi:cx="337.94031"\
     style="" />\
  <path sodipodi:type="arc" id="path2778"\
     style=""\
     sodipodi:cx="337.94031" sodipodi:cy="2354.0146" sodipodi:rx="301.58487" sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927" sodipodi:end="4.712389" sodipodi:open="true"\
     transform="matrix(0,-1.567144e-2,-1.677462e-2,0,754.3412,445.2738)" />\
  <path id="path2780" sodipodi:type="arc"\
     transform="matrix(6.469458e-3,0,0,-6.924892e-3,712.7925,459.0548)"\
     sodipodi:open="true" sodipodi:end="4.712389" sodipodi:start="3.1415927"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:ry="281.75464" sodipodi:rx="301.58487" sodipodi:cy="2354.0146" sodipodi:cx="337.94031"\
     style="" />\
  <path id="path2782" sodipodi:type="arc"\
     style=""\
     sodipodi:cx="337.94031" sodipodi:cy="2354.0146" sodipodi:rx="301.58487" sodipodi:ry="281.75464"\
     d="M 36.355438,2354.0146 A 301.58487,281.75464 0 0 1 337.94031,2072.26"\
     sodipodi:start="3.1415927" sodipodi:end="4.712389" sodipodi:open="true"\
     transform="matrix(0,5.077039e-3,7.378482e-3,0,697.7376,441.2188)" />\
     */
  return svg;
}



function getSVGOverlayThirdsGridTemplate() {
  // multiline strings in JS require trailing backslashes
  // including the <?xml tag causes errors, so we remove it
  // var svg = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\
  var svg = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\
<svg \
xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\
version="1.1" viewBox="<%= viewBox %>" preserveAspectRatio="none">\
<defs>\
<g id="lines">\
<% _.each(lines, function(line) { %>\
<polyline vector-effect="non-scaling-stroke" points="<%= line %>" />\
<% }); %>\
</g>\
</defs>\
<use xlink:href="#lines" style="stroke: grey; stroke-width: 4;"/>\
<use xlink:href="#lines" style="stroke: white; stroke-width: 2;"/>\
</svg>';
  return svg;
}

function getSVGOverlayThirdsGrid(type) {

  /*   |  |
     --+--+-- h1
       |  |
     --+--+-- h2
       |  |
      v1  v2   */


  var width = 300,
      height = 300,
      phi = 1.6180339887;

  switch (type) {
    case "GRID_PHI":
      var v1 = width * (1-(1/phi)),
          v2 = width * (1/phi),
          h1 = height * (1-(1/phi)),
          h2 = height * (1/phi);
      break;
    // case "TRIANGLES":
    //   var v1 = width * (1-(1/phi)),
    //       v2 = width * (1/phi),
    //       h1 = height * (1-(1/phi)),
    //       h2 = height * (1/phi);
    //   break;
    case "GRID_THIRDS":
    default:
      var v1 = width * (1/3),
          v2 = width * (2/3),
          h1 = height * (1/3),
          h2 = height * (2/3);
  }
  var lines = {
    h1: [0, h1, width, h1],
    h2: [0, h2, width, h2],
    v1: [v1, 0, v1, height],
    v2: [v2, 0, v2, height]
  };


  // inspired by https://github.com/documentcloud/underscore/issues/220
  function objectMapPreserveKeys(obj,map) {
    return _.reduce(obj, function(memo,v,k) { memo[k] = map(v); return memo; }, {});
  }

  var svg = _.template(getSVGOverlayThirdsGridTemplate(), {
    // viewBox: "0 0 300 300",
    // h1: "0,100 300,100",
    // h2: "0,200 300,200",
    // v1: "100,0 100,300",
    // v2: "200,0 200,300"
    viewBox: [0,0,width,height].join(" "),
    lines: objectMapPreserveKeys(lines, function(v) { return v.join(", ")})
  });

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

  var needJq = isUndefined(window.jQuery) || jQuery.fn.jquery.match(/^1\.[0-9]+/) <= 1.4,
      needJqUiPosition = isUndefined(window.jQuery) || isUndefined(jQuery.ui) || isUndefined(jQuery.ui.position),
      needUnderscore = isUndefined(window._) || isUndefined(_.template);

  yepnope([{
      test: needJq,
      yep: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.4.4/jquery.min.js',
    }, {
      // check for jQuery.ui.position
      test: needJqUiPosition,
      yep: 'https://gist.github.com/raw/4331769/dbfadedd1691b5e5fa006062682bab14390bec52/jquery.ui.position.js'
    }, {
      // check for jQuery.ui.position
      test: needUnderscore,
      yep: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.3/underscore-min.js',
      complete: function (url, result, key) {
        initMyBookmarklet();
        // TODO: makes our jQuery version not clobber pre-existing one (eg for pinterest)
        // jQuery.noConflict(true) doesn't seem to work properly
      }
    }
  ]);
}

