function getWidth() {
     return Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth,
          document.body.offsetWidth,
          document.documentElement.offsetWidth,
          document.documentElement.clientWidth
     );
}
   
function getHeight() {
     return Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.documentElement.clientHeight
     );
}
function convertRemToPixels(rem) {    
     return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
var num = 1;
function cloneGif() {
     //var gif = document.getElementById("gif");
     for (var i = 0; i < num; i++) {
          var clone = document.createElement("img");
          clone.src = "./gif.gif";
          clone.classList.add("clone");
          clone.onclick = function() {cloneGif();};
          clone.style.left = 
               Math.floor(Math.random() * (getWidth() - convertRemToPixels(6))) + "px";
          clone.style.top = 
               Math.floor(Math.random() * (getHeight() - convertRemToPixels(6))) + "px";
          document.body.appendChild(clone);
     }
     num *= 2;
};

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Bounds = Matter.Bounds,
    Vertices = Matter.Vertices,
    Body = Matter.Body;

// create an engine
var engine = Engine.create();
var render, leftBound, rightBound, topBound, bottomBound, prevW, prevH, banner, spawner, runner;
function init() {
     banner = document.getElementById("banner");
     spawner = document.getElementById("spawner");
     var w = getWidth();
     prevW = getWidth();
     var h = banner.getBoundingClientRect().height;
     prevH = banner.getBoundingClientRect().height;
     // create a renderer
     render = Render.create({
          element: document.body,
          engine: engine,
          options: {
               width: w,
               height: h,
               wireframes: false,
               background: 'transparent',
               wireframeBackground: 'transparent'
          }
     });
     topBound = Bodies.rectangle(w/2, -10, w, 20, { isStatic: true, render: {fillStyle: 'transparent'} });
     bottomBound = Bodies.rectangle(w/2, h + 10, w, 20, { isStatic: true, render: {fillStyle: 'transparent'} });
     leftBound = Bodies.rectangle(-10, h/2, 20, h, { isStatic: true, render: {fillStyle: 'transparent'} });
     rightBound = Bodies.rectangle(w + 10, h/2, 20, h, { isStatic: true, render: {fillStyle: 'transparent'} });
          
     // add all of the bodies to the world
     Composite.add(engine.world, [leftBound, rightBound, topBound, bottomBound]);
     
     // run the renderer
     Render.run(render);
     
     // create runner
     runner = Runner.create();
     
     // run the engine
     Runner.run(runner, engine);
}
let colors = [
     'darkblue',
     'blueviolet',
     'cadetblue',
     'darkorchid',
     'indigo'
];
var interval;
function spawn() {
     interval = setInterval(function() {
          var w = banner.getBoundingClientRect().width;
          var r = spawner.getBoundingClientRect();
          console.log(r.top);
          var box = Bodies.rectangle(w/2, r.top + window.scrollY - convertRemToPixels(11) + (r.height / 2), 40, 40, { render: {
               fillStyle: colors[Math.floor(Math.random()*colors.length)]
          } });
          Composite.add(engine.world, box);
          Body.setVelocity(box, {x: ((Math.random() * 5) + 10) * (Math.random() > .5 ? 1 : -1), y: (Math.random() * 20) - 15});
          Body.setAngularSpeed(box, Math.random() * 2 - 1);
     }, 100);
}
function kill() {
     clearInterval(interval);
}
var trapped = false;
function trap() {
     if (!trapped) {
          trapped = true;
          Body.scale(bottomBound, .001, .001);
          setTimeout(function() {
               Body.scale(bottomBound, 1000, 1000);
               trapped = false;
          }, 1500);
     }
}

window.onresize = function() {
     Render.setSize(render, getWidth(), banner.getBoundingClientRect().height);
     var w = banner.getBoundingClientRect().width;
     var h = banner.getBoundingClientRect().height;
     Body.scale(topBound, w/prevW, 1);
     Body.scale(bottomBound, w/prevW, 1);
     Body.scale(leftBound, 1, h/prevH);
     Body.scale(rightBound, 1, h/prevH);
     Body.setPosition(topBound, {x: w/2, y: -10});
     Body.setPosition(bottomBound, {x: w/2, y: h + 10});
     Body.setPosition(leftBound, {x: -10, y: h/2});
     Body.setPosition(rightBound, {x: w + 10, y: h/2});
     prevW = w;
     prevH = h;
};