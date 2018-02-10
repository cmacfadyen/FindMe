var arrowDiv = document.createElement('div');
arrowDiv.innerHTML='<div class = "visible-cursor upper-left goback"><a href="desk.html"><img src="images/left-arrow.png"></a></div>';
document.body.appendChild( arrowDiv);
var audio = new Audio('audio/drift.mp3');
audio.loop=true;
audio.play();
