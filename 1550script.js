var panelToBin,binToPt,ptToRam,ramToBtn,titleText,button,wires=[],root=[],rootarrows=[],leaves=[],deadleaves=[],boxes=[],selected=null,bin=[],working=!1,cleared=!0;const links=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"https://drive.google.com/file/d/10Gu7gF-oSbYKDGal9gHK5GTl7BRLdpyn/view?usp=sharing"];function init(){panelToBin=document.getElementById("paneltobin"),binToPt=document.getElementById("bintopt"),ptToRam=document.getElementById("pttoram"),ramToBtn=document.getElementById("ramtobtn"),button=document.getElementById("btn"),titleText=document.getElementById("recslides");for(var e=1;e<=16;e++)wires[e-1]=document.getElementById("op"+e+"wire"),boxes[e-1]=document.getElementById("op"+e+"box"),leaves[e-1]=document.getElementById("leaf"+Math.floor((e-1)/4)+(e-1)%4),deadleaves[e-1]=document.getElementById("leaf"+Math.floor((e-1)/4)+(e-1)%4+"dead");for(e=0;e<4;e++)root[e]=document.getElementById("root"+e),rootarrows[e]=document.getElementById("rootarr"+e),bin[e]=document.getElementById("bin"+e);flickerOff()}const sleep=e=>new Promise((l=>setTimeout(l,e)));async function boxclick(e){if(!working)if(working=!0,null==selected||selected!=e)boxes[e].classList.add("selected"),wires[e].style.display="inline",null!=selected?(boxes[selected].classList.remove("selected"),wires[selected].style.display="none"):panelToBin.style.display="inline",updateBin(e),null==selected?await sleep(1e3):await sleep(200),selected=e,updateDisplay(e);else{boxes[e].classList.remove("selected"),wires[e].style.display="none",panelToBin.style.display="none",selected=null,bin[0].innerHTML="n",bin[1].innerHTML="u",bin[2].innerHTML="l",bin[3].innerHTML="l",button.style.display="none",binToPt.style.display="none",await sleep(200);for(var l=0;l<4;l++)root[l].style.display="none",rootarrows[l].style.display="none";await sleep(200);for(l=0;l<16;l++)leaves[l].style.display="none",deadleaves[l].style.display="none";await sleep(200),ptToRam.style.display="none",await sleep(200),ramToBtn.style.display="none",working=!1,cleared=!0}}async function updateDisplay(e){if(!cleared){button.style.display="none",binToPt.style.display="none",await sleep(200);for(var l=0;l<4;l++)root[l].style.display="none",rootarrows[l].style.display="none";await sleep(200);for(l=0;l<16;l++)leaves[l].style.display="none",deadleaves[l].style.display="none";await sleep(200),ptToRam.style.display="none",await sleep(200),ramToBtn.style.display="none"}await sleep(200),binToPt.style.display="inline";var n=num>>2,t=4*n+(3&num);await sleep(200);for(l=0;l<4;l++)l==n?(root[l].style.display="inline",rootarrows[l].style.display="inline"):(root[l].style.display="none",rootarrows[l].style.display="none");if(await sleep(200),null==links[e])for(l=0;l<16;l++)deadleaves[l].style.display=l==t?"inline":"none";else{for(l=0;l<16;l++)leaves[l].style.display=l==t?"inline":"none";await sleep(200),ptToRam.style.display="inline",await sleep(200),ramToBtn.style.display="inline",await sleep(200),button.style.display="inline",button.href=links[e]}working=!1,cleared=!1}var max=1e3;function textClick(){(max*=.7)<50&&(gif=document.createElement("img"),gif.classList.add("explode"),gif.src="./explosion.gif",document.getElementById("container").appendChild(gif),max=1e3,setTimeout((()=>{gif.remove()}),300))}async function updateBin(e){num=15-e;for(var l=0,n=0;n<4;n++){l=n;for(var t=0;t<20;t++)bin[l].innerHTML=Math.floor(9*Math.random()),4==++l&&(l=n),await sleep(10);bit=(num>>>0).toString(2).padStart(4,"0").charAt(n),bin[n].innerHTML=bit}}function flickerOff(){titleText.style.color="green",setTimeout((()=>{flickerOn()}),Math.floor(Math.random()*max))}function flickerOn(){titleText.style.color="#2fff00",setTimeout((()=>{flickerOff()}),Math.floor(Math.random()*max))}