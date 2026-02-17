/*
 * Welcome to this absolute beast of a javascript file!
 * It's a doozy, but has some cool stuff IMHO. Luckily I am the only person who will ever maintain this mess.
 * Prepare for janky DOM traversal beyond your most nauseating dreams.
 */

var audio = {};
var crt = true;
var f_spawn_x = 150;
var f_spawn_y = 100;

var FILES = [
  {
    id: 2,
    type: 'tf',
    name: 'Welcome.txt',
    content: '<h style="font-size:40px;">Matthew Anderson</h><br>Welcome to my portfolio!<br><h style="font-size:15px">A little desktop hand built in pure HTML, JS and CSS!<br><a href="https://github.com/mja129/mja129.dev" target="_blank">Check out the source here</a></h><br><br>Not much of a portfolio yet... WIP lol'
  },
  {
    id: 3,
    type: 'tf',
    name: 'Credits.txt',
    content: 'Lots of styling from <a href="https://jdan.github.io/98.css/" target="_blank">98.css</a><br><br><h style="font-size:15px;">\
    Soundcloud tracks are linked in their embeds lol<br><br>\
    Music provided by NoCopyrightSounds:<br><br>\
    Song: LAADS - Bad Girl<br><br>\
    Song: Nuphory & Chikaya - Make Me Feel<br>Free Download/Stream: <a href="http://ncs.io/makemefeel" target="_blank">http://ncs.io/makemefeel</a><br>Watch: <a href="http://ncs.lnk.to/makemefeelAT/youtube" target="_blank">http://ncs.lnk.to/makemefeelAT/youtube</a><br><br>\
    Song: KUČKA - Never Give Up On Loving You<br>Music provided by NoCopyrightSounds<br>Free Download/Stream: <a href="http://ncs.io/NGUOLY" target="_blank">http://ncs.io/NGUOLY</a><br>Watch: <a href="http://ncs.lnk.to/NGUOLYAT/youtube" target="_blank">http://ncs.lnk.to/NGUOLYAT/youtube</a><br><br>\
    </h>'
  },
  {
    id: 4,
    type: 'if',
    name: 'Me.jpg',
    caption: 'Look! It\'s me!',
    filename: 'me.jpg'
  },
  {
    type: 'exe',
    id: 1,
    name: 'Terminal.exe',
    filename: 'terminal.png'
  },
  {
    id: 5,
    type: 'f',
    name: 'FunStuff',
    files: [
      {
        id: 6,
        type: 'f',
        name: 'Music',
        files: [
          {
            id: 7,
            type: 'f',
            name: 'House',
            files: [
              {
                id: 12,
                type: 'afs',
                name: 'Find_My_Way_Home.mp3',
                ifurl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A459572580&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
                img_url: 'https://i1.sndcdn.com/artworks-000379593510-i5bail-t1080x1080.jpg'
              },
              {
                id: 9,
                type: 'af',
                name: 'Bad_Girl.mp3',
                audio_url: 'https://ncs.io/track/download/bb50d4b8-501b-4515-b495-294da2767cad?_gl=1*17cc72*_up*MQ..*_ga*MjI2MzU0MDQxLjE3NzEzNTkxNDM.*_ga_PFS54FR7NV*czE3NzEzNTkxNDIkbzEkZzAkdDE3NzEzNTkxNTgkajQ0JGwwJGgw',
                img_url: 'https://linkstorage.linkfire.com/medialinks/images/e1bc4ec5-fbd9-4f1c-b6aa-67c656cfd529/artwork-440x440.jpg'
              },
              {
                id: 8,
                type: 'af',
                name: 'Make_Me_Feel.mp3',
                audio_url: 'https://ncs.io/track/download/0182147b-ef4e-4ee2-8aa5-5d4c12d56d3c?_gl=1*1x0ktwp*_up*MQ..*_ga*MTQ3Njg4MDMzOS4xNzcwODYxODQ0*_ga_PFS54FR7NV*czE3NzA4NjE4NDMkbzEkZzAkdDE3NzA4NjE4NDMkajYwJGwwJGgw',
                img_url: 'https://linkstorage.linkfire.com/medialinks/images/7cab78f6-2a5e-4ec2-9253-c84917dd3d7f/artwork-440x440.jpg'
              },
              {
                id: 11,
                type: 'af',
                name: 'Never_Give_Up_On_Loving_You.mp3',
                audio_url: 'https://ncs.io/track/download/a6fc48cd-f33e-476f-b3f6-88ae77c9aa2f?_gl=1*1r8hj4x*_up*MQ..*_ga*MTI5MjEwMzMwNS4xNzcwOTE2MTY0*_ga_PFS54FR7NV*czE3NzA5MTYxNjMkbzEkZzAkdDE3NzA5MTY3MDEkajYwJGwwJGgw',
                img_url: 'https://linkstorage.linkfire.com/medialinks/images/6d26c85f-97b0-400c-b9b1-b875690eccbc/artwork-440x440.jpg'
              }
            ]
          },
        ]
      },
      {
        type: 'exe',
        id: 0,
        name: 'Soundboard.exe',
        filename: 'sbicon.png'
      },
    ]
  },
]

