var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d",{antialias: true, antialiasSamples: 4});

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

var counter = 0;
var INC_counter = false;
var test_ball;

var circles = [];
var quantity = 12;

var allPoles = [];

var touching = false;

// SOUNDS
var myStartingSound;
var mySound;
var myBackgroundSound;
var myEndingSound;

// BACKGROUND
var backgroundTexture;

//INTRO
var intro = true;
var introimg;

//INTRO 2
// var showSplashScreen = true;
var myCounter=0;

//COLOR
var color1 = "rgba(250, 115, 108, 1)";
// var color1 = "rgba(249, 234, 52, 1)";
var color2 = "rgba(38, 179, 160, 1)";
// var color3 = "rgba(85, 105, 142, 1)";
var color3 = "rgba(255, 170, 0, 1)";

//SCORE
var score = 0;

var circleCounter=0;
var isTouch = false;
var virtualFinger = {"x":0,"y":0};
if ("ontouchstart" in document.documentElement){
  isTouch = true;
}

function onTouchStart(e){
    INC_counter = true;
}

function onTouchMove(e){

}

function onTouchEnd(e){
  myStartingSound.play();
//  if(isTouch){
//    virtualFinger.x = e.changedTouches[0].pageX;
//    virtualFinger.y = e.changedTouches[0].pageY;
//  }else{
//    virtualFinger.x = e.pageX;
//    virtualFinger.y = e.pageY;
//  }
    INC_counter = false;
    for(var i = 0;i<circles.length;i++){
        var distFromFinger = getDistance(e.changedTouches[0].pageX,e.changedTouches[0].pageY,circles[i].x,circles[i].y);
        var mappedDist = distFromFinger.map(0,height,50,0.9);
        var orientation = e.changedTouches[0].pageX - circles[i].x;
        var mappedOrientation = orientation.map(-width,width,1,-1);
        circles[i].vy = -counter*(Math.random()*3+1);
        circles[i].vx = counter/5*mappedOrientation*mappedDist;
    }
   }

