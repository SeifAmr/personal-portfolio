AOS.init();

$('#arrow').click(function(){
$(document).scrollTop(850) // Scroll to section on arrow click
});

let fill = document.getElementById("gauge-fill");

// Beeping audio
let warning = document.getElementById('warning');
warning.volume = 0.05;
warning.playbackRate = 0.5;
warning.loop = true;


function scroll (){ //Make additional content of webapge visible after the user begins scrolling
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100 ;
    var max = 100;
    fill.style.height = max - scrolled + "%";

    if (scrolled >= 15) { //Play beeping upon arriving at first era. Increase speed of beeping audio further as you scroll
      warning.play();
      if(scrolled >= 90){
        warning.playbackRate = 3.0;
      }
      else if (scrolled >= 75) {
        warning.playbackRate = 2.8;
      }
      else if (scrolled >= 60) {
        warning.playbackRate = 2.6;
      }
      else if(scrolled >= 45){
        warning.playbackRate = 1.0;
      }
      else if(scrolled >= 30){
        warning.playbackRate = 0.7;
      }
      else if(scrolled >= 15){
        warning.playbackRate = 0.5;
      }
    }
    else{ //Stop beeping if not in era section
      warning.pause();
      warning.currentTime = 0;
    }
}

window.onscroll = function() {
  scroll();
}

let stoneAgePlayer = document.getElementById('stone-age-player');
let stoneAgeImage = document.getElementById('stone-age-img');

var click = [0, 0, 0, 0, 0, 0]; //Use click to play or pause audio. Even click: play. Odd clicks: pause
var currPlayer = stoneAgePlayer;
var currIndex=0;

// Stone Age
stoneAgeImage.addEventListener('click', ()=>{
  click[0]++;
})

stoneAgeImage.addEventListener('click', ()=> {
  if(stoneAgePlayer.paused && (click[0]%2 === 1)){
    if(currPlayer != stoneAgePlayer){ //Pause and reset previous audio
        currPlayer.pause();
        click[currIndex]++;
        currPlayer.currentTime = 0;
    }
    stoneAgePlayer.play(); //Play this audio
    currPlayer = stoneAgePlayer;
    currIndex = 0;
  }
})

stoneAgeImage.addEventListener('click', ()=> { //Pause this audio
  if(stoneAgePlayer.played && (click[0]%2 === 0)){
    stoneAgePlayer.pause();
  }
})

//Steel & Iron Age
let steelAgePlayer = document.getElementById('steel-age-player');
let steelAgeImage = document.getElementById('steel-age-img');
steelAgeImage.addEventListener('click', ()=>{
  click[1]++;
})

steelAgeImage.addEventListener('click', ()=> {
  if(steelAgePlayer.paused && (click[1]%2 === 1)){
    if(currPlayer != steelAgePlayer){ //Pause and reset previous audio
        currPlayer.pause();
        click[currIndex]++;
        currPlayer.currentTime = 0;
    }
    steelAgePlayer.play();//Play this audio
    currPlayer = steelAgePlayer;
    currIndex = 1;
  }
})

steelAgeImage.addEventListener('click', ()=> {
  if(steelAgePlayer.played && (click[1]%2 === 0) ){ //Pause this audio
    steelAgePlayer.pause();
  }
})


//Medieval & Renaissance Age
let medievalAgePlayer = document.getElementById('medieval-age-player');
let medievalAgeImage = document.getElementById('medieval-age-img');
medievalAgeImage.addEventListener('click', ()=>{
  click[2]++;
})

medievalAgeImage.addEventListener('click', ()=> {
  if(medievalAgePlayer.paused && (click[2]%2 === 1)){
    if(currPlayer != medievalAgePlayer){//Pause and reset previous audio
        currPlayer.pause();
        click[currIndex]++;
        currPlayer.currentTime = 0;
    }
    medievalAgePlayer.play(); //Play this audio
    currPlayer = medievalAgePlayer;
    currIndex = 2;
  }
})

medievalAgeImage.addEventListener('click', ()=> {
  if(medievalAgePlayer.played && (click[2]%2 === 0) ){ //Pause this audio
    medievalAgePlayer.pause();
  }
})


//Industrial Age
let industrialAgePlayer = document.getElementById('industrial-age-player');
let industrialAgeImage = document.getElementById('industrial-age-img');
industrialAgeImage.addEventListener('click', ()=>{
  click[3]++;
})

industrialAgeImage.addEventListener('click', ()=> {
  if(industrialAgePlayer.paused && (click[3]%2 === 1)){
    if(currPlayer != industrialAgePlayer){//Pause and reset previous audio
        currPlayer.pause();
        click[currIndex]++;
        currPlayer.currentTime = 0;
    }
    industrialAgePlayer.play(); //Play this audio
    currPlayer = industrialAgePlayer;
    currIndex = 3;
  }
})

industrialAgeImage.addEventListener('click', ()=> {
  if(industrialAgePlayer.played && (click[3]%2 === 0) ){ //Pause this audio
    industrialAgePlayer.pause();
  }
})

//Modern Age

let modernAgePlayer = document.getElementById('modern-age-player');
let modernAgeImage = document.getElementById('modern-age-img');
modernAgeImage.addEventListener('click', ()=>{
  click[4]++;
})