// grab DOM elements, initialize files
var container, desktop, dwindow, dwindow_bar, dwindow_close, crt_img, folder_container, template_windows
function init_window_manager() {
  container = document.getElementById("container");
  desktop = document.getElementById("desktop");
  crt_img = document.getElementById("crt-img");
  folder_container = document.getElementById("folder-container");
  template_windows = {}
  template_windows.tf = document.getElementById("tf-window");
  template_windows.if = document.getElementById("if-window");
  template_windows.f = document.getElementById("f-window");
  template_windows.af = document.getElementById("af-window");
  template_windows.afs = document.getElementById("afs-window");
  FILES.forEach((file) => add_file(file, folder_container))
  // open welcome
  file_click(2, 'tf')
}

// add ghost divs for file icon and window
function add_file(file, icon_container) {
  var type = file.type;
  var template_window;
  if (type == 'exe') {
    template_window = document.getElementById(`exe${file.id}-window`)
  } else {
    template_window = template_windows[type]
  }

  // create icon
  const div = document.createElement('div');
  div.classList.add('file');
  const img = document.createElement('img');
  img.classList.add('file-img');
  img.dataset.id = file.id;
  img.dataset.type = type;
  switch (type) {
    case 'tf':
      img.src = 'assets/text.png';
      break;
    case 'f':
      img.src = 'assets/folder.png';
      break;
    case 'exe':
    case 'if':
      img.src = `assets/${file.filename}`;
      break;
    case 'af':
    case 'afs':
      img.src = file.img_url;
      break;
    default:
      return;
  }
  const p = document.createElement('p');
  p.innerHTML = file.name
  p.style.fontSize = '13px';
  div.appendChild(img);
  div.appendChild(p);
  icon_container.appendChild(div);
  
  const window = template_window.cloneNode(true);
  window.firstElementChild.firstElementChild.innerHTML = file.name;
  // do stuff based on filetype :P
  if (type != 'exe') {
    window.id = `${type}${file.id}-window`;
    window.firstElementChild.id = `${type}${file.id}-window-bar`;
    window.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.id = `${type}${file.id}-close`;
  }
  switch (type) {
    case 'tf':
      window.firstElementChild.nextElementSibling.innerHTML = file.content;
      break;
    case 'if':
      window.firstElementChild.nextElementSibling.firstElementChild.src = `assets/${file.filename}`;
      window.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.innerHTML = file.caption;
      break;
    case 'f':
      var internal_container = window.firstElementChild.nextElementSibling.firstElementChild;
      file.files.forEach((subfile) => {add_file(subfile, internal_container)});
      break;
    case 'af':
      window.dataset.url = file.audio_url
      var body = window.firstElementChild.nextElementSibling;
      body.firstElementChild.src = file.img_url;
      body.firstElementChild.nextElementSibling.nextElementSibling.dataset.id = file.id;
      body.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.dataset.id = file.id;
      body.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.dataset.id = file.id;
      break;
    case 'afs':
      window.dataset.ifurl = file.ifurl
      break;
    default:
      break;
  }
  desktop.appendChild(window);
}