// function created to find distance from finger to circle
// (finger) x,y ------> (circle) x, y
    function getDistance(x1,y1,x2,y2){
  // this is the equation: square root of (x1-y1)*(x1-y2)+(y1-y2)*(y2-y1)
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

function init(){
  circles = [];
  allPoles = [];
  myCounter=0;
  circleCounter=0;
  score = 0;
  var intro = false;

  this.quantity = 1;
  var p = new Pole(ctx);
  p.x = Math.random()*(width-100)+50;
  p.y = height/2-50;
  p.circleCounter=0;
  p.color=color2;
  allPoles.push(p);

  var p1 = new Pole(ctx);
  this.quantity = 1;
  p1.x = Math.random()*(width-100)+50;
  p1.y = height/5;
  p1.circleCounter=0;
  p1.color=color1;
  allPoles.push(p1);

  var p2 = new Pole(ctx);
  this.quantity = 1;
  p2.x = Math.random()*(width-100)+50;
  p2.y = height/16;
  p2.circleCounter=0;
  p2.color=color3;
  allPoles.push(p2);

    for(var i = 0;i<quantity;i++){
      var c = new Circle(ctx);
      this.quantity = 4;
      // draws circles at random potition - the radius of the circle
      c.x = Math.random()*(width-100)+50;
      c.y = height-50;
      c.r = 65;
      c.myCounter=0;
      c.newStrokecolor=color1;
      circles.push(c);

      var c1 = new Circle(ctx);
      this.quantity = 4;
      // draws circles at random potition - the radius of the circle
      c1.x = Math.random()*(width-100)+50;
      c1.y = height-50;
      c1.r = 65;
      c1.myCounter=0;
      c1.newStrokecolor=color2;
      circles.push(c1);

      var c2 = new Circle(ctx);
      this.quantity = 4;
      // draws circles at random potition - the radius of the circle
      c2.x = Math.random()*(width-100)+50;
      c2.y = height-50;
      c2.r = 65;
      c2.myCounter=0;
      c2.newStrokecolor=color3;
      circles.push(c2);
    }
}

function setup(){
  // backgroundTexture = new Image();
  // backgroundTexture.src = 'data/water.jpg';

  introimg = new Image();
  introimg.src = 'data/intro4-04.jpg';

  // document.body.style.backgroundColor = "rgba(38, 179, 160, 1)";
  setTimeout(function(){intro = false;},3000);

  init();

  // SOUND
  myStartingSound = document.createElement('audio');
  myStartingSound.src = "data/2.mp3";
  myStartingSound.preload = true;
  myStartingSound.loop = false;
  myStartingSound.load();
  document.body.appendChild(myStartingSound);

  mySound = document.createElement('audio');
  mySound.src = "data/final3.mp3";
  mySound.preload = true;
  mySound.loop = false;
  mySound.load();
  document.body.appendChild(mySound);

  myBackgroundSound = document.createElement('audio');
  myBackgroundSound.src = "data/ambience.mp3";
  myBackgroundSound.preload = true;
  myBackgroundSound.loop = true;
  myBackgroundSound.load();
  document.body.appendChild(myBackgroundSound);

  myEndingSound = document.createElement('audio');
  myEndingSound.src = "data/1.mp3";
  myEndingSound.preload = true;
  myEndingSound.loop = false;
  myEndingSound.load();
  document.body.appendChild(myEndingSound);

//    if(isTouch){
        // FOR TOUCH DEVICES
      document.addEventListener("touchstart", onTouchStart);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
//    }else{
      // FOR REGULAR SCREENS
//      document.addEventListener("mousedown", onTouchStart);
//      document.addEventListener("mousemove", onTouchMove);
//      document.addEventListener("mouseup", onTouchEnd);
//    }
    draw();
}

function showMessage(ctx, message, font, color, offset){
    offset = offset || 0;
    ctx.font = font || "20px Verdana";
    ctx.fillText(message, width/2, height/2 + offset);
    ctx.textAlign = 'center';
    ctx.fillStyle = color || "rgba(255, 255, 255, 1)";
}

function drawScore() {
    ctx.font = "20px Verdana";
    if(score <= 0){
      ctx.fillStyle = color1;
    }else{
      ctx.fillStyle = color2;
    }
    ctx.fillText(score, width/20, height/20);

  //   if(myCounter == 12){
  //     ctx.font = "bold 200px Verdana";
  //     ctx.fillText(score, width/2, height/2);
  //   }else{
  //     ctx.fillText(score, width/20, height/20);
  // }
}

function drawFinalScore() {
    ctx.font = "bold 200px Verdana";
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillText(score, width/2, height/2);
}

function draw(){
  // if(showSplashScreen){
  //   showMessage(ctx, " ","20px Helvetica","rgba(175,175,175,1)", -45);
  //   showMessage(ctx, "hello","20px Helvetica","rgba(175,175,175,1)", -15);
  //   showMessage(ctx, "world","20px Helvetica","rgba(175,175,175,1)", 15);
  //   setTimeout(function(){showSplashScreen = false;},5000);
  //   mam ya ne mogu ya na pare a ty na menya krichish lyudi smotryat, tebya slyshno dazhe
  if(intro){
      ctx.drawImage(introimg,0,0,width,height);
      showMessage(ctx, " ","20px Verdana","rgba(255,255,255,1)", -45);
      showMessage(ctx, "wonderful waterfuls","20px Verdana","rgba(255,255,255,1)", -15);
      //showMessage(ctx, "wonderful waterfuls","bold 20px Verdana","rgba(255,255,255,1)", +30);
      //myBackgroundSound.play();
    } else {
      //ctx.clearRect(0,0,width,height);
      this.ctx.fillStyle = "rgba(209, 209, 209, 1)";
      // this.ctx.fillStyle = "rgba(38, 179, 160, 1)";
      ctx.fillRect(0,0,width,height);
      drawScore();
      //ctx.drawImage(backgroundTexture,0,0,width,height);
      (INC_counter)?counter++:(counter>0)?counter--:null;

    for(var i = 0;i<allPoles.length;i++){
        allPoles[i].display();
      }

    for(var i = 0;i<circles.length;i++){
        if(!circles[i].touching){
            circles[i].move();
        }
        circles[i].display();
    }
  }

  if(myCounter == 12){
    // setTimeout("drawFinalScore()",500);
    drawFinalScore();
  }

  for(var i = 0;i< circles.length;i++){
    for(var j=0;j< allPoles.length;j++){
     if(getDistance(allPoles[j].x,allPoles[j].y,circles[i].x,circles[i].y) <= 55 && !circles[i].touching){
//SCORE
       if(circles[i].newStrokecolor==allPoles[j].color){
                score += 10;
       }else{
                score -= 10;
       }
                console.log("circle is caught");
                circles[i].touching=true;
                circles[i].x=allPoles[j].x+(Math.random() * 10) + 1;
                circles[i].y=allPoles[j].y-allPoles[j].circleCounter*30+150;
                console.log(i,circles[i].y,allPoles[j].circleCounter,myCounter);
                allPoles[j].circleCounter++;
                myCounter++;
                circles[i].newStrokecolor = allPoles[j].color;
                mySound.play();
        if(myCounter == 12) {
                console.log("no money no honey");
                // setTimeout(function(){drawScore();},500);
                //setTimeout(function(){myEndingSound.play();},500);
                myEndingSound.play();
                setTimeout(function(){circles = [];},500);
                setTimeout(function(){allPoles = [];},500);
                //setTimeout(function(){location.reload();},3000);
                setTimeout(function(){init();},4000);
              }
            }
          }
        }

  requestAnimationFrame(draw);
}

setup();

//utils
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}
