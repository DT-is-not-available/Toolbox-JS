class GameLayer_Class {
	constructor() {
		this.customDrawFunc = function(){}
		this.doGlobal = true
	}
	game() {
		gameLayer = "game"
		startGame()
	}
	game_update() {
		
		//pause menu
		if (keyboard_onpress.Escape && !window.location.hash && gameLayer == "game") addMenu(64, 92, "pause")
		if (keyboard_onpress.Escape && window.location.hash && gameLayer == "game") addMenu(64, 92, "locked_pause")
		
		//mario
		Mario.game();
		
		//hit block
		hit_block.game();
		
		if (!Mario.freezeWorld){
			
			//level timer
			
			world_timer -= 1/240
			if (world_timer < 0) {
				world_timer = 0
				Mario.dead = true
			}
			
			//particles
			
			for (let i = 0; i < particles.length; i++) {
				particles[i].game()
				if ((Math.round(particles[i].life) == 0) || (false)) particles.splice(i, 1)
			}
			
			//enemies
			
			if (!enemies.length == 0) for (let i = 0; i < enemies.length; i++) {
				enemies[i].game();
				if (!enemies[i].dead && overlap(Mario.entity.hitbox, Mario.entity.x, Mario.entity.y, enemies[i].entity.hitbox, enemies[i].entity.x, enemies[i].entity.y)) {
					if ((Mario.entity.y < enemies[i].entity.y || Mario.entity.yv > Mario.entity.gravity)&& enemies[i].canStomp) {
						Mario.entity.yv = -20
						Mario.enemy_combo += 1
						if (Mario.enemy_combo < 8) {
							Mario.score += [100, 200, 400, 800, 1000, 2000, 4000, 8000][Mario.enemy_combo]
//Particle_class(xpos, ypos, xv, yv, imgX, imgY, imgW, imgH, gravity, lifetime, frames, speed)
							particles.push(new Particle_class(enemies[i].entity.x, enemies[i].entity.y-8, 0, -1, 0, [0, 8, 16, 24, 0, 8, 16, 24][Mario.enemy_combo], [11, 12, 12, 12, 15, 16, 16, 16][Mario.enemy_combo], 8, 0, 45))
						} else {
							particles.push(new Particle_class(enemies[i].entity.x, enemies[i].entity.y-8, 0, -1, 0, 32, 16, 7, 0, 45))
						}
						if (level.settings.enemy_high_jump) Mario.jumptimer = 90
						enemies[i].dead = true
						if (!enemies[i].deathAnimation) {
							enemies[i].flip = true
							enemies[i].entity.yv = -10
							enemies[i].entity.gravity = 0.5
						}
					} else {
						if (enemies[i].kills) Mario.damage()
					}
				}
				if (enemies[i].delete) {
					enemies.splice(i,1)
				}
			}
		
			tileanim_timer += 0.03
			
			//camera
			if (level.settings.camera == 0) {
				if (Mario.entity.xv > 0 && (Mario.entity.x-64) > camera_x)
					camera_x += Mario.entity.xv/32
				if ((Mario.entity.x-128) > camera_x)
					camera_x = Mario.entity.x-128
				if ((Mario.entity.y-128-48) > camera_y)
					camera_y = Mario.entity.y-128-48
				if ((Mario.entity.y-128+48) < camera_y)
					camera_y = Mario.entity.y-128+48
			} else if (level.settings.camera == 1) {
				if (Mario.entity.xv > 0 && (Mario.entity.x-64) > camera_x)
					camera_x += Mario.entity.xv/32
				if ((Mario.entity.x-128) > camera_x)
					camera_x = Mario.entity.x-128
				if ((Mario.entity.x-64) < camera_x)
					camera_x = Mario.entity.x-64
				if ((Mario.entity.y-128-48) > camera_y)
					camera_y = Mario.entity.y-128-48
				if ((Mario.entity.y-128+48) < camera_y)
					camera_y = Mario.entity.y-128+48
			} else if (level.settings.camera == 2) {
				if ((Mario.entity.x-136) > camera_x)
					camera_x = Mario.entity.x-136
				if ((Mario.entity.x-120) < camera_x)
					camera_x = Mario.entity.x-120
				if ((Mario.entity.y-128-8) > camera_y)
					camera_y = Mario.entity.y-128-8
				if ((Mario.entity.y-128+8) < camera_y)
					camera_y = Mario.entity.y-128+8
			}
			if (camera_y < 0)
				camera_y = 0
			if (camera_y > level.settings.height*16)
				camera_y = level.settings.height*16
			if (camera_x < 0)
				camera_x = 0
			if (camera_x > level.settings.width*16)
				camera_x = level.settings.width*16
		}		
	}
	game_draw() {
		
		drawTileSet(level.temptiles);
		
		//enemies
		if (!enemies.length == 0) for (let i = 0; i < enemies.length; i++) {
			enemies[i].draw();
			if (debug_mode) canvas.globalAlpha = 0.5
			if (debug_mode) enemies[i].entity.draw();
			if (debug_mode) canvas.globalAlpha = 1
		}
		
		//hit block
		
		hit_block.draw();
		
		//mario
		
		Mario.draw();
		if (debug_mode) canvas.globalAlpha = 0.5
		if (debug_mode) Mario.entity.draw();
		if (debug_mode) canvas.globalAlpha = 1
		
		//particles
		for (let i = 0; i < particles.length; i++) {
			particles[i].draw()
		}
		
		//HUD
		
		if (!debug_mode) {
			drawText(0, 8, "   MARIO          WORLD  TIME")
			drawText(0, 16, "   "+Mario.score.toString().padStart(6,'0').padEnd(8,' ')+" x"+Mario.coins.toString().padStart(2,'0')+"    1-1  "+Math.trunc(world_timer).toString().padStart(3,'0').padStart(5,' '))
			canvas.drawImage(img_text, [136, 136, 136, 136+8, 136+16, 136+8][mod(Math.round(tileanim_timer), 6)], 8, 8, 8, 88, 16, 8, 8)
		}
		
	}
	menu() {
		gameLayer = "menu"
		startGame()
	}
	menu_update() {
		tileanim_timer += 0.03
		if(window.location.hash) {
			if (menus.length == 0) menus = [[64, 136, "locked_main_menu"]]
			// hash found
		} else {
			if (menus.length == 0) menus = [[64, 136, "main_menu"]]
			// No hash found
		}
		camera_x += 0.1
		if (camera_x > level.settings.width*16+256) camera_x = -256
		camera_y = 0
		window.title_y += window.title_yv/50
		window.title_yv += -(Math.abs(window.title_y)/window.title_y)*0.01
	}
	menu_draw() {
	
		drawTileSet(level.tiles);
		//canvas.drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
		canvas.drawImage(img_title, 1, 91, 184, 88, 36, 28+Math.round(window.title_y), 184, 88);
		drawText(36, 28+89+Math.round(window.title_y), "JAVASCRIPT EDITION");
		
	}
	edit() {
		gameLayer = "edit"
		startGame()
	}
	edit_update() {
		//edit menu
		if (keyboard_onpress.Escape && !window.location.hash) addMenu(8, 8, "edit_menu", false)
		enemies = []
		this.cameraspeed = 0.5
		if (keyboard.Shift) this.cameraspeed += 1.5
		if (keyboard.Space) this.cameraspeed += 3
		if (keyboard.W) Mario.entity.y -= this.cameraspeed
		if (keyboard.S) Mario.entity.y += this.cameraspeed
		if (keyboard.A) {Mario.entity.x -= this.cameraspeed; Mario.mirror = true}
		if (keyboard.D) {Mario.entity.x += this.cameraspeed; Mario.mirror = false}
		if (!keyboard.W && !keyboard.S && !keyboard.A && !keyboard.D) {
			Mario.entity.y = Math.round(Mario.entity.y/8)*8
			Mario.entity.x = Math.round(Mario.entity.x/8)*8
		}
		Mario.entity.rx = Math.round(Mario.entity.x)
		Mario.entity.ry = Math.round(Mario.entity.y)
		camera_x = Mario.entity.x-128
		camera_y = Mario.entity.y-128
			if (camera_y < 0)
				camera_y = 0
			if (camera_y > level.settings.height*16)
				camera_y = level.settings.height*16
			if (camera_x < 0)
				camera_x = 0
			if (camera_x > level.settings.width*16)
				camera_x = level.settings.width*16
		Mario.frame = 0
		Mario.freezeWorld = false
		Mario.entity.xv = 0
		Mario.entity.yv = 0
		Mario.jumptimer = 0
		Mario.deathtimer = 0
		Mario.powerup = 0
		Mario.iframes = 0
		world_timer = level.settings.timer
		Mario.dead = false
		if (keyboard_onpress.Enter) {
			gameLayer = "game_test"
			level.temptiles = JSON.parse(JSON.stringify(level.tiles))
			Mario.iframes = 240
			loadEnemies();
		}
		tileanim_timer += 0.03
		
		//tile building
		if (buildMode == 0) {
			if (mouseButtons[0]) {
				level.tiles[Math.trunc((mouse[0]+camera_x)/16)+","+Math.trunc((mouse[1]+camera_y)/16)] = tileBrush
			}
			if (mouseButtons[2]) {
				delete(level.tiles[Math.trunc((mouse[0]+camera_x)/16)+","+Math.trunc((mouse[1]+camera_y)/16)])
			}
		}
	}
	edit_draw() {
		
		//grid
		canvas.drawImage(img_grid, mod(-Math.round(camera_x), 16)-16, mod(-Math.round(camera_y), 16)-16);
		
		//tiles		
		drawTileSet(level.tiles);
		
		//tilepreview
		if (buildMode == 0) {
			canvas.globalAlpha = 0.5
			canvas.drawImage(img_tileset, tile_defs[tileBrush].tileX*16, tile_defs[tileBrush].tileY*16, 16, 16, Math.trunc((mouse[0]+camera_x)/16)*16-camera_x, Math.trunc((mouse[1]+camera_y)/16)*16-camera_y, 16, 16);
			canvas.globalAlpha = 1
		}
		
		this.customDrawFunc = function(id){
			if (id == "edit_menu") {
				canvas.fillStyle = 'rgb(255, 255, 255)';
				canvas.fillRect(7+20*buildMode, 19, 18, 18)
				canvas.fillStyle = 'rgb(69, 69, 69)';
				canvas.fillRect(8+20*buildMode, 20, 16, 16)
				
				canvas.fillStyle = 'rgb(0, 0, 0)';
				canvas.globalAlpha = 0.5
				canvas.fillRect(8, 40, 240, 176)
				canvas.globalAlpha = 1
				if (buildMode == 0) for (let i = 1; i-1 < tile_defs.length; i++) {
					canvas.drawImage(
						img_tileset,
						tile_defs[i-1].tileX*16,
						tile_defs[i-1].tileY*16,
						16,
						16,
						8+mod(i-1,16)*16,
						40+Math.trunc(i/16)*16,
						16,
						16
					)
				}
				if (buildMode == 1) for (let i = 0; i < edit_menu.enemies.length; i++) {
					if (typeof(enemy_defs[edit_menu.enemies[i]]) != 'undefined' && typeof(enemy_defs[edit_menu.enemies[i]].animation) != 'undefined') {
						canvas.drawImage(
							img_sprites, 
							enemy_defs[edit_menu.enemies[i]].animation[0].frameX,
							enemy_defs[edit_menu.enemies[i]].animation[0].frameY,
							16,
							16,
							8+mod(i,16)*16,
							40+Math.trunc(i/16)*16,
							16,
							16
						)
					} else {
						canvas.drawImage(
							img_sprites, 
							0,
							0,
							16,
							16,
							8+mod(i,16)*16,
							40+Math.trunc(i/16)*16,
							16,
							16
						)
					}
				}
			}
		}
		
		//marioStart
		canvas.drawImage(img_markers, 0, 0, 16, 16, level.marioX-8-camera_x, level.marioY-15-camera_y, 16, 16)
		
		//enemies
		if (!level.enemies.length == 0) for (let i = 0; i < level.enemies.length; i++) {
			//drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
			if (!(typeof(enemy_defs[level.enemies[i][0]]) == 'undefined')) {
				if (!(typeof(enemy_defs[level.enemies[i][0]].animation) == 'undefined')) {
					canvas.drawImage(img_sprites, enemy_defs[level.enemies[i][0]].animation[0].frameX, enemy_defs[level.enemies[i][0]].animation[0].frameY, 16, 16, level.enemies[i][1]-8-camera_x, level.enemies[i][2]-15-camera_y, 16, 16)
				} else {
					canvas.drawImage(img_sprites, enemy_defs["inherit"].animation[0].frameX, enemy_defs["inherit"].animation[0].frameY, 16, 16, level.enemies[i][1]-8-camera_x, level.enemies[i][2]-15-camera_y, 16, 16)
				}
			} else {
				canvas.drawImage(img_error, level.enemies[i][1]-8-camera_x, level.enemies[i][2]-15-camera_y, 16, 16)
			}
		}
		
		//mario
		
		Mario.draw();
		
		//text
		
		drawTextShadow(0, 224, "X:"+Math.round(Mario.entity.x)+" Y:"+Math.round(Mario.entity.y))
		drawTextShadow(0, 232, "X:"+Math.trunc((mouse[0]+camera_x)/16)+" Y:"+Math.trunc((mouse[1]+camera_y)/16))
	}
	game_test() {
		gameLayer = "game_test"
		startGame()
	}
	game_test_update() {
		g_layer.game_update()
		if (keyboard_onpress.Enter || keyboard_onpress.Escape || Mario.deathtimer > 240) {
			gameLayer = "edit"
		}
	}
	game_test_draw() {
		g_layer.game_draw()
		canvas.globalAlpha = 0.5
		drawText(8, 26+(debug_mode*24), "TEST MODE: PRESS ENTER TO EDIT")
		canvas.globalAlpha = 1
	}
	global_update() {
		mouseButtons_onpress = [false, false, false]
		keyboard_onpress = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
		debug[0].innerHTML = "X: "+Math.round(Mario.entity.x*100)/100
		debug[1].innerHTML = "Y: "+Math.round(Mario.entity.y*100)/100
		debug[2].innerHTML = "XV: "+Math.round(Mario.entity.xv*100)/100
		debug[3].innerHTML = "YV: "+Math.round(Mario.entity.yv*100)/100
		debug[4].innerHTML = "JT: "+Math.round(Mario.jumptimer)
		debug[5].innerHTML = "F: "+Mario.entity.onfloor
		debug[6].innerHTML = "M: "+mouse
		tpstick += 1
	}
	global_update_pre() {
		if (!(menus.length == 0)) {
			handleMenu(menus[menus.length-1][2], menus[menus.length-1][0], menus[menus.length-1][1])
		}
	}
	global_draw_pre() {
		canvas.fillStyle = 'rgb(92, 148, 252)';
		canvas.fillRect(0, 0, 256, 240);
		this.customDrawFunc = function(id){}
	}
	global_draw() {
		if (!(menus.length == 0)) {
			for (let i = 1; i < menus.length; i++) {
				drawMenu(menus[i-1][0], menus[i-1][1], menus[i-1][2], false, this.customDrawFunc)
			}
			drawMenu(menus[menus.length-1][0], menus[menus.length-1][1], menus[menus.length-1][2], menus[menus.length-1][3], this.customDrawFunc)
		}
		if (!debug_mode) {
			canvas.globalAlpha = 0.5
			drawText(0, 0, currenttps.toString())
			drawText(0, 8, currentfps.toString())
			canvas.globalAlpha = 1
		} else {
			drawText(0, 0, ("TPS: "+currenttps.toString()).padEnd(16, ' ')+("FPS: "+currentfps.toString()).padEnd(16, ' '))
			drawText(0, 8, ("X: "+Math.round(Mario.entity.x*100)/100).padEnd(16, ' ')+("Y: "+Math.round(Mario.entity.y*100)/100).padEnd(16, ' '))
			drawText(0, 16, ("XV: "+Math.round(Mario.entity.xv*100)/100).padEnd(16, ' ')+("YV: "+Math.round(Mario.entity.yv*100)/100).padEnd(16, ' '))
			drawText(0, 24, ("EC: "+enemies.length).padEnd(16, ' ')+("PC: "+particles.length).padEnd(16, ' '))
			drawText(0, 32, ("MX: "+mouse[0]).padEnd(16, ' ')+("MY: "+mouse[1]).padEnd(16, ' '))
			drawText(0, 40, ("CX: "+Math.round(camera_x)).padEnd(16, ' ')+("CY: "+Math.round(camera_y)).padEnd(16, ' '))
		}
		fpstick += 1
	}
}