// nuke window from the close button
function delete_window(e, id=null) {
  var window = e.target.parentElement.parentElement.parentElement;
  // get rid of audio player if applicable
  if (id && audio.hasOwnProperty(id)) {
    var pid = window.dataset.player_id;
    var a = audio[id][pid];
    if (a['loop']) {
      clearInterval(a['loop']);
      a['player'].pause();
    }
    a['player'] = null;
    delete audio[id][pid];
  }
  window.remove();
}

// bring window to front on click
var maxZ = 1
function bring_to_front(e) {
  // make sure not to screw up clicks on otherwise
  //  clickable stuff, since otherwise this will
  //  move element in DOM and break those events
  if (!(
    e.target.classList.contains("title-bar") ||
    e.target.classList.contains("f-close") ||
    e.target.classList.contains("file-img")
  )) {
    var f_window = e.target;
    while (!f_window.classList.contains("d-window")) {
      f_window = f_window.parentElement;
    }
    f_window.style.zIndex = maxZ++
  }
}

// handle a new title bar click
function start_move_window_mouse(event) {
  // stop if click has any buttons besides left click
  if (event.buttons != 1) { return; }

  // grab outer window, stop if this click is on the close button
  var f_window = event.target.parentElement;
  if (!f_window.classList.contains("window")) { return; }

  f_window.style.zIndex = maxZ++

  // grab initial state
  var style = getComputedStyle(f_window);
  var x = parseFloat(style.left.slice(0, -2));
  var y = parseFloat(style.top.slice(0, -2));
  var prevmx = event.x;
  var prevmy = event.y;

  f_window.firstElementChild.classList.add("moving");

  // movement listener, move window with mouse
  var mmove, mup, xdiff, ydiff;
  addEventListener("mousemove", mmove = (e) => {
    xdiff = e.x - prevmx;
    ydiff = e.y - prevmy;
    x += xdiff;
    y += ydiff;
    f_window.style.left = `${x}px`;
    f_window.style.top = `${y}px`;
    bound_window(f_window);
    prevmx = e.x;
    prevmy = e.y;
  });

  // on mouseup, kill listeners
  addEventListener("mouseup", mup = () => {
    f_window.firstElementChild.classList.remove("moving");
    removeEventListener("mousemove", mmove);
    removeEventListener("mouseup", mup)
  });
}

// parallel arrays for tracking touches on mobile
var tracked_touches_w = [];
var touch_window_w = [];
var touchwx_w = [];
var touchwy_w = [];
var touchprevx_w = [];
var touchprevy_w = [];

var tracked_touches_s = [];
var touches_setfunc_s = [];

// on any touch event, remove volume sliders
// this is where I'd put my volume slider... IF I HAD ONE!!!!!!
var touch_device = false;
var nuke_volume_sliders;
addEventListener("touchstart", nuke_volume_sliders = () => {
  touch_device = true;
  [...document.querySelectorAll(".volume-control")].forEach((elem) => {
    elem.style.display = "none";
  });
  removeEventListener("touchstart", nuke_volume_sliders);
});

// when a new touch occurs and it's on a title bar...
function start_move_window_touch(event) {
  // go through touches on target and add any that aren't already tracked
  for (var i = 0; i < event.targetTouches.length; i++) {
    var touch = event.targetTouches.item(i);
    if (tracked_touches_w.includes(touch.identifier)) {
      continue;
    } else {
      tracked_touches_w.push(touch.identifier);
    }
    // grab outer window, add initial data for this touch/window to arrays
    var f_window = event.target.parentElement;
    if (!f_window.classList.contains("window")) {
      tracked_touches_w.pop();
      continue;
    }
    // preserve scroll amt
    var scroller = f_window.querySelector(".scroller");
    var scroll = scroller.scrollTop;
    // move window to front
    desktop.appendChild(f_window);
    scroller.scrollTop = scroll;
    touch_window_w.push(f_window);
    var style = getComputedStyle(f_window);

    // add touch data to the arrays of doom and despair
    touchwx_w.push(parseFloat(style.left.slice(0, -2)));
    touchwy_w.push(parseFloat(style.top.slice(0, -2)));

    touchprevx_w.push(touch.clientX);
    touchprevy_w.push(touch.clientY);

    f_window.firstElementChild.classList.add("moving");
  }
}

