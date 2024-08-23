var screwnum = 0;
var screws = [];
var plate;
var btn;
function init() {
     screws.push(document.getElementById("screw0"));
     screws.push(document.getElementById("screw2"));
     screws.push(document.getElementById("screw3"));
     screws.push(document.getElementById("screw1"));
     plate = document.getElementById("plate");
     btn = document.getElementById("btn");
     screws[0].classList.add("current");
     screws[0].addEventListener("click", function() {
          screws[0].classList.add("unscrew");
          screws[0].classList.remove("current");
          screws[1].classList.add("current");
          screws[1].addEventListener("click", function() {
               screws[1].classList.add("unscrew");
               screws[1].classList.remove("current");
               screws[2].classList.add("current");
               screws[2].addEventListener("click", function() {
                    screws[2].classList.add("unscrew");
                    screws[2].classList.remove("current");
                    screws[3].classList.add("current");
                    plate.classList.add("unplate");
                    var t = setTimeout(function() {
                         plate.classList.remove("unplate");
                         plate.classList.add("swing");
                    }, 1500);
                    screws[3].addEventListener("click", function() {
                         clearTimeout(t);
                         var rotate = window.getComputedStyle(plate).transform;
                         plate.classList.remove("swing");
                         plate.style.transform = rotate;
                         btn.classList.remove("undisplay");
                         plate.classList.add("fall");
                         screws[3].classList.add("unscrew");
                         screws[3].classList.remove("current");
                    });
               });
          });
     });
}

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

function brick() {
     while (true) {}
}