function startGame(menu_stack=[]) {
	hit_block = new Block_class(0, 0, 0, -999)
	world_timer = level.settings.timer
	tileBrush = 0;
	menuOption = 0;
	title_yv = 2;
	title_y = 0;
	lost_ms = 0;
	thisLoop = Date.now()
	lastLoop = Date.now()
	if(window.location.hash) {
		hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
		level = JSON.parse(atob(hash)); //Parses the hash as a .lvl2 file and loads the level
	}
	level.temptiles = JSON.parse(JSON.stringify(level.tiles))
	Mario = new Mario_Class(level.marioX,level.marioY)
	particles = []
	menus = menu_stack
	loadEnemies()
	camera_x = 0;
	camera_y = 0;
	tileanim_timer = 0;
	keyboard_onpress = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false} 
	if (!loopStarted) {
		g_layer = new GameLayer_Class
		gameLayer = "menu" //g_layer.menu();
		fpstick = 59
		currentfps = 60
		tpstick = 239
		currenttps = 240
		gameloop();
		renderloop();
		fpsloop();
		console.log("Game Starting")
		buildMode = 0
	}
	console.log("\""+gameLayer+"\" Layer Starting")
	loopStarted = true
}

function addMenu(x, y, id, cursor=true) {
	keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
	keyboard_onpress = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
	menus.push([x, y, id, cursor])
	menuOption = 0
}

