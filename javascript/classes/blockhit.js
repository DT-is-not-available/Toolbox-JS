class Block_class {
	constructor(xpos, ypos, timer=10, gravity=-1) {
		this.x = xpos
		this.y = ypos
		this.gravity = gravity
		this.timer = timer
	}
	game() {
		if (this.timer >= -10) {
			this.timer -= 0.8
		}
	}
	draw() {
		if (this.timer >= -10) {
			if (!(typeof(level.temptiles[this.x+","+this.y]) == 'undefined')) {
				if (debug_mode) canvas.globalAlpha = 0.5
				canvas.fillStyle = 'rgb(92, 148, 252)';
				canvas.fillRect(this.x*16-camera_x, this.y*16-camera_y, 16, 16);
				canvas.drawImage(img_tileset, tile_defs[level.temptiles[this.x+","+this.y]].tileX*16, tile_defs[level.temptiles[this.x+","+this.y]].tileY*16, 16, 16, Math.round(this.x*16-Math.round(camera_x)), Math.round(this.y*16+(10-Math.abs(this.timer))*this.gravity-Math.round(camera_y)), 16, 16);
				if (debug_mode) canvas.globalAlpha = 1
			}
		}
	}
}