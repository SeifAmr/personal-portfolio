var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


(function() {

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true,
    body = document.body,
    html = document.documentElement,
    width = Math.max(body.scrollWidth,html.scrollWidth,body.offsetWidth,html.offsetWidth,html.clientWidth),
    height =  Math.max( body.scrollHeight, body.offsetHeight,
                   html.clientHeight, html.scrollHeight, html.offsetHeight);
    console.log(height);

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {


        target = {x: width/2, y: height/2};

        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height +'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        ctx.textAlign = 'center';

        // create points
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;

                var p = {x: px, originX: px, y: py, originY: py };
                // create dictionary (p) to save y and x axis of the points
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // assign a circle to each point
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.8)');
            points[i].circle = c;
        }
    }

    // Event handling
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);


    }
// Tracking the mouse (adding scrollTop + clienty)
    function mouseMove(e) {
        var posx = posy = 0;
        const largeHeader1 = document.getElementById('large-header');
        var scrollNumberY = largeHeader1.scrollTop;
        var scrollNumberX = largeHeader1.scrollLeft;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX;
            posy = e.clientY;
        }



        target.x = posx +scrollNumberX;
        target.y = posy + scrollNumberY;

    }
// using scrollTop to stop animation when not needed
    function scrollCheck() {
      const largeHeader1 = document.getElementById('large-header');

        if(largeHeader1.scrollTop > height) animateHeader = false;

        else {
          animateHeader = true;}

    }

    function resize() {
        width = Math.max(body.scrollWidth,html.scrollWidth,body.offsetWidth,html.offsetWidth,html.clientWidth);
        height = Math.max( body.scrollHeight, body.offsetHeight,
                         html.clientHeight, html.scrollHeight, html.offsetHeight );
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // initiate the animation for shifting points
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }
//function for animating
    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // detect points in range
                // move the points with their circle
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }
// recursively shift points: using Tweenlite
    function shiftPoint(p) {
        TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }});
    }

    // draw lines and color it by #008CBA
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); //start line from current point
            ctx.lineTo(p.closest[i].x, p.closest[i].y); // line ends at the closetpoint[i]
            ctx.strokeStyle = 'rgba(0, 140, 186, 0.4)'; // color the line and make it slightly transparent
            ctx.stroke();
        }
    }

    function Circle(pos,rad,color) {
        var _this = this;

        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(0, 140, 186,0.8)';
            ctx.fill();
        };
    }

    // get distance between two points
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

})();
$("#start").click(() => {
  $("#start").hide()
})
AOS.init()