// any time an active touch is moved...
addEventListener("touchmove", tmove = (e) => {
  // for all the touches that have moved since the last event...
  for (var i = 0; i < e.changedTouches.length; i++) {
    var touch = e.changedTouches.item(i);
    var index;
    // skip if we're not tracking this touch (it didn't start on a title bar)
    if ((index = tracked_touches_w.indexOf(touch.identifier)) == -1) {
      continue;
    }

    // shift corresponding window according to this touch's movement
    var xdiff = touch.clientX - touchprevx_w[index];
    var ydiff = touch.clientY - touchprevy_w[index];
    touchwx_w[index] += xdiff;
    touchwy_w[index] += ydiff;
    touch_window_w[index].style.left = `${touchwx_w[index]}px`;
    touch_window_w[index].style.top = `${touchwy_w[index]}px`;
    bound_window(touch_window_w[index]);
    touchprevx_w[index] = touch.clientX;
    touchprevy_w[index] = touch.clientY;
  }
  // again, go through moved touched, but this time for progress bars
  for (var i = 0; i < e.changedTouches.length; i++) {
    var touch = e.changedTouches.item(i);
    var index;
    // skip if we're not tracking this touch (it didn't start on a progress bar)
    if ((index = tracked_touches_s.indexOf(touch.identifier)) == -1) {
      continue;
    }

    // call bar function on this touch
    touches_setfunc_s[index](touch);
  }
});

// when any touches end, check the list and remove any that ended
addEventListener("touchend", (e) => {
  var active = [];
  for (var i = 0; i < e.touches.length; i++) {
    active.push(e.touches.item(i).identifier);
  }
  for (var i = 0; i < tracked_touches_w.length; i++) {
    if (active.indexOf(tracked_touches_w[i]) == -1) {
      touch_window_w[i].firstElementChild.classList.remove("moving");
      tracked_touches_w.splice(i, 1);
      touch_window_w.splice(i, 1);
      touchwx_w.splice(i, 1);
      touchwy_w.splice(i, 1);
      touchprevx_w.splice(i, 1);
      touchprevy_w.splice(i, 1);
    }
  }
  for (var i = 0; i < tracked_touches_s.length; i++) {
    if (active.indexOf(tracked_touches_s[i]) == -1) {
      tracked_touches_s.splice(i, 1);
      touches_setfunc_s.splice(i, 1);
    }
  }
});

// on resize, make sure all open windows remain inbounds
addEventListener("resize", () => {
  var windows = document.querySelectorAll(".d-window");
  for (var i = 0; i < windows.length; i++) {
    if (windows[i].id != "taskbar" && windows[i].style.display != "none") {
      bound_window(windows[i]);
    }
  }
})

// snap window to within the container
function bound_window(f_window) {
  // kill if this is one of the reference windows
  if (f_window.style.position == "fixed") { return; }

  // grab container styles
  var c_style = getComputedStyle(container);
  var c_width = parseFloat(c_style.width.slice(0, -2));
  var c_height = parseFloat(c_style.height.slice(0, -2));

  // window styles
  var w_style = getComputedStyle(f_window);
  var w_height = parseFloat(w_style.height.slice(0, -2)) + 6;

  // styles of the reference window for this one
  var default_window = document.getElementById(f_window.id);
  default_window.style.display = "";
  var d_style = getComputedStyle(default_window);
  var d_width = parseFloat(d_style.width.slice(0, -2)) + 6;
  var d_height = parseFloat(d_style.height.slice(0, -2)) + 6;
  var d_body_width = getComputedStyle(default_window.lastElementChild).width;

  // right/bottom edges
  var w_bar_height = getComputedStyle(f_window.firstElementChild).height;
  var w_body = f_window.lastElementChild;
  if (f_window.offsetLeft >= c_width - d_width) {
    f_window.style.left = `${c_width - d_width}px`;
    w_body.style.width = d_body_width;
  }
  if (d_width > c_width) {
    w_body.style.width = `${c_width - 24}px`;
  }
  if (d_height > c_height) {
    w_body.style.height = `calc(${c_height - 26}px - ${w_bar_height})`;
    f_window.style.top = '0px';
  } else {
    w_body.style.height = `initial`;
    if (f_window.offsetTop > c_height - w_height) {
      f_window.style.top = `${c_height - w_height}px`;
    }
  }

  // top/left edges
  if (f_window.offsetTop < 0) {
    f_window.style.top = `0px`;
  }
  if (f_window.offsetLeft < 0) {
    f_window.style.left = `0px`;
  }
  default_window.style.display = "none";
}

