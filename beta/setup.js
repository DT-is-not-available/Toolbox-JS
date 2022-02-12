const canvas_element = document.getElementById('canvas')
const canvas = canvas_element.getContext('2d');
const debug = document.getElementsByClassName('debug');
var fps = 60
var debug_mode = false
var timemod = 1;
keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false}
mouseButtons = [false, false, false]
mouseButtons_onpress = [false, false, false]
mouse = [0, 0]
loopStarted = false

online = {
	sort: 0,
	loaded: false,
	page: 1,
	level_1: {
		title: "...",
		author: "",
		description1: "",
		description2: "",
		description3: "",
		loaded: false
	},
	level_2: {
		title: "...",
		author: "",
		description1: "",
		description2: "",
		description3: "",
		loaded: false
	},
	level_3: {
		title: "...",
		author: "",
		description1: "",
		description2: "",
		description3: "",
		loaded: false
	}
}

function recolor(oldimg, color, alpha=1){
	canvas.canvas.width  = 1000;
	canvas.canvas.height = 1000;
	canvas.scale(1, 1);
	canvas.globalAlpha = alpha
	canvas.clearRect(0,0,canvas_element.width,canvas_element.height);
	canvas.fillStyle=color;
	canvas.rect(0,0,canvas_element.width,canvas_element.height);
	canvas.fill();
	canvas.globalCompositeOperation = "destination-atop";
	canvas.globalAlpha = 1
	canvas.drawImage(oldimg, 0, 0);
	canvas.globalCompositeOperation = "darken";
	canvas.drawImage(oldimg, 0, 0);
	let img=new Image();
	img.src=canvas_element.toDataURL();
	setScale(canvas_scale)
	return(img);
}

setScaleAuto();

window.addEventListener('resize', setScaleAuto) 

var filesLoaded = 0;
var filesNeeded = 18;

//music
const mus = {
	smb: {
		overworld: new Audio('music/smb/overworld.ogg')
	},
	title: new Audio('music/toolbox.ogg'),
	edit: new Audio('music/edit.ogg')
}

//sounds
const sfx = {
	smb: {
		"1up": new Audio('sounds/smb/1up.ogg'),
		bounce: new Audio('sounds/smb/bounce.ogg'),
		blockbreak: new Audio('sounds/smb/blockbreak.ogg'),
		bump: new Audio('sounds/smb/bump.ogg'),
		coin: new Audio('sounds/smb/coin.ogg'),
		damage: new Audio('sounds/smb/pipe.ogg'),
		fireball: new Audio('sounds/smb/fireball.ogg'),
		fireworks: new Audio('sounds/smb/fireworks.ogg'),
		flagpole: new Audio('sounds/smb/flagpole.ogg'),
		jump_small: new Audio('sounds/smb/jump_small.ogg'),
		jump_super: new Audio('sounds/smb/jump_super.ogg'),
		kick: new Audio('sounds/smb/kick.ogg'),
		levelend: new Audio('sounds/smb/levelend.ogg'),
		lowtime: new Audio('sounds/smb/lowtime.ogg'),
		mariodie: new Audio('sounds/smb/mariodie.ogg'),
		pause: new Audio('sounds/smb/pause.ogg'),
		pipe: new Audio('sounds/smb/pipe.ogg'),
		powerup: new Audio('sounds/smb/powerup.ogg'),
		powerup_appears: new Audio('sounds/smb/powerup_appears.ogg'),
		spin: new Audio('sounds/smb/spin.ogg'),
		stomp: new Audio('sounds/smb/stomp.ogg'),
		twirl: new Audio('sounds/smb/twirl.ogg'),
		vine: new Audio('sounds/smb/vine.ogg')
	}
}

var xhttp = new XMLHttpRequest();
// new file
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		
		
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
		//loadLevel(this.responseText)
		filesLoaded += 1
		if (filesLoaded >= filesNeeded) {
			startGame();
		}
	}
};
xhttp.open("GET", "./json/leveltest.json", true);
xhttp.send();

