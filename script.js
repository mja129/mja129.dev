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