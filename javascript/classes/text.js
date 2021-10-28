class Text_Obj_Class {
	constructor(xpos, ypos, p_text) {
		this.x = xpos
		this.y = ypos
		this.text = p_text
	}
	draw() {
		drawText(this.x, this.y, this.text, true)
	}
}

function drawText(xpos, ypos, p_text, world=false) {
	text_length = p_text.length
	for (let i = 0; i < text_length; i++) {
		//canvas.drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
		if (!world) canvas.drawImage(img_text, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, xpos+i*8, ypos, 8, 8)
		if (world) canvas.drawImage(img_text, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, -Math.round(camera_x)+xpos+i*8, -Math.round(camera_y)+ypos, 8, 8)
	}
}

function drawTextShadow(xpos, ypos, p_text, world=false) {
	text_length = p_text.length
	for (let i = 0; i < text_length; i++) {
		//canvas.drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
		if (!world) canvas.drawImage(img_text_shadow, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, xpos+1+i*8, ypos+1, 8, 8)
		if (world) canvas.drawImage(img_text_shadow, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, -Math.round(camera_x)+xpos+1+i*8, -Math.round(camera_y)+ypos+1, 8, 8)
		if (!world) canvas.drawImage(img_text, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, xpos+i*8, ypos, 8, 8)
		if (world) canvas.drawImage(img_text, font_defs[p_text.charAt(i)][0]*8, font_defs[p_text.charAt(i)][1]*8, 8, 8, -Math.round(camera_x)+xpos+i*8, -Math.round(camera_y)+ypos, 8, 8)
	}
}