//select random template level
template_levels = [
	'eyJ0eXBlIjoiVjEiLCJtYXJpb1giOjI0LCJtYXJpb1kiOjE2LCJzZXR0aW5ncyI6eyJjYW1lcmEiOjEsImhlaWdodCI6MCwid2lkdGgiOjE2LCJlbmVteV9oaWdoX2p1bXAiOnRydWUsInRpbWVyIjo0MDAsIm9sZHBhcnRpY2xlcyI6ZmFsc2V9LCJ0aWxlcyI6eyI5LDgiOjEsIjEwLDgiOjEsIjExLDgiOjEsIjEyLDgiOjEsIjEzLDgiOjEsIjE0LDgiOjEsIjE1LDgiOjEsIjAsMTMiOjQsIjEsMTMiOjQsIjIsMTMiOjQsIjMsMTMiOjQsIjQsMTMiOjAsIjYsMTMiOjAsIjYsMTIiOjQsIjYsMTEiOjAsIjYsMTAiOjAsIjYsOSI6MCwiNiw4IjowLCIxMyw5Ijo0LCI3LDEzIjowLCI4LDEzIjowLCI5LDEzIjowLCIxMCwxMyI6MCwiMTEsMTMiOjAsIjEyLDEzIjowLCIxMywxMyI6MCwiMTQsMTMiOjAsIjE1LDEzIjowLCIxNiwxMyI6MCwiMTcsMTMiOjAsIjE4LDEzIjowLCIxOSwxMyI6MCwiMjAsMTMiOjAsIjIxLDEzIjowLCIyMiwxMyI6MCwiMjMsMTMiOjAsIjI0LDEzIjowLCIyNSwxMyI6MCwiMjYsMTMiOjAsIjI3LDEzIjowLCIyOCwxMyI6MCwiMjksMTMiOjAsIjMwLDEzIjowLCIzMSwxMyI6MCwiMCwxNCI6MCwiMSwxNCI6MCwiMiwxNCI6MCwiMywxNCI6MCwiNCwxNCI6MCwiNSwxNCI6MCwiNiwxNCI6MCwiNywxNCI6MCwiOCwxNCI6MCwiOSwxNCI6MCwiMTAsMTQiOjAsIjExLDE0IjowLCIxMiwxNCI6MCwiMTMsMTQiOjAsIjE0LDE0IjowLCIxNSwxNCI6MH0sImVuZW1pZXMiOltbImdvb21iYSIsNDgsNDhdLFsiZ29vbWJhIiw5Niw0OF0sWyJnb29tYmEiLDEyOCw0OF0sWyJnb29tYmEiLDE0NCw0OF0sWyJidWxsZXRfYmlsbCIsMTI4LDE0NF1dLCJ0ZW1wdGlsZXMiOnsiOSw4IjoxLCIxMCw4IjoxLCIxMSw4IjoxLCIxMiw4IjoxLCIxMyw4IjoxLCIxNCw4IjoxLCIxNSw4IjoxLCIwLDEzIjo0LCIxLDEzIjo0LCIyLDEzIjo0LCIzLDEzIjo0LCI0LDEzIjowLCI2LDEzIjowLCI2LDEyIjo0LCI2LDExIjowLCI2LDEwIjowLCI2LDkiOjAsIjYsOCI6MCwiMTMsOSI6NCwiNywxMyI6MCwiOCwxMyI6MCwiOSwxMyI6MCwiMTAsMTMiOjAsIjExLDEzIjowLCIxMiwxMyI6MCwiMTMsMTMiOjAsIjE0LDEzIjowLCIxNSwxMyI6MCwiMTYsMTMiOjAsIjE3LDEzIjowLCIxOCwxMyI6MCwiMTksMTMiOjAsIjIwLDEzIjowLCIyMSwxMyI6MCwiMjIsMTMiOjAsIjIzLDEzIjowLCIyNCwxMyI6MCwiMjUsMTMiOjAsIjI2LDEzIjowLCIyNywxMyI6MCwiMjgsMTMiOjAsIjI5LDEzIjowLCIzMCwxMyI6MCwiMzEsMTMiOjAsIjAsMTQiOjAsIjEsMTQiOjAsIjIsMTQiOjAsIjMsMTQiOjAsIjQsMTQiOjAsIjUsMTQiOjAsIjYsMTQiOjAsIjcsMTQiOjAsIjgsMTQiOjAsIjksMTQiOjAsIjEwLDE0IjowLCIxMSwxNCI6MCwiMTIsMTQiOjAsIjEzLDE0IjowLCIxNCwxNCI6MCwiMTUsMTQiOjB9fQ=='
]
loadLevel(atob(template_levels[Math.trunc(Math.random()*template_levels.length)]))

var xhttp = new XMLHttpRequest();
// new file
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		
		
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

img_ui = new Image();
// new file
img_ui.src = 'images/ui.png';
img_ui.onload = function() {
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
	img_sprites_select = recolor(img_sprites, 'rgba(0, 255, 0)')
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