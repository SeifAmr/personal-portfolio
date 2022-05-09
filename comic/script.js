var storyplot = 0;
// 0 = monkey less evolved
// 1 = humans less evolved

// funtion to handle dragging
function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

function changeScreen(thistarget) {
  // detecting which one is dropeed
  let droppedItem = document.getElementsByClassName("drag-drop");
  storyplot = thistarget === droppedItem[0] ? 0 : 1;
  $(".welcomeScreenWrapper").fadeOut(1000, () => {
    // fade in the required story
    if (storyplot == 0) $("#monkeysplide").fadeIn();
    else $("#humansplide").fadeIn();
    $("body").css("background-color", "black");
  });
}

$(document).ready(() => {
  // some kind of interaction
  /* The dragging code for '.draggable' from the demo above
   * applies to this demo as well so it doesn't have to be repeated. */

  // enable draggables to be dropped into this
  interact(".dropzone").dropzone({
    // only accept elements matching this CSS selector
    accept: "#yes-drop",
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,

    // listen for drop related events:

    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add("drop-active");
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget;
      var dropzoneElement = event.target;

      // feedback the possibility of a drop
      dropzoneElement.classList.add("drop-target");
      draggableElement.classList.add("can-drop");
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove("drop-target");
      event.relatedTarget.classList.remove("can-drop");
    },
    ondrop: function (event) {
      // to do when the target is dropped
      changeScreen(event.relatedTarget);
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove("drop-active");
      event.target.classList.remove("drop-target");
    },
  });

  interact(".drag-drop").draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true,
      }),
    ],
    autoScroll: true,
    // dragMoveListener from the dragging demo above
    listeners: { move: dragMoveListener },
  });
});

// variable for knowing which slide is currently on
var currSlide = 0;
var prevSlide = 0;
var splide = new Splide(".splide", {
  direction: "ttb",
  height: "100vh",
  speed: 3500,
});

// event listener when its moving
splide.on("move", () => {
  currSlide = splide.index;
  let newDiv = $(".splide__slide img")[currSlide];
  let prevDiv = $(".splide__slide img")[prevSlide];
  // changing the previous slide number to the new one
  prevSlide = currSlide;
  // adding animation to the slides
  // animate__animated animate__bounce
  $(newDiv).addClass("animate__animated animate__zoomIn");
  $(prevDiv).addClass("animate__animated animate__zoomOut");

  newDiv.style.setProperty("--animate-duration", "2.5s");
  prevDiv.style.setProperty("--animate-duration", "2.5s");
  // to unhide the elements after the animation is done
  prevDiv.addEventListener("animationend", () => {
    // do something
    $(prevDiv).removeClass("animate__animated animate__zoomOut");
    $(prevDiv).removeClass("animate__animated animate__zoomIn");
    prevDiv.style.opacity = 1;
  });
});

splide.mount();

// splide for humans least evolved

var currSlide2 = 7;
var prevSlide2 = 7;
var splide2 = new Splide(".splide2", {
  direction: "ttb",
  height: "100vh",
  speed: 3500,
});

// event listener when its moving
splide2.on("move", () => {
  currSlide2 = splide2.index + 7;
  let newDiv = $(".splide__slide img")[currSlide2];
  let prevDiv = $(".splide__slide img")[prevSlide2];
  // changing the previous slide number to the new one
  prevSlide2 = currSlide2;
  // adding animation to the slides
  // animate__animated animate__bounce
  $(newDiv).addClass("animate__animated animate__zoomIn");
  $(prevDiv).addClass("animate__animated animate__zoomOut");

  newDiv.style.setProperty("--animate-duration", "2.5s");
  prevDiv.style.setProperty("--animate-duration", "2.5s");
  // to unhide the elements after the animation is done
  prevDiv.addEventListener("animationend", () => {
    // do something
    $(prevDiv).removeClass("animate__animated animate__zoomOut");
    $(prevDiv).removeClass("animate__animated animate__zoomIn");
    prevDiv.style.opacity = 1;
  });
});

splide2.mount();