function drawMenu(xpos, ypos, id, cursor=true, custom_draw=function(id){}) {
	if (menu_defs[id].type == "popup") {
		canvas.globalAlpha = 0.75
		canvas.fillStyle = 'rgb(0, 0, 0)';
		canvas.fillRect(xpos-menu_defs[id].padding, ypos-menu_defs[id].padding, menu_defs[id].width+menu_defs[id].padding*2, menu_defs[id].height+menu_defs[id].padding*2)
		canvas.globalAlpha = 1
	}
	if (menu_defs[id].type == "overlay" || menu_defs[id].type == "overlay_border") {
		canvas.globalAlpha = 0.75
		canvas.fillStyle = 'rgb(0, 0, 0)';
		canvas.fillRect(0, 0, 256, 240)
		canvas.globalAlpha = 1
		if (menu_defs[id].type == "overlay_border") {
			canvas.fillStyle = 'rgb(255, 255, 255)';
			canvas.fillRect(xpos-menu_defs[id].padding-1, ypos-menu_defs[id].padding-1, menu_defs[id].width+menu_defs[id].padding*2+2, menu_defs[id].height+menu_defs[id].padding*2+2)
		}
		canvas.fillStyle = 'rgb(0, 0, 0)';
		canvas.fillRect(xpos-menu_defs[id].padding, ypos-menu_defs[id].padding, menu_defs[id].width+menu_defs[id].padding*2, menu_defs[id].height+menu_defs[id].padding*2)
	}
	
	//custom draw function
	custom_draw(id)
	
	//click options
	if (menu_defs[id].click_options && menu_defs[id].click_options.length > 0) for (let i = 0; i < menu_defs[id].click_options.length; i++) {
		if (menu_defs[id].click_options[i][0] == "button" && !menu_defs[id].click_options[i][1][3]) {
			canvas.fillStyle = 'rgb(255, 255, 255)';
			canvas.fillRect(
				xpos+menu_defs[id].click_options[i][2], 
				ypos+menu_defs[id].click_options[i][3], 
				menu_defs[id].click_options[i][1][1], 
				menu_defs[id].click_options[i][1][2]
			)
			canvas.fillStyle = 'rgb(0, 0, 0)';
			if (overlap({X_neg: 0, X_pos: 0, Y_neg: 0, Y_pos: 0}, mouse[0], mouse[1], {X_neg: 0, X_pos: menu_defs[id].click_options[i][1][1], Y_neg: 0, Y_pos: menu_defs[id].click_options[i][1][2]}, xpos+menu_defs[id].click_options[i][2], ypos+menu_defs[id].click_options[i][3])) canvas.fillStyle = 'rgb(69, 69, 69)';
			canvas.fillRect(
				xpos+menu_defs[id].click_options[i][2]+1, 
				ypos+menu_defs[id].click_options[i][3]+1, 
				menu_defs[id].click_options[i][1][1]-2, 
				menu_defs[id].click_options[i][1][2]-2
			)
			drawText(xpos+menu_defs[id].click_options[i][2]+menu_defs[id].click_options[i][1][1]/2-menu_defs[id].click_options[i][1][0].length*4, ypos+menu_defs[id].click_options[i][3]+menu_defs[id].click_options[i][1][2]/2-4, menu_defs[id].click_options[i][1][0])
		}
	}
	
	//custom text and images
	
	if (menu_defs[id].img && menu_defs[id].img.length > 0) for (let i = 0; i < menu_defs[id].img.length; i++) {
		canvas.drawImage(
			window[menu_defs[id].img[i][0]],	 
			menu_defs[id].img[i][1],			//img x
			menu_defs[id].img[i][2],			//img y
			menu_defs[id].img[i][3],			//width
			menu_defs[id].img[i][4],			//height
			xpos+menu_defs[id].img[i][5],		//ui x
			ypos+menu_defs[id].img[i][6],		//ui y
			menu_defs[id].img[i][3],			//width
			menu_defs[id].img[i][4]				//height
		)
	}
	
	if (!(menu_defs[id].text.length == 0)) for (let i = 0; i < menu_defs[id].text.length; i++) {
		canvas.globalAlpha = menu_defs[id].text[i][3]
		if (JSON.stringify(menu_defs[id].text[i][0]).substring(0,1) == "[") {
			if (menu_defs[id].text[i][0].length == 1) {
				menuvar_temp = (window[menu_defs[id].text[i][0][0]].toString())
			}
			if (menu_defs[id].text[i][0].length == 2) {
				menuvar_temp = (window[menu_defs[id].text[i][0][0]][menu_defs[id].text[i][0][1]].toString())
			}
			if (menu_defs[id].text[i][0].length == 3) {
				menuvar_temp = (window[menu_defs[id].text[i][0][0]][menu_defs[id].text[i][0][1]][menu_defs[id].text[i][0][2]].toString())
			}
			if (menu_defs[id].text[i][0].length == 4) {
				menuvar_temp = (window[menu_defs[id].text[i][0][0]][menu_defs[id].text[i][0][1]][menu_defs[id].text[i][0][2]][menu_defs[id].text[i][0][3]].toString())
			}
			if (menu_defs[id].text[i][0].length == 5) {
				menuvar_temp = (window[menu_defs[id].text[i][0][0]][menu_defs[id].text[i][0][1]][menu_defs[id].text[i][0][2]][menu_defs[id].text[i][0][3]][menu_defs[id].text[i][0][4]].toString())
			}
			drawText(xpos+menu_defs[id].text[i][1], ypos+menu_defs[id].text[i][2], (menuvar_temp+" ").toUpperCase())
		} else {
			drawText(xpos+menu_defs[id].text[i][1], ypos+menu_defs[id].text[i][2], menu_defs[id].text[i][0])
		}
		canvas.globalAlpha = 1
	}
	
	if (!(menu_defs[id].text_shadowed.length == 0)) for (let i = 0; i < menu_defs[id].text_shadowed.length; i++) {
		drawTextShadow(xpos+menu_defs[id].text_shadowed[i][1], ypos+menu_defs[id].text_shadowed[i][2], menu_defs[id].text_shadowed[i][0])
	}
	
	if (menu_defs[id].variable && menu_defs[id].variable.length > 0) for (let i = 0; i < menu_defs[id].variable.length; i++) {
		if (menu_defs[id].variable[i][0].length == 1) {
			menuvar_temp = (window[menu_defs[id].variable[i][0][0]].toString().toUpperCase())
		}
		if (menu_defs[id].variable[i][0].length == 2) {
			menuvar_temp = (window[menu_defs[id].variable[i][0][0]][menu_defs[id].variable[i][0][1]].toString().toUpperCase())
		}
		if (menu_defs[id].variable[i][0].length == 3) {
			menuvar_temp = (window[menu_defs[id].variable[i][0][0]][menu_defs[id].variable[i][0][1]][menu_defs[id].variable[i][0][2]].toString().toUpperCase())
		}
		if (menu_defs[id].variable[i][0].length == 4) {
			menuvar_temp = (window[menu_defs[id].variable[i][0][0]][menu_defs[id].variable[i][0][1]][menu_defs[id].variable[i][0][2]][menu_defs[id].variable[i][0][3]].toString().toUpperCase())
		}
		if (menu_defs[id].variable[i][0].length == 5) {
			menuvar_temp = (window[menu_defs[id].variable[i][0][0]][menu_defs[id].variable[i][0][1]][menu_defs[id].variable[i][0][2]][menu_defs[id].variable[i][0][3]][menu_defs[id].variable[i][0][4]].toString().toUpperCase())
		}
		if (menu_defs[id].variable[i][3]) menuvar_temp = menu_defs[id].variable[i][4][menuvar_temp]
		drawText(xpos+menu_defs[id].variable[i][1], ypos+menu_defs[id].variable[i][2], (menuvar_temp+" ").toUpperCase())
	}
	
	if (cursor) canvas.drawImage(img_text, 120, 8, 8, 8, xpos+menu_defs[id].options[menuOption][0], ypos+menu_defs[id].options[menuOption][1], 8, 8)
	
}