// absolutely gnarly looking bit of js lol
// waits for all images to load before fully setting up window
function new_elem_setup(element) {
  var images = [...element.querySelectorAll("img")];
  // certified javascript moment right here
  var promises = images.map(im => new Promise(
    done => (im.onload = () => done())
  ));
  Promise.all(promises).then(() => {
    fully_loaded(element);
  });
}

// finish new window setup
function fully_loaded(element) {
  element.style.zIndex = maxZ++
  var isAudio = element.classList.contains("af-window");
  // setup audio if applicable
  if (isAudio) {
    var id = parseInt(element.id.split('-')[0].substring(2));
    var pid = 0;
    if (!audio.hasOwnProperty(id)) {
      audio[id] = {};
    } else {
      pid = Object.keys(audio[id]).length;
    }
    element.dataset.player_id = pid;
    audio[id][pid] = { 'state': 0, 'player': new Audio(element.dataset.url), 'loop': null };
    element.style.opacity = 1;
    element.style.position = "absolute";
    element.style.display = "";
    bound_window(element);
    var iter = 1;
    var i = setInterval(() => {
      if (iter % 12 == 0) {
        audio[id][pid] = { 'state': 0, 'player': new Audio(element.dataset.url), 'loop': null };
      }
      if (touch_device || audio[id][pid]['player'].networkState != 2) {
        element.lastElementChild.firstElementChild.nextElementSibling.style.display = "none";
        element.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.style.display = "";
        element.lastElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "";
        bound_window(element);
        clearInterval(i);
      }
      iter++;
    }, 250);
    audio[id][pid]['player'].volume = (element.lastElementChild.lastElementChild.lastElementChild.firstElementChild.value - 1) / 10;
  } else {
    element.style.opacity = 1;
    element.style.position = "absolute";
    element.style.display = "";
    if (element.classList.contains("afs-window")) {element.firstElementChild.nextElementSibling.firstElementChild.src = element.dataset.ifurl}
  }
  // pull window to front on click
  element.addEventListener("mousedown", (e) => { bring_to_front(e); });
  // move to spawn location and inc spawn
  element.style.top = `${f_spawn_y}px`;
  element.style.left = `${f_spawn_x}px`;
  f_spawn_y += 20;
  f_spawn_x += 20;
  if (f_spawn_x >= window.innerWidth * .9 - 350 || f_spawn_y >= window.innerWidth * .9 - 350) {
    f_spawn_x = Math.random() * 100 + 50;
    f_spawn_y = Math.random() * 100 + 50;
  }

  // add delete listener to close button
  // also, pass audio id to callback if needed
  var callback;
  if (isAudio) {
    callback = (e) => { delete_window(e, parseInt(element.id.split('-')[0].substring(2))) };
  } else {
    callback = (e) => { delete_window(e); };
  }
  element.firstElementChild.lastElementChild.firstElementChild.addEventListener("click", callback);
  element.firstElementChild.lastElementChild.firstElementChild.addEventListener("touchstart", callback);

  // add to desktop and check bounds
  desktop.appendChild(element);
  bound_window(element);
}

// when a file is clicked...
function file_click(id, prefix) {
  // copy the invisible reference window, pass it to setup func
  new_elem_setup(document.getElementById(`${prefix}${id}-window`).cloneNode(true));
}

