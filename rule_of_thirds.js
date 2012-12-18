var $ = jQuery;
$('head').append('<style type="text/css">div.imgWrapper {position: relative; display: inline-block;} div.imgWrapper:before { background:url("http://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Photo_3x3.svg/500px-Photo_3x3.svg.png"); background-size: 100% 100%; background-repeat:no-repeat; width:100%; height: 100%; z-index: 3; top:0; left:0; position: absolute; content: " "; } </style>');
$('img').wrap('<div class="imgWrapper" />');
