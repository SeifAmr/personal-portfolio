// Scene 1
// Option 1 Google some stuff
// Option 2 Email Professor/TA for help

// Scene 2
// Option 1: Remainder from scene1
// Option 2: Message in the gc

// Scene 3
// Option 1: Remainder from scene 2
// Option 2: Texting an upperclassman

let option1 = document.getElementById('choice1');
let option2 = document.getElementById('choice2');
let choices_box = document.getElementById('choices-box');
let video = document.getElementById('scene-vid');
let vid_source = document.getElementById('vid-source');
var clicks = 0;
var opt1 = 1;
var opt2 = 2;
var clicked = 0;
var last = false;

let videos = [];
let currentVid = 1;

// Gather videos
for (let i = 1; i < 7; i++){
  videos.push('videos/vid'+i+'.mp4');
}

// Make choices not visible when first scene plays
choices_box.style.visibility = "hidden";
choices_box.style.opacity = "0";

// When a video ends (except the last video) the choices are shown
video.onended = function(){
  if(last == false){
    choices_box.classList.remove('notransition'); //Add transitions for choices
    // console.log("Showing options");
    hide();
  }
  else{
    //Play final video
    nextVideo(5);
  }

}


option1.onclick = function(){
  var temp1 = opt1;
  clicked = 1;
  choices_box.classList.add('notransition');
  hide();
  clicks++;
  reset(option1);
  nextVideo(temp1);

  //Update what next video may be
  switch (clicks) {
    case 1:
      opt1 = 3; //Scene 3
      break;
    case 2:
      opt1 = 4; //Scene 4
      break;
  }
}

option2.onclick = function(){
  var temp2 = opt2;
  clicked = 2;
  choices_box.classList.add('notransition');
  hide();
  clicks++;
  reset(option2);
  nextVideo(temp2);
  //Update what next video might be
  switch (clicks) {
    case 1:
      opt2 = 3; //Scene 3
      break;
    case 2:
      opt2 = 4; //Scene 4
      break;
  }
}


function hide(){
  //Hide choices if visible
  if (choices_box.style.visibility == "visible"){
    choices_box.style.visibility = "hidden";
    choices_box.style.opacity = "0";
  }
  //Show choices if hidden
  else if (choices_box.style.visibility == "hidden"){
    choices_box.style.visibility = "visible";
    choices_box.style.opacity = "1";
  }
}

function reset(update){
  // Updates choice that was selected to the next possible choice
  switch(clicks){
    case 1:
      update.innerHTML = "Text in the groupchat";
      break;
    case 2:
      update.innerHTML = "Ask an upperclassman";
      break;
    case 3:
      // console.log("Last");
      if(update.innerHTML != "Ask an upperclassman"){
        // console.log("Last");
        // If penultimate choice is selected, only display the last choice onwards
        if(clicked == 1){
          option1.style.display = "none";
        }else{
          option2.style.display = "none";
        }
      }else{
        last = true;
      }
      break;
    case 4:{
      last = true;
      break;
    }
  }
}

// Load and auto play the next video
function nextVideo(nextVid){
  currentVid = nextVid;
  vid_source.src = videos[currentVid];
  video.load();
  video.play();
}