function handleMenu(id, xpos=0, ypos=0) {
	//keyMenu
	if (keyboard.S || (keyboard.D && !(menu_defs[id].right_action))) menuOption += 1
	if (keyboard.W || (keyboard.A && !(menu_defs[id].left_action))) menuOption -= 1
	if (keyboard.Space || keyboard.Enter) {
		handleMenuAction(menu_defs[id].options[menuOption], 2)
	}
	if (keyboard.D && menu_defs[id].right_action && menu_defs[id].right_action[menuOption]) {
		handleMenuAction(menu_defs[id].right_action[menuOption], 0)
	}
	if (keyboard.A && menu_defs[id].left_action && menu_defs[id].left_action[menuOption]) {
		handleMenuAction(menu_defs[id].left_action[menuOption], 0)
	}
	if (menuOption > menu_defs[id].options.length-1) menuOption = menu_defs[id].options.length-1
	if (menuOption < 0) menuOption = 0
	if (keyboard.Escape && menu_defs[id].esc_close) quitMenu()
	keyboard = {W: false, S: false, A: false, D: false, Space: false, Shift: false, Enter: false, Escape: false}
	if (menu_defs[id].esc_close) keyboard_onpress.Escape = false
	//clickMenu
	if (menu_defs[id].click_options && menu_defs[id].click_options.length > 0) {
		for (let i = 0; i < menu_defs[id].click_options.length; i++) {
			if (menu_defs[id].click_options[i][0] == "button" && mouseButtons[0] && overlap({X_neg: 0, X_pos: 0, Y_neg: 0, Y_pos: 0}, mouse[0], mouse[1], {X_neg: 0, X_pos: menu_defs[id].click_options[i][1][1], Y_neg: 0, Y_pos: menu_defs[id].click_options[i][1][2]}, xpos+menu_defs[id].click_options[i][2], ypos+menu_defs[id].click_options[i][3])) {
				handleMenuAction(menu_defs[id].click_options[i], 4)
			}
			if (menu_defs[id].click_options[i][0] == "checkbox" && mouseButtons[0] && overlap({X_neg: 0, X_pos: 0, Y_neg: 0, Y_pos: 0}, mouse[0], mouse[1], {X_neg: 0, X_pos: 9, Y_neg: 0, Y_pos: 9}, xpos+menu_defs[id].click_options[i][2], ypos+menu_defs[id].click_options[i][3])) {
				handleMenuAction(menu_defs[id].click_options[i], 4)
			}
		}
		if (mouseButtons[0] && !overlap({X_neg: 0, X_pos: 0, Y_neg: 0, Y_pos: 0}, mouse[0], mouse[1], {X_neg: menu_defs[id].padding, X_pos: menu_defs[id].width+menu_defs[id].padding, Y_neg: menu_defs[id].padding, Y_pos: menu_defs[id].height+menu_defs[id].padding}, xpos, ypos) && menu_defs[id].esc_close) {
			quitMenu()
		}
	}
	
	mouseButtons = [false, false, false]
	mouseButtons_onpress = [false, false, false]
}