// Dispatchers for whatever listeners could be piled together without breaking everything
document.onclick = (e) => {
  if (e.target.classList.contains('file-img')) {
    file_click(e.target.dataset.id, e.target.dataset.type)
  }
}
document.onmousedown = (e) => {
  if (e.target.classList.contains('progress-indicator')) {
    audio_scrub_mouse(e, e.target.dataset.id)
  }
  if (e.target.classList.contains('af-control')) {
    ac_down(e, e.target.dataset.id)
  }
  if (e.target.classList.contains('title-bar')) {
    start_move_window_mouse(e)
  }
}
document.ontouchstart = (e) => {
  if (e.target.classList.contains('progress-indicator')) {
    audio_scrub_touch(e, e.target.dataset.id)
  }
  if (e.target.classList.contains('title-bar')) {
    start_move_window_touch(e)
  }
}
document.oninput = (e) => {
  if (e.target.id == 'range23') {
    volume_change(e, e.target.dataset.id);
  }
}

// play/pause button clicked
function ac_down(e, id) {
  // grab player id & make button look nice
  var pid = e.target.parentElement.parentElement.parentElement.dataset.player_id;
  e.target.firstElementChild.style.transform = "translate(1px, 1px)";
  // toggle state
  var a = audio[id][pid];
  if (a['state']) {
    a['player'].pause();
    a['state'] = 0;
    e.target.parentElement.previousElementSibling.firstElementChild.style.width 
      = `${(a['player'].currentTime / a['player'].duration) * 100}%`;
  } else {
    a['player'].play();
    a['state'] = 1;
    // update progress bar every so often
    if (a['loop']) {
      clearInterval(a['loop'])
    }
    a['loop'] = setInterval(() => {
      if (a['state'] && a['player'].currentTime < a['player'].duration) {
        e.target.parentElement.previousElementSibling.firstElementChild.style.width
          = `${(a['player'].currentTime / a['player'].duration) * 100}%`;
      } else {
        if (a['state']) {
          a['state'] = 0
          e.target.parentElement.previousElementSibling.firstElementChild.style.width = '100%'
        }
        clearInterval(a['loop']);
        a['loop'] = null;
      }
    }, 250);
  }
}


// HORRIFYINGLY DESCRIPTIVE COMMENT INCOMING...

// handles moving progress bar
function audio_scrub_mouse(e, id) {
  if (touch_device) { return; }
  var bar = e.target;
  var bar_style = e.target.getBoundingClientRect();
  var pid = e.target.parentElement.parentElement.dataset.player_id;
  var move, up;
  function set_bar(e) {
    var pct = (e.pageX - 4 - bar_style.left) / (bar_style.width - 8);
    if (pct < 0) { pct = 0; }
    if (pct > 1) { pct = 1; }
    audio[id][pid]['player'].currentTime = pct * audio[id][pid]['player'].duration;
    bar.firstElementChild.style.width = `${pct * 100}%`;
  }
  set_bar(e);
  addEventListener("mousemove", move = (e) => {
    set_bar(e);
  });
  addEventListener("mouseup", up = () => {
    removeEventListener("mousemove", move);
    removeEventListener("mouseup", up);
  });
}
function audio_scrub_touch(e, id) {
  var bar = e.target;
  var bar_style = e.target.getBoundingClientRect();
  var pid = e.target.parentElement.parentElement.dataset.player_id;
  for (var i = 0; i < e.targetTouches.length; i++) {
    var touch = e.targetTouches.item(i);
    if (tracked_touches_s.includes(touch.identifier)) {
      continue;
    } else {
      tracked_touches_s.push(touch.identifier);
    }
    touches_setfunc_s.push((touch) => {
      var pct = (touch.clientX - 4 - bar_style.left) / (bar_style.width - 8);
      if (pct < 0) { pct = 0; }
      if (pct > 1) { pct = 1; }
      audio[id][pid]['player'].currentTime = pct * audio[id][pid]['player'].duration;
      bar.firstElementChild.style.width = `${pct * 100}%`;
    });
    touches_setfunc_s[i](touch);
  }
}

// handle input on volume slider
function volume_change(e, id) {
  var pid = e.target.parentElement.parentElement.parentElement.parentElement.dataset.player_id;
  audio[id][pid]['player'].volume = (e.target.value - 1) / 10;
}

// Make CRT toggle button look pretty
function crt_down() {
  crt_img.style.transform = "translate(1px, 1px)";
  if (crt) {
    container.classList.remove('crt');
    crt = false;
  } else {
    container.classList.add('crt');
    crt = true;
  }
}
addEventListener("mouseup", () => {
  crt_img.style.transform = "";
  var controls = [...document.querySelectorAll(".control-img")];
  controls.forEach(c => {
    c.style.transform = "";
  })
});

