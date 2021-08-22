const canvas = document.getElementById('canvas').getContext('2d');
const debug = document.getElementsByClassName('debug');
var fps = 60
var debug_mode = false
var timemod = 1;
keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false}
mouseButtons = [false, false, false]
mouseButtons_onpress = [false, false, false]
mouse = [0, 0]
loopStarted = false

setScaleAuto();

window.addEventListener('resize', setScaleAuto) 

var filesLoaded = 0;
var filesNeeded = 18;

var xhttp = new XMLHttpRequest();
// new file
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log("JSON Contents:");
		console.log(JSON.parse(this.responseText));
		tile_defs = JSON.parse(this.responseText);
		filesLoaded += 1
		if (filesLoaded >= filesNeeded) {
			startGame();
		}
	}
};
xhttp.open("GET", "./json/tiles.json", true);
xhttp.send();

var xhttp = new XMLHttpRequest();
// new file
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log("JSON Contents:");
		console.log(JSON.parse(this.responseText));
		edit_menu = JSON.parse(this.responseText);
		filesLoaded += 1
		if (filesLoaded >= filesNeeded) {
			startGame();
		}
	}
};
xhttp.open("GET", "./json/editmenu.json", true);
xhttp.send();

var xhttp = new XMLHttpRequest();
// new file
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log("JSON Contents:");
		console.log(JSON.parse(this.responseText));
		font_defs = JSON.parse(this.responseText);
		filesLoaded += 1
		if (filesLoaded >= filesNeeded) {
			startGame();
		}
	}
};
xhttp.open("GET", "./json/text.json", true);
xhttp.send();

var xhttp = new XMLHttpRequest();
// new file
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log("JSON Contents:");
		console.log(JSON.parse(this.responseText));
		enemy_defs = JSON.parse(this.responseText);
		filesLoaded += 1
		if (filesLoaded >= filesNeeded) {
			startGame();
		}
	}
};
xhttp.open("GET", "./json/enemies.json", true);
xhttp.send();

var xhttp = new XMLHttpRequest();
// new file
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log("JSON Contents:");
		console.log(JSON.parse(this.responseText));
		level = JSON.parse(this.responseText);
		filesLoaded += 1
		if (filesLoaded >= filesNeeded) {
			startGame();
		}
	}
};
xhttp.open("GET", "./json/leveltest.json", true);
xhttp.send();

var xhttp = new XMLHttpRequest();
// new file
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		console.log("JSON Contents:");
		console.log(JSON.parse(this.responseText));
		menu_defs = JSON.parse(this.responseText);
		filesLoaded += 1
		if (filesLoaded >= filesNeeded) {
			startGame();
		}
	}
};
xhttp.open("GET", "./json/menus.json", true);
xhttp.send();

img_tileset = new Image();
// new file
img_tileset.src = 'images/tileset.png';
img_tileset.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_particles = new Image();
// new file
img_particles.src = 'images/particles.png';
img_particles.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_error = new Image();
// new file
img_error.src = 'images/error.png';
img_error.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_flagpole = new Image();
// new file
img_flagpole.src = 'images/flag.png';
img_flagpole.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_markers = new Image();
// new file
img_markers.src = 'images/markerui.png';
img_markers.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_mario = new Image();
// new file
img_mario.src = 'images/mario.png';
img_mario.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_grid = new Image();
// new file
img_grid.src = 'images/grid.png';
img_grid.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_tileAnimation = new Image();
// new file
img_tileAnimation.src = 'images/tileAnimation.png';
img_tileAnimation.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_sprites = new Image();
// new file
img_sprites.src = 'images/sprites.png';
img_sprites.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_title = new Image();
// new file
img_title.src = 'images/title.png';
img_title.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_text = new Image();
// new file
img_text.src = 'images/text.png';
img_text.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

img_text_shadow = new Image();
// new file
img_text_shadow.src = 'images/text2.png';
img_text_shadow.onload = function() {
    filesLoaded += 1
	if (filesLoaded >= filesNeeded) {
		startGame();
	}
};

canvas.mozImageSmoothingEnabled = false;
canvas.webkitImageSmoothingEnabled = false;
canvas.msImageSmoothingEnabled = false;
canvas.imageSmoothingEnabled = false;

console.error('WARNING!!!');
console.error('This version of Super Mario Toolbox is very early in development.', 'It may not have everything yet, and there may be many bugs.');
console.error('If you find an error please report it on our discord server: https://discord.gg/m5YuTSrWWP');

//	canvas.fillStyle = 'green';
//	canvas.fillRect(10, 10, 150, 100);