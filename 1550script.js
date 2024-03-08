var wires = [];
var root = [];
var rootarrows = [];
var leaves = [];
var deadleaves = [];
var boxes = [];
var selected = null;
var panelToBin;
var binToPt;
var ptToRam;
var ramToBtn;
var titleText;
var bin = [];
var button;
var working = false;
var cleared = true;
const links = [
     null, // 0x0F
     null, // 0x0E
     null, // 0x0D
     null, // 0x0C
     null, // 0x0B
     null, // 0x0A
     null, // 0x09
     null, // 0x08
     null, // 0x07
     null, // 0x06
     "https://drive.google.com/file/d/1330asddvFvPyyiaD6nXlOOrJms1glj3k/view?usp=sharing", // 0x05
     "https://drive.google.com/file/d/1y1h7fXoaIcndnagqJduiam9M3bd5CICs/view?usp=sharing", // 0x04
     "https://drive.google.com/file/d/1bfDdBFYrlHCpKc6ka71cah8y13DQNQ6w/view?usp=sharing", // 0x03
     "https://drive.google.com/file/d/1MfgOiPHb5qDXtw0fM2xOxPDJSwxcCKGA/view?usp=sharing", // 0x02
     "https://drive.google.com/file/d/19Yn8-8EOW68abCgAwKcFVX6NJ6g-qmUX/view?usp=sharing", // 0x01
     "https://drive.google.com/file/d/1CrXdVg35PLtAyRI1gxuQKGy7rsudJVfJ/view?usp=sharing", // 0x00
]
function init() {
     panelToBin = document.getElementById("paneltobin");
     binToPt = document.getElementById("bintopt");
     ptToRam = document.getElementById("pttoram");
     ramToBtn = document.getElementById("ramtobtn");
     button = document.getElementById("btn");
     titleText = document.getElementById("recslides");
     for (var i = 1; i <= 16; i++) {
          wires[i - 1] = document.getElementById("op" + i + "wire");
          boxes[i - 1] = document.getElementById("op" + i + "box");
          leaves[i - 1] = document.getElementById(
               "leaf" + 
               Math.floor((i - 1) / 4) +
               (i - 1) % 4
          );
          deadleaves[i - 1] = document.getElementById(
               "leaf" + 
               Math.floor((i - 1) / 4) +
               (i - 1) % 4 +
               "dead"
          );
     }
     for (var i = 0; i < 4; i++) {
          root[i] = document.getElementById("root" + i);
          rootarrows[i] = document.getElementById("rootarr" + i);
          bin[i] = document.getElementById("bin" + i);
     }
     flickerOff();
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
async function boxclick(n) {
     if (working) {return;}
     working = true;
     if (selected == null || selected != n) {
          boxes[n].classList.add("selected");
          wires[n].style.display = "inline";
          if (selected != null) {
               boxes[selected].classList.remove("selected");
               wires[selected].style.display = "none";
          } else {
               panelToBin.style.display = "inline";
          }
          updateBin(n);
          if (selected == null) {
               await sleep(1000);
          } else {
               await sleep(200);
          }
          selected = n;
          updateDisplay(n);
     } else {
          boxes[n].classList.remove("selected");
          wires[n].style.display = "none";
          panelToBin.style.display = "none";
          selected = null;
          bin[0].innerHTML = "n";
          bin[1].innerHTML = "u";
          bin[2].innerHTML = "l";
          bin[3].innerHTML = "l";
          button.style.display = "none";
          binToPt.style.display = "none";
          await sleep(200);
          for (var i = 0; i < 4; i++) {
               root[i].style.display = "none";
               rootarrows[i].style.display = "none";
          }
          await sleep(200);
          for (var i = 0; i < 16; i++) {
               leaves[i].style.display = "none";
               deadleaves[i].style.display = "none";
          }
          await sleep(200);
          ptToRam.style.display = "none";
          await sleep(200);
          ramToBtn.style.display = "none";
          working = false;
          cleared = true;
     }
}
async function updateDisplay(n) {
     if (!cleared) {
          button.style.display = "none";
          binToPt.style.display = "none";
          await sleep(200);
          for (var i = 0; i < 4; i++) {
               root[i].style.display = "none";
               rootarrows[i].style.display = "none";
          }
          await sleep(200);
          for (var i = 0; i < 16; i++) {
               leaves[i].style.display = "none";
               deadleaves[i].style.display = "none";
          }
          await sleep(200);
          ptToRam.style.display = "none";
          await sleep(200);
          ramToBtn.style.display = "none";
     }
     await sleep(200);
     binToPt.style.display = "inline";
     var rootI = num >> 2;
     var leafI = (rootI * 4) + (num & 3);
     await sleep(200);
     for (var i = 0; i < 4; i++) {
          if (i == rootI) {
               root[i].style.display = "inline";
               rootarrows[i].style.display = "inline";
          } else {
               root[i].style.display = "none";
               rootarrows[i].style.display = "none";
          }
     }
     await sleep(200);
     if (links[n] == null) {
          for (var i = 0; i < 16; i++) {
               if (i == leafI) {
                    deadleaves[i].style.display = "inline";
               } else {
                    deadleaves[i].style.display = "none";
               }
          }
     } else {
          for (var i = 0; i < 16; i++) {
               if (i == leafI) {
                    leaves[i].style.display = "inline";
               } else {
                    leaves[i].style.display = "none";
               }
          }
          await sleep(200);
          ptToRam.style.display = "inline";
          await sleep(200);
          ramToBtn.style.display = "inline";
          await sleep(200);
          button.style.display = "inline";
          button.href = links[n];
     }
     working = false;
     cleared = false;
}

var max = 1000;
function textClick() {
     max *= .7;
     if (max < 50) {
          gif = document.createElement("img");
          gif.classList.add("explode");
          gif.src = "./explosion.gif";
          document.getElementById("container").appendChild(gif);
          max = 1000;
          setTimeout(() => {
               gif.remove();
          }, 300);
     }
}
async function updateBin(n) {
     num = 15 - n;
     var k = 0;
     for (var i = 0; i < 4; i++) {
          k = i;
          for (var j = 0; j < 20; j++) {
               bin[k].innerHTML = Math.floor(Math.random() * 9);
               k++;
               if (k == 4) {k = i;}
               await sleep(10);
          }
          bit = (num >>> 0).toString(2).padStart(4, "0").charAt(i);
          bin[i].innerHTML = bit;
     }
}
function flickerOff() {
     titleText.style.color = "green";
     setTimeout(() => {flickerOn();}, Math.floor(Math.random() * max));
}
function flickerOn() {
     titleText.style.color = "#2fff00";
     setTimeout(() => {flickerOff();}, Math.floor(Math.random() * max));
}