function quitMenu() {
	menus.pop()
	menuOption = 0
}

function saveLevel(params) {
	quitMenu()
	download_file('level.lvl2', btoa(JSON.stringify(level)))
	addMenu(64, 92, "dialouge_save", false)
}
function exportLevel(params) {
	quitMenu()
	window.open('https://gdengine.github.io/Toolbox-JS/#'+btoa(JSON.stringify(level)))
	addMenu(64, 92, "dialouge_export", false)
}
function newLevel(params) {
	menus = []
	level = JSON.parse(atob(
	"eyJ0eXBlIjoiVjEiLCJtYXJpb1giOjMyLCJtYXJpb1kiOjIwOCwic2V0dGluZ3MiOnsiY2FtZXJhIjowLCJoZWlnaHQiOjAsIndpZHRoIjowLCJlbmVteV9oaWdoX2p1bXAiOmZhbHNlLCJ0aW1lciI6NDAwfSwidGlsZXMiOnsiMCwxMyI6MCwiMSwxMyI6MCwiMiwxMyI6MCwiMywxMyI6MCwiNCwxMyI6MCwiNSwxMyI6MCwiNiwxMyI6MCwiNywxMyI6MCwiOCwxMyI6MCwiOSwxMyI6MCwiMTAsMTMiOjAsIjExLDEzIjowLCIxMiwxMyI6MCwiMTMsMTMiOjAsIjE0LDEzIjowLCIxNSwxMyI6MCwiMCwxNCI6MCwiMSwxNCI6MCwiMiwxNCI6MCwiMywxNCI6MCwiNCwxNCI6MCwiNSwxNCI6MCwiNiwxNCI6MCwiNywxNCI6MCwiOCwxNCI6MCwiOSwxNCI6MCwiMTAsMTQiOjAsIjExLDE0IjowLCIxMiwxNCI6MCwiMTMsMTQiOjAsIjE0LDE0IjowLCIxNSwxNCI6MH0sImVuZW1pZXMiOltdfQ=="
	
	))
	g_layer.edit()
}
function openLevel(params) {
	quitMenu()
	document.getElementById('level_upload').click()
}