modernAgeImage.addEventListener('click', ()=> {
  if(modernAgePlayer.paused && (click[4]%2 === 1)){
    if(currPlayer != modernAgePlayer){ //Pause and reset previous audio
        currPlayer.pause();
        click[currIndex]++;
        currPlayer.currentTime = 0;
    }
    modernAgePlayer.play(); //Play this audio
    currPlayer = modernAgePlayer;
    currIndex = 4;
  }
})

modernAgeImage.addEventListener('click', ()=> {
  if(modernAgePlayer.played && (click[4]%2 === 0) ){ //Pause this audio
    modernAgePlayer.pause();
  }
})

//The Future Age
let futureAgePlayer = document.getElementById('future-age-player');
let futureAgeImage = document.getElementById('future-age-img');
futureAgeImage.addEventListener('click', ()=>{
  click[5]++;
})

futureAgeImage.addEventListener('click', ()=> {
  if(futureAgePlayer.paused && (click[5]%2 === 1)){
    if(currPlayer != futureAgePlayer){ //Pause and reset previous audio
        currPlayer.pause();
        click[currIndex]++;
        currPlayer.currentTime = 0;
    }
    futureAgePlayer.play(); //Play this audio
    currPlayer = futureAgePlayer;
    currIndex=5;
  }
})

futureAgeImage.addEventListener('click', ()=> {
  if(futureAgePlayer.played && (click[5]%2 === 0) ){ //Pause this audio
    futureAgePlayer.pause();
  }
})

//Safari Support
var events=["abort","canplay","canplaythrough","durationchange","emptied","ended",
    "error","loadeddata","loadedmetadata","loadstart","pause","play","playing",
    "progress","ratechange","readystatechange","seeked","seeking","stalled",
    "suspend","timeupdate","volumechange","waiting"]
// The Plugin.
$.fn.scrollPlay=function(O){
  return this.each(function(){
    var audio=this
    audio.volume=0
    audio.play()
    $(window).on('scroll scroll-music',function(){
      var st=$(window).scrollTop(),
        isLoud=$(audio).is('.loud')
        loud=st>=O.top && st< O.bottom,
        isIgnored=$(audio).is('.ignored')
      if (isIgnored){
        if(audio.volume!=0){
          $(audio).trigger("scroll-before-off").stop().animate({volume:0},O.duration,function(){
              $(audio).trigger("scroll-off")
          })
        }
      }else if (isLoud !=loud){
        if (isLoud){
          $(audio).trigger("scroll-before-off").stop().animate({volume:0},O.duration,function(){
            $(audio).trigger("scroll-off")
          })
        }else{
          $(audio).trigger("scroll-before-on").stop().animate({volume:1},O.duration,function(){
            $(audio).trigger("scroll-on")
          })
        }
        $(audio).toggleClass('loud',loud)
      }
    }).trigger('scroll-music')
  })
}
// a simple way to call it.
$(function(){
  var set=localStorage.musicSet
  if (set)
    $('.set1,.set2').not('.'+set).addClass('ignored')
  else
    $('.set2').addClass('ignored')
  $('.switch').click(function(){
    var set=this.id
    localStorage.musicSet=set
    $('.set1,.set2').addClass('ignored').removeClass('loud').filter('.'+set).removeClass('ignored')
    $(window).trigger('scroll-music')
  })
// creating the dimensions of containers to play the sounds
  $('#soundTour2').scrollPlay({
    top:550,
    bottom:1320,
    duration:2000
  })

  $('#soundTour3').scrollPlay({
    top:1320,
    bottom:2090,
    duration:2000
  })

  $('#soundTour4').scrollPlay({
    top:2090,
    bottom:2860,
    duration:2000
  })
  $('#soundTour5').scrollPlay({
    top:2860,
    bottom:3630,
    duration:2000
  })
  $('#soundTour6').scrollPlay({
    top:3630,
    bottom:4400,
    duration:2000
  })
  $('#soundTour7').scrollPlay({
    top:4400,
    bottom:5170,
    duration:2000
  })

  $('audio').on({// only needed for debugging
    volumechange:function(){
      $('#monitor_'+this.id).width(this.volume*100).text(' ')
    },
    'scroll-before-off scroll-before-on scroll-off scroll-on':function(e){
      $('#musicStatus').prepend("<div>"+e.type +" " + $(this).attr('src')+"</div>")
    }
  })
  $(window).scroll(function(){
    var top=$(window).scrollTop(),
      currentDiv=0,
      active=false
    if (top<0) return
    $('.float').parent().each(function(i){
      var float=$(this).find('.float'),
        dTop = $(this).offset().top,
        dHeight=$(this).outerHeight(),
        bHeight=float.outerHeight(),
        dBottom = dTop + dHeight,
        current = dTop <= top && dBottom >= top
      if(current) {
        active=current&& top-dTop<dHeight-bHeight
        currentDiv=i
        if(active){
          float.css({top:top-dTop})
        }
        return false
      }
    })
    $('.float').each(function(i){
      if(i<currentDiv || (i==currentDiv && !active))
        $(this).css({top:$(this).parent().outerHeight()-$(this).outerHeight()})
      else if(i>currentDiv)
        $(this).css({top:0})
    })
  }).trigger('scroll')
})
function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
}