function handleMenuAction(action, offset=2){
	if (action[offset] == "layer") {
		g_layer[action[offset+1]]()
	}
	if (action[offset] == "url") {
		window.open(action[offset+1])
	}
	if (action[offset] == "menu") {
		addMenu(action[offset+1], action[offset+2], action[offset+3], action[offset+4])
	}
	if (action[offset] == "close") {
		quitMenu()
	}
	if (action[offset] == "variable") {
		if (action[offset+1].length == 1) window[action[offset+1][0]] = action[offset+2]
		if (action[offset+1].length == 2) window[action[offset+1][0]][action[offset+1][1]] = action[offset+2]
		if (action[offset+1].length == 3) window[action[offset+1][0]][action[offset+1][1]][action[offset+1][2]] = action[offset+2]
		if (action[offset+1].length == 4) window[action[offset+1][0]][action[offset+1][1]][action[offset+1][2]][action[offset+1][3]] = action[offset+2]
		if (action[offset+1].length == 5) window[action[offset+1][0]][action[offset+1][1]][action[offset+1][2]][action[offset+1][3]][action[offset+1][4]] = action[offset+2]
	}
	if (action[offset] == "quick_layer") {
		gameLayer = action[offset+1]
		menuOption = 0
		menus = []
	}
	if (action[offset] == "function") {
		window[action[offset+1]](action[offset+2]);
	}
}

function settings_add(params) {
	if (keyboard_Shift) {
		if (level.settings[params[0]]+9 < params[1] || !params[1]) 
			level.settings[params[0]] += 10
	} else {
		if (level.settings[params[0]] < params[1] || !params[1]) 
			level.settings[params[0]] += 1
	}
}
function settings_sub(params) {
	if (keyboard_Shift) {
		if (level.settings[params[0]]-9 > params[1]) 
			level.settings[params[0]] -= 10
		
	} else {
		if (level.settings[params[0]] > params[1]) 
			level.settings[params[0]] -= 1
	}
}
function settings_toggle(params) {
	level.settings[params[0]] = (!level.settings[params[0]])
}
function online_toggle(params) {
	if (online.loaded) {
		online[params[0]] = 1-online[params[0]]
		getServer("sort="+online.sort+"&page="+online.page)
	}
}
function online_add(params) {
	if (online.loaded && online[params[0]] < params[1] || !params[1]) {
		online[params[0]] += 1
		getServer("sort="+online.sort+"&page="+online.page)
	}
}
function online_sub(params) {
	if (online.loaded && online[params[0]] > params[1]) {
		online[params[0]] -= 1
		getServer("sort="+online.sort+"&page="+online.page)
	}
}
function online_level(params) {
	if (online.loaded && online["level_"+(params[0]+1)].level) {
		quitMenu()
		gameLayer = "menu"
		loadPack(atob(online["level_"+(params[0]+1)].level))
		camera_x = 0
	}
}