/*var button = document.getElementById('#play');
button.addEventListener('click',function(){
var audio = new Audio('magicflute.mp3');
audio.play();
});
*/
// create web audio api context for touch tones
$().on("click", function(){window.location.href="desk.html"});
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var gain = audioCtx.createGain();

var audioTracks = [new Audio('audio/call.mp3'),new Audio('audio/hotelanswer.mp3'),
                    new Audio('audio/error.mp3'), new Audio('audio/dial1.mp3')];

var tones1 = [1209,1336,1477];
var tones2 = [697,770,852];
var tonecol=0, tonerow=0;


var numDialed = [0,0,0,0,0,0,0,0,0,0,0];
var correctNum = [1,5,1,4,5,5,5,0,1,9,4];
var numsEntered = 0;
var currentDigit = 0;
//0 is empty, 1 is in use
var dialTone=false;

$(".numkey").on("click", function(e){
  e.preventDefault();
  dial(e.target.id);

});

function dial(digit){
  if(digit=='flash'){
    if(dialTone){
      //hangs up
    numsEntered=0;
    dialTone=false;
    currentDigit=0;
  }
  else{
    placeCall();
    dialTone=true;
    currentDigit=0;
  }
  }
  else if(digit=='play'){
    playVoicemail();
  }
  else if(digit=='redial'){
    placeCall();
    currentDigit=0;
  }
  else{
    if(numsEntered<11){

      //figure out which sine waves to add
      toneCol=(digit-1)%3;
      toneRow=Math.abs(Math.floor((digit-1)/3));

      touchTone(digit);
      //add digit to the number dialed
      numDialed[numsEntered] = digit;
      tableizeNum(digit);
      numsEntered++;
      if(numsEntered==11){
        placeCall();
      }
    }
  }
}

function placeCall(){
  numsEntered=0;
  currentDigit=0;
  if(numDialed[0]!= 1){
    playDialOne();
  }
  else if(numDialed.toString() == correctNum.toString()){
    playHotelMessage();
  }
  else{
    playErrorMessage();
  }
}

function tableizeNum(digit){
  var firstNum = '0';
  document.getElementById(firstNum+currentDigit).innerHTML=digit;
  currentDigit++;
}

function playVoicemail(){
  playIt(audioTracks[0]);
}
function playHotelMessage(){
  playIt(audioTracks[1]);
}
function playErrorMessage(){
  playIt(audioTracks[2]);
}
function playDialOne(){
  playIt(audioTracks[3]);
}

function touchTone(digit){
  var oscillator1 = audioCtx.createOscillator();
  var oscillator2 = audioCtx.createOscillator();
  gain.gain.value=0.05;
  //  gain.gain.linearRampToValueAtTime(0.5, 1);
  oscillator1.type = 'sine';
  oscillator1.frequency.setValueAtTime(tones1[toneCol], audioCtx.currentTime); // value in hertz
  oscillator1.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator1.start();
  oscillator1.stop(audioCtx.currentTime+0.5);
  oscillator2.type = 'sine';
  oscillator2.frequency.setValueAtTime(tones2[toneRow], audioCtx.currentTime); // value in hertz
  oscillator2.connect(gain);
  gain.connect(audioCtx.destination);
  oscillator2.start();
  oscillator2.stop(audioCtx.currentTime+0.5);
}

function playIt(audio) {
    if (audio.paused) {
        audio.play();
    }else{
        audio.pause();
        audio.currentTime = 0
    }
}