// FAAAAAHHHHHHHHH
function FAH() {
  var i = document.getElementById('FAAHHHHHHH')
  i.style.transition = '';
  i.style.opacity = .2;
  setTimeout(() => {
    i.style.transition = 'all 2s';
    i.style.opacity = 0;
  }, 5);
}

function calculate_num_lines(string) {
  var num_lines = 0
  for (var line of string.split('\n')) {
    num_lines++
    var chars = 0
    var this_word = 0
    var i = 0
    while (i < line.length) {
      chars++
      if (line[i] == ' ') {
        this_word = 0
      } else {
        this_word++
      }
      if (chars > 42) {
        if (this_word == 0) {
          do {i++} while (i < line.length && line[i] == ' ')
          if (i == line.length) {
            continue
          }
          chars = 0
        } else {
          if (this_word <= 42) {
            chars = this_word
          } else {
            chars = 0
          }
          i++
        }
        num_lines++
      } else {
        i++
      }
    }
  }
  return num_lines > 0 ? num_lines : 1
}

// cut first line from input
function trim_line(string) {
  var this_word_start = 0
  var char = 0
  while (char < string.length) {
    if (string[char] == ' ') {
      while (string[char] == ' ') {
        char++
      }
      this_word_start = char
    } else if (string[char] == '\n') {
      return string.substring(char + 1)
    } else {
      char++
    }
    if (char >= 42) {
      if (this_word_start == 0) {
        return string.substring(42);
      }
      return string.substring(this_word_start)
    }
  }
}

// TODO: support multiple '..'s in a row
function get_fptr(p) {
  var path = p.split('/')
  var fptr = structuredClone(FILES)
  if (path == '') {return fptr}
  found = true
  for (var i = 0; i < path.length; i++) {
    if ((i < path.length - 1 && path[i+1] == '..') || path[i] == '.' || path[i] == '..') {continue}
    var subdir = path[i]
    if (subdir != '') {
      fptr = fptr.find((file) => file.name == subdir)
      if (!fptr || fptr.type != 'f') {
        return false
      }
      fptr = fptr.files
    }
  }
  return fptr
}

function term_focus_in(event) {
  var ta = event.target
  if (ta.selectionStart < 2){
    ta.setSelectionRange(2, 2)
  }
}

