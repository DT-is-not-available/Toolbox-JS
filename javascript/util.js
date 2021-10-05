Math.mod = function(val,maxval){
	return val-(Math.trunc(val/maxval)*maxval)
}

function resetkeys() {
	keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
	keyboard_Shift = false
}
keyboard_Shift = false

function onscreen(hitbox_1, x_p, y_p) {
	return overlap(hitbox_1, x_p, y_p, {X_pos: 256, X_neg: 0, Y_pos: 240, Y_neg: 0}, Math.round(camera_x), Math.round(camera_y))
}

function download_file(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function mod(x, y) {return x - y * Math.floor(x / y)}

function overlap(r1, x1, y1, r2, x2, y2) {
	if (r1 === false || r2 === false) return false
	left1 = x1-r1.X_neg
	right1 = x1+r1.X_pos
	top1 = y1-r1.Y_neg
	bottom1 = y1+r1.Y_pos
	left2 = x2-r2.X_neg
	right2 = x2+r2.X_pos
	top2 = y2-r2.Y_neg
	bottom2 = y2+r2.Y_pos
  return !(left2 >= right1 || 
           right2 <= left1 || 
           top2 >= bottom1 ||
           bottom2 <= top1);
}

function setScale(amount) {
	canvas.resetTransform();
	canvas.canvas.width  = 256*amount;
	canvas.canvas.height = 240*amount;
	canvas.scale(amount, amount);
	document.getElementById('canvas').style = "padding: 0; margin: auto; display: block; width: "+256*amount+"px; height: "+240*amount+"px; position: absolute; top: 0; bottom: 0; left: 0; right: 0;";
	canvas.mozImageSmoothingEnabled = false;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.msImageSmoothingEnabled = false;
	canvas.imageSmoothingEnabled = false;
	window.canvas_scale = amount
}

function setScaleAuto() {
	if (window.innerHeight >= 256*4) {
		setScale(4);
	}else if (window.innerHeight >= 256*3) {
		setScale(3);
	}else if (window.innerHeight >= 256*2) {
		setScale(2);
	}else{
		setScale(1);
	}
}

function setScaleFit() {
	setScale((window.innerHeight)/256);
}

function posToTile(coord) {return Math.trunc(coord/16)}
function tileToPos(coord) {return Math.trunc(coord)*16}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function readLevel(file) {
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    loadLevel(atob(event.target.result))
	g_layer.edit()
  });
  reader.readAsText(file);
}

function loadLevel(levelstring) {
	level = JSON.parse(levelstring);
	if (typeof(level.settings.oldparticles) === "undefined") level.settings.oldparticles = false
	if (typeof(level.settings.time) === "undefined") level.settings.timer = 400
}

//input

//keyboard

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 87) {
        //console.log('W was pressed');
		if (!keyboard.W) keyboard_onpress.W = true
		keyboard.W = true
    }
    else if(event.keyCode == 83) {
        //console.log('S was pressed');
		if (!keyboard.S) keyboard_onpress.S = true
		keyboard.S = true
    }
    else if(event.keyCode == 65) {
        //console.log('A was pressed');
		if (!keyboard.A) keyboard_onpress.A = true
		keyboard.A = true
    }
    else if(event.keyCode == 68) {
        //console.log('D was pressed');
		if (!keyboard.D) keyboard_onpress.D = true
		keyboard.D = true
    }
    else if(event.keyCode == 16) {
        //console.log('Shift was pressed');
		if (!keyboard.Shift) keyboard_onpress.Shift = true
		keyboard.Shift = true
		keyboard_Shift = true
    }
    else if(event.keyCode == 32) {
        //console.log('Space was pressed');
		if (!keyboard.Space) keyboard_onpress.Space = true
		keyboard.Space = true
    }
    else if(event.keyCode == 13) {
        //console.log('Enter was pressed');
		if (!keyboard.Enter) keyboard_onpress.Enter = true
		keyboard.Enter = true
    }
    else if(event.keyCode == 27) {
        //console.log('Escape was pressed');
		if (!keyboard.Escape) keyboard_onpress.Escape = true
		keyboard.Escape = true
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 87) {
        //console.log('W was released');
		keyboard.W = false
		keyboard_onpress.W = false
    }
    else if(event.keyCode == 83) {
        //console.log('S was released');
		keyboard.S = false
		keyboard_onpress.S = false
    }
    else if(event.keyCode == 65) {
        //console.log('A was released');
		keyboard.A = false
		keyboard_onpress.A = false
    }
    else if(event.keyCode == 68) {
        //console.log('D was released');
		keyboard.D = false
		keyboard_onpress.D = false
    }
    else if(event.keyCode == 16) {
        //console.log('Shift was released');
		keyboard.Shift = false
		keyboard_Shift = false
		keyboard_onpress.Shift = false
    }
    else if(event.keyCode == 32) {
        //console.log('Space was released');
		keyboard.Space = false
		keyboard_onpress.Space = false
    }
    else if(event.keyCode == 13) {
        //console.log('Enter was released');
		keyboard.Enter = false
		keyboard_onpress.Enter = false
    }
    else if(event.keyCode == 27) {
        //console.log('Escape was released');
		keyboard.Escape = false
		keyboard_onpress.Escape = false
    }
});

//mouse coordinates

canvas.addEventListener('mousemove', function(event) {
    window.mouseX = event.x
	window.mouseY = event.y
	mouse = [Math.round((window.mouseX-getOffset( document.getElementById('canvas') ).left)/window.canvas_scale), Math.round((window.mouseY-getOffset( document.getElementById('canvas') ).top)/window.canvas_scale)]
});

//mouse input

canvas.addEventListener('mousedown', function(event) {
	if (!mouseButtons[event.button]) mouseButtons_onpress[event.button] = true
	mouseButtons[event.button] = true
});

canvas.addEventListener('mouseup', function(event) {
	mouseButtons[event.button] = false
	mouseButtons_onpress[event.button] = false
});

canvas.addEventListener('contextmenu', event => event.preventDefault());