function selectTile(params) {
	if (buildMode == 0 && tile_defs[Math.trunc((mouse[0]-8)/16)+Math.trunc((mouse[1]-40)/16)*16]) {
		tileBrush = Math.trunc((mouse[0]-8)/16)+Math.trunc((mouse[1]-40)/16)*16
		quitMenu();
	}
}

function loadEnemies() {
	enemies = []
	if (!level.enemies.length == 0) for (let i = 0; i < level.enemies.length; i++) {
		if (typeof(enemy_defs[level.enemies[i][0]]) == 'undefined') {
			console.warn("This level may be corrupt, or it is being loaded in the wrong version of the game.")
		} else {
			enemies.push(new Baddie_Class(level.enemies[i][1], level.enemies[i][2], level.enemies[i][0]))
		}
	}
}

function gameloop() {
	window.setTimeout(gameloop, 1000/(240*timemod));
	lastLoop = thisLoop
	thisLoop = Date.now()
	lost_ms += (thisLoop-lastLoop)
	while (lost_ms > (1000/(240*timemod))) {
		if (lost_ms > 100) lost_ms = 0
		lost_ms -= 1000/(240*timemod)
		if (g_layer.doGlobal) g_layer.global_update_pre();
		if (menus.length == 0 || !menu_defs[menus[menus.length-1][2]].pauses) {
			if (g_layer[gameLayer] && gameLayer != "global") g_layer[gameLayer+"_update"]();
		}
		if (g_layer.doGlobal) g_layer.global_update();
	}
}

function fpsloop() {
	window.setTimeout(fpsloop, 1000);
	currentfps = fpstick
	fpstick = 0
	currenttps = tpstick
	tpstick = 0
}


function renderloop() {
	window.setTimeout(renderloop, 1000/fps);
	if (g_layer.doGlobal) g_layer.global_draw_pre();
	if (g_layer[gameLayer] && gameLayer != "global") g_layer[gameLayer+"_draw"]();
	if (g_layer.doGlobal) g_layer.global_draw();
}

function activateTile(x, y) {
//Particle_class(xpos, ypos, xv, yv, imgX, imgY, imgW, imgH, gravity, lifetime, frames, speed)
	if (tile_defs[level.temptiles[x+","+y]].interaction.hasCoin) {
		particles.push(new Particle_class((x+0.5)*16, y*16, 0, -7, 32, 8, 8, 14, 0.45, 30, 4, 3))
		Mario.coins += 1
		level.temptiles[x+","+y] = tile_defs[level.temptiles[x+","+y]].interaction.hitTile
	}
	hit_block = new Block_class(x, y)
}