// BEAST of a function that handles keypresses in terminals.
// I <3 switch case
const COMMANDS = ['help', 'echo', 'clear', 'cd', 'pwd', 'ls', 'open']
function term_input(event) {
  var key = event.key;
  focused_term = event.target
  switch (key) {
    case 'Enter':
      var input = focused_term.value.substring(2)
      var output = focused_term.nextElementSibling
      output.textContent += '> ' + input
      var cmd = input.trim().split(' ')[0]
      var rem = input.trim().split(' ').splice(1).join(' ')
      switch (cmd) {
        case 'help':
          output.textContent += '\n\
Here\'s the stuff you can do:\n\
echo <string> : echos!\n\
clear : clear terminal output\n\
cd <path/to/directory> : enter directory\n\
pwd : show current working directory\n\
ls [path/to/directory] : show directory contents\n\
open <path/to/file> : open a directory or file\n'
          break
        case 'echo':
          if (rem.trim() == '') {
            output.textContent += '\nUsage: echo <string>\n'
            break
          }
          output.textContent += '\n' + rem + '\n'
          break
        case 'clear':
          output.textContent = ''
          break
        case 'cd':
          if (rem.trim() == '') {
            output.textContent += '\nUsage: cd <path/to/directory>\n'
            break
          }
          var wd = focused_term.dataset.wd
          if (wd != '/') {wd += '/'}
          var p
          if (rem.trim() == '') {
            p = wd
          } else if (rem[0] == '/') {
            p = rem
          } else {
            p = wd + rem
          }
          var fptr = get_fptr(p)
          if (!fptr) {
            output.textContent += '\nDirectory not found, or not a directory: ' + rem + '\n'
            break
          }
          var path = p.split('/')
          var new_path = ''
          for (var i = 0; i < path.length; i++) {
            if (path[i] != '' && path[i+1] != '..' && path[i] != '..' && path[i] != '.') {
              new_path += '/' + path[i]
            }
          }
          if (new_path == '') {new_path = '/'}
          focused_term.dataset.wd = new_path
          output.textContent += '\n'
          break
        case 'pwd':
          output.textContent += '\n' + focused_term.dataset.wd + '\n'
          break
        case 'ls':
          var wd = focused_term.dataset.wd
          if (wd != '/') {wd += '/'}
          var p
          if (rem.trim() == '') {
            p = wd
          } else if (rem[0] == '/') {
            p = rem
          } else {
            p = wd + rem
          }
          var fptr = get_fptr(p)
          if (!fptr) {
            output.textContent += '\nDirectory not found, or not a directory: ' + p + '\n'
            break
          }
          for (var file of fptr) {
            output.textContent += '\n' + file.name
          }
          output.textContent += '\n'
          break
        case 'open':
          if (rem.trim() == '') {
            output.textContent += '\nUsage: open <path/to/file>\n'
            break
          }
          var wd = focused_term.dataset.wd
          if (wd != '/') {wd += '/'}
          var p
          if (rem.trim() == '') {
            p = wd
          } else if (rem[0] == '/') {
            p = rem
          } else {
            p = wd + rem
          }
          var path = p.split('/')
          var fptr = get_fptr(path.slice(0, -1).join('/'))
          if (!fptr) {
            output.textContent += '\nFile not found: ' + p + '\n'
            break
          }
          var file = fptr.find((file) => file.name == path.at(-1))
          if (!file) {
            output.textContent += '\nFile not found: ' + p + '\n'
            break
          }
          output.textContent += '\n'
          file_click(file.id, file.type)
          break
        default:
          if (input != '') {
            output.textContent += '\nCommand not found: ' + cmd + '\n'
          } else {
            output.textContent += '\n'
          }
          break
      }
      var output_lines = calculate_num_lines(output.textContent) - 1;
      while (output_lines > 13) {
        output.textContent = trim_line(output.textContent)
        output_lines--
      }
      output.style.height = `${output_lines * 25}px`
      focused_term.style.height = `${(1 - (output_lines * 25 / 350)) * 100}%`
      focused_term.style.top = `${output_lines * 25}px`
      focused_term.value = '>\xa0'
    case 'ArrowUp':
      event.preventDefault()
      focused_term.setSelectionRange(2, 2)
      break
    case 'Backspace':
    case 'ArrowLeft':
      if (focused_term.selectionStart <= 2) {
        event.preventDefault()
      }
      break
    case 'Tab':
      event.preventDefault()
      var input = focused_term.value.substring(2)
      var s = input.split(' ')
      if (s.length == 1) {
        var pref = s[0].toLowerCase()
        var c, brk
        for (var cmd of COMMANDS) {
          if (cmd.startsWith(pref)) {
            if (c) {brk = 1; break} else {c = cmd}
          }
        }
        if (brk) {break}
        if (c) {focused_term.value = '> ' + c + ' '}
      } else if (s.length >= 2) {
        var path = s.at(-1).split('/')
        var pref = path.at(-1).toLowerCase()
        var rem = (s.at(-1)[0] == '/' ? '/' : '') + path.slice(0, -1).filter(Boolean).join('/')
        var wd = focused_term.dataset.wd
        if (wd != '/') {wd += '/'}
        var p
        if (!rem || rem.trim() == '') {
          p = wd
        } else if (rem[0] == '/') {
          p = rem
        } else {
          p = wd + rem
        }
        fptr = get_fptr(p)
        if (!fptr) {break}
        var name, brk
        for (var file of fptr) {
          if (file.name.toLowerCase().startsWith(pref)) {
            if (name) {brk = 1; break} else {name = file.name}
          }
        }
        if (brk) {break}
        if (name) {
          focused_term.value = '> ' + input.substring(0, input.lastIndexOf(' ')) + ' ' + rem + (rem != '' && rem != '/' ? '/' : '') + name
        }
      }
      break
  }
}