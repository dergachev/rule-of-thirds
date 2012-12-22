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

## Dev Links

CSS:

* http://stackoverflow.com/questions/8049276/can-you-overlay-a-transparent-css3-gradient-over-a-background-image/8049370#8049370
* https://developer.mozilla.org/en-US/docs/CSS/background-size
* http://www.w3schools.com/cssref/css3_pr_background-size.asp
* http://stackoverflow.com/questions/5123489/how-to-overlay-a-play-button-over-a-youtube-thumbnail-image/5123612#5123612

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
