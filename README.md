rule-of-thirds bookmarklet that overlays a rule-of-thirds style grid over all images on a page.

To **get the bookmarklet**, visit http://bl.ocks.org/4331769

<a href="http://bl.ocks.org/4331769"><img src="http://dl-web.dropbox.com/u/29440342/screenshots/WIXEIU-2012.12.19-1.27.png" width="600px"/></a>

## Bookmarklet Development Notes

Do the following to be able to use the "RuleOfThirds-localhost" development
version of the bookmarklet:

```bash
# checkout the gist
git clone https://gist.github.com/4331769.git ~/code/rule-of-thirds
# start a mini webserver, to enable http://localhost:9090/rule-of-thirds.bookmarklet.js
cd ~/code/rule-of-thirds
python -m SimpleHTTPServer 9090 
```

When you're done, kill the server via `CTRL-C`.

## TODO

* Figure out how to collect usage statistics 
 - analytics on script tag referrer data? make sure no effect on performance
* Create a feedback mechanism (eg feedback tab for bug reporting)
* Ensure rule-of-thirds.bookmarklet.js doesnt get re-injected needlessly 
 - see http://stackoverflow.com/questions/7373993/how-to-enforce-a-bookmarklet-to-run-only-once
* Start using jsfiddle for examples/test cases
 - eg http://jsfiddle.net/wE2BN/

## Dev Links

CSS:

* http://stackoverflow.com/questions/8049276/can-you-overlay-a-transparent-css3-gradient-over-a-background-image/8049370#8049370
* https://developer.mozilla.org/en-US/docs/CSS/background-size
* http://www.w3schools.com/cssref/css3_pr_background-size.asp
* http://stackoverflow.com/questions/5123489/how-to-overlay-a-play-button-over-a-youtube-thumbnail-image/5123612#5123612
* http://jsfiddle.net/gbU3H/1/ (another bookmarklet that tries to do rule-of-thirds overlay)

SVG:

* http://www.svgbasics.com/lines.html
* http://stackoverflow.com/questions/5069006/change-attributes-defined-in-defs-on-use-element
* http://oreilly.com/catalog/svgess/chapter/ch03.html#t1
* http://www.scribd.com/doc/62408083/SVG-Essentials#outer_page_77 (also can find google book version)

Misc: 

* http://stackoverflow.com/questions/3039818/jquery-include-css/3039915#3039915
* http://stackoverflow.com/questions/530787/simple-http-web-server/532710#532710

Bookmarklet:

* http://coding.smashingmagazine.com/2010/05/23/make-your-own-bookmarklets-with-jquery/
* http://betterexplained.com/articles/how-to-make-a-bookmarklet-for-your-web-application/
* http://subsimple.com/bookmarklets/tips.asp

Canvas:

* http://billmill.org/static/canvastutorial/color.html
* http://diveintohtml5.info/canvas.html
* http://stackoverflow.com/questions/10433046/creating-a-canvas-element-and-setting-its-width-and-height-attributes

jQuery position:

* http://stackoverflow.com/questions/158070/jquery-how-to-position-one-element-relative-to-another/2781557#2781557
* http://api.jquery.com/position/ (the core jquery position() method)
* http://wiki.jqueryui.com/w/page/12138026/Position (jqery UI position(attr) method)
* http://jqueryui.com/position/
* http://view.jqueryui.com/master/ui/jquery.ui.position.js (source code)
* http://css-tricks.com/jquery-ui-position-function/

Require-JS:

* http://www.requirejs.org/jqueryui-amd/example/webapp/app.html
* http://stackoverflow.com/questions/12113172/how-do-i-use-jquery-ui-with-requirejs
* http://requirejs.org/docs/api.html#config-shim
* https://github.com/jrburke/requirejs/issues/509
* http://stackoverflow.com/questions/4918084/pro-and-cons-on-using-requirejs-over-labjs-or-viceversa
* http://msdn.microsoft.com/en-us/magazine/ff943568.aspx

YepNope-JS:

* http://yepnopejs.com/#api
* http://stackoverflow.com/questions/3782649/whats-the-best-way-to-utilize-jquery-ui-theme-on-cdn-with-local-fallback/5609065#5609065
* http://news.ycombinator.com/item?id=1955074

Pages to Test:

* http://www.flickr.com/photos/wallacesilva/6230440322/
* http://500px.com/photo/2177596
* http://en.wikipedia.org/wiki/File:Vermeer-view-of-delft.jpg
* http://pinterest.com/dergachev/beyond-rule-of-thirds-lecture/
* http://evolvingweb.ca/
* http://bl.ocks.org/4331769
