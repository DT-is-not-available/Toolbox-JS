class Generic_entity_class {
	constructor(xpos, ypos, hitbox, origin_entity) {
		this.x = xpos
		this.y = ypos
		this.rx = xpos
		this.ry = ypos
		this.xv = 0
		this.yv = 0
		this.hitbox = hitbox
		this.onfloor = false
		this.onceil = false
		this.onleft = false
		this.onright = false
		this.gravity = 0.5
		this.up_gravity = 0
		this.tilecollision = true
		this.tilecollisiontype = "entity"
		this.origin_entity = origin_entity
		this.collisionfaces = {
			horizontal: 2,
			vertical: 2
		}
	}
	game() {
		if (this.yv > 28) {
			this.yv = 28
		}
		this.onfloor = false
		this.onceil = false
		this.onleft = false
		this.onright = false
		this.y += this.yv/20
		this.x += this.xv/20
		/* if (this.tilecollision && this.tilecollisiontype == "mario_small") {
			if ((this.yv >= 0 && typeof(level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)]].collision.floor && level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)] === level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y+4)/16)]) || (this.yv >= 0 && typeof(level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)]].collision.floor && level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)] == level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y+4)/16)])) {
				this.yv = 0
				this.y = Math.round((this.y-8)/16)*16
				this.onfloor = true
			}
			if (!this.onfloor && this.yv < 0 && typeof(level.temptiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24)/16)]].collision.ceiling) {
				this.yv = 1
				if (!(tile_defs[level.temptiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24)/16)]].interaction === false) && tile_defs[level.temptiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24)/16)]].interaction.ceiling === true)
					activateTile(Math.round((this.x-8)/16),Math.round((this.y-24)/16))
				this.y = Math.round((this.y+8)/16)*16-2
				this.onceil = true
			}
			if ((this.xv < 0 && typeof(level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-22)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-22)/16)]].collision.right) || (this.xv < 0 && typeof(level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-10)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-10)/16)]].collision.right)) {
				this.x = Math.round((this.x-14)/16+1)*16+6
				this.xv = 0
				this.onright = true
			}
			if ((this.xv > 0 && typeof(level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-22)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-22)/16)]].collision.left) || (this.xv > 0 && typeof(level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-10)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-10)/16)]].collision.left)) {
				this.x = Math.round((this.x-14)/16)*16+10
				this.xv = 0
				this.onleft = true
			}
			if (this.yv < 0 && !this.onceil && !this.onfloor && (typeof(level.temptiles[Math.round((this.x-13)/16)+","+Math.round((this.y-16)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-13)/16)+","+Math.round((this.y-16)/16)]].collision.ceiling)) {
				this.x += 1
			}
			if (this.yv < 0 && !this.onceil && !this.onfloor && (typeof(level.temptiles[Math.round((this.x-3)/16)+","+Math.round((this.y-16)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-3)/16)+","+Math.round((this.y-16)/16)]].collision.ceiling)) {
				this.x -= 1
			}
		}
		if (this.tilecollision && this.tilecollisiontype == "mario_big") {
			if ((this.yv >= 0 && typeof(level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)]].collision.floor && level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)] === level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y+4)/16)]) || (this.yv >= 0 && typeof(level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)]].collision.floor && level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)] == level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y+4)/16)])) {
				this.yv = 0
				this.y = Math.round((this.y-8)/16)*16
				this.onfloor = true
			}
			if (!this.onfloor && this.yv < 0 && typeof(level.temptiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24-16)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24-16)/16)]].collision.ceiling) {
				this.yv = 1
				if (!(tile_defs[level.temptiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24-16)/16)]].interaction === false) && tile_defs[level.temptiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24-16)/16)]].interaction.ceiling === true)
					activateTile(Math.round((this.x-8)/16),Math.round((this.y-24-16)/16))
				this.y = Math.round((this.y+8)/16)*16-2
				this.onceil = true
			}
			if ((this.xv < 0 && typeof(level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-22)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-22)/16)]].collision.right) || (this.xv < 0 && typeof(level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-10)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-10)/16)]].collision.right) || (this.xv < 0 && typeof(level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-22-16)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-22-16)/16)]].collision.right)) {
				this.x = Math.round((this.x-14)/16+1)*16+6
				this.xv = 0
				this.onright = true
			}
			if ((this.xv > 0 && typeof(level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-22)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-22)/16)]].collision.left) || (this.xv > 0 && typeof(level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-10)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-10)/16)]].collision.left) || (this.xv > 0 && typeof(level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-22-16)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-22-16)/16)]].collision.left)) {
				this.x = Math.round((this.x-14)/16)*16+10
				this.xv = 0
				this.onleft = true
			}
			if (this.yv < 0 && !this.onceil && !this.onfloor && (typeof(level.temptiles[Math.round((this.x-13)/16)+","+Math.round((this.y-32)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-13)/16)+","+Math.round((this.y-32)/16)]].collision.ceiling)) {
				this.x += 1
			}
			if (this.yv < 0 && !this.onceil && !this.onfloor && (typeof(level.temptiles[Math.round((this.x-3)/16)+","+Math.round((this.y-32)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-3)/16)+","+Math.round((this.y-32)/16)]].collision.ceiling)) {
				this.x -= 1
			}
		}
		if (this.tilecollision && this.tilecollisiontype == "entity") {
			if ((this.yv >= 0 && typeof(level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)]].collision.floor && level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y-8)/16)] === level.temptiles[Math.round((this.x-12)/16)+","+Math.round((this.y+4)/16)]) || (this.yv >= 0 && typeof(level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)]].collision.floor && level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y-8)/16)] == level.temptiles[Math.round((this.x-4)/16)+","+Math.round((this.y+4)/16)])) {
				this.yv = 0
				this.y = Math.round((this.y-8)/16)*16
				this.onfloor = true
			}
			if (!this.onfloor && this.yv < 0 && typeof(level.temptiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-8)/16)+","+Math.round((this.y-24)/16)]].collision.ceiling) {
				this.yv = 1
				this.y = Math.round((this.y+8)/16)*16-2
				this.onceil = true
			}
			if ((this.xv < 0 && typeof(level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-22)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-22)/16)]].collision.right) || (this.xv < 0 && typeof(level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-10)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-14)/16)+","+Math.round((this.y-10)/16)]].collision.right)) {
				this.x = Math.round((this.x-14)/16+1)*16+6
				this.xv = 0
				this.onright = true
			}
			if ((this.xv > 0 && typeof(level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-22)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-22)/16)]].collision.left) || (this.xv > 0 && typeof(level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-10)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-2)/16)+","+Math.round((this.y-10)/16)]].collision.left)) {
				this.x = Math.round((this.x-14)/16)*16+10
				this.xv = 0
				this.onleft = true
			}
			if (this.yv < 0 && !this.onceil && !this.onfloor && (typeof(level.temptiles[Math.round((this.x-13)/16)+","+Math.round((this.y-16)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-13)/16)+","+Math.round((this.y-16)/16)]].collision.ceiling)) {
				this.x += 1
			}
			if (this.yv < 0 && !this.onceil && !this.onfloor && (typeof(level.temptiles[Math.round((this.x-3)/16)+","+Math.round((this.y-16)/16)]) != 'undefined' && tile_defs[level.temptiles[Math.round((this.x-3)/16)+","+Math.round((this.y-16)/16)]].collision.ceiling)) {
				this.x -= 1
			}
		} */
		if (this.tilecollision && (this.tilecollisiontype == "collision_V2" || this.tilecollisiontype == "entity")) { 
			for (let i = 0; i < this.collisionfaces.horizontal; i++) {
				if (typeof(level.temptiles[posToTile(this.x+(this.collisionfaces.horizontal*-8+i*16))+","+posToTile(this.y+this.hitbox.Y_pos)]) != 'undefined') {
					this.solidcollide({X_neg: 0, X_pos: 16, Y_neg: 0, Y_pos: 16}, posToTile(this.x+(this.collisionfaces.horizontal*-8+i*16))*16, posToTile(this.y+this.hitbox.Y_pos)*16, tile_defs[level.tiles[posToTile(this.x+(this.collisionfaces.horizontal*-8+i*16))+","+posToTile(this.y+this.hitbox.Y_pos)]].collision)
				}
				if (typeof(level.temptiles[posToTile(this.x+(this.collisionfaces.horizontal*-8+i*16))+","+posToTile(this.y-this.hitbox.Y_neg)]) != 'undefined') {
					this.solidcollide({X_neg: 0, X_pos: 16, Y_neg: 0, Y_pos: 16}, posToTile(this.x+(this.collisionfaces.horizontal*-8+i*16))*16, posToTile(this.y-this.hitbox.Y_neg)*16, tile_defs[level.tiles[posToTile(this.x+(this.collisionfaces.horizontal*-8+i*16))+","+posToTile(this.y-this.hitbox.Y_neg)]].collision)
				}
			}
			for (let i = 0; i < this.collisionfaces.vertical; i++) {
				if (typeof(level.temptiles[posToTile(this.x+this.hitbox.X_pos)+","+posToTile(this.y+(this.collisionfaces.vertical*-8+i*16))]) != 'undefined') {
					this.solidcollide({X_neg: 0, X_pos: 16, Y_neg: 0, Y_pos: 16}, posToTile(this.x+this.hitbox.X_pos)*16, posToTile(this.y+(this.collisionfaces.vertical*-8+i*16))*16, tile_defs[level.tiles[posToTile(this.x+this.hitbox.X_pos)+","+posToTile(this.y+(this.collisionfaces.vertical*-8+i*16))]].collision)
				}
				if (typeof(level.temptiles[posToTile(this.x-this.hitbox.X_neg)+","+posToTile(this.y+(this.collisionfaces.vertical*-8+i*16))]) != 'undefined') {
					this.solidcollide({X_neg: 0, X_pos: 16, Y_neg: 0, Y_pos: 16}, posToTile(this.x-this.hitbox.X_neg)*16, posToTile(this.y+(this.collisionfaces.vertical*-8+i*16))*16, tile_defs[level.tiles[posToTile(this.x-this.hitbox.X_neg)+","+posToTile(this.y+(this.collisionfaces.vertical*-8+i*16))]].collision)
				}
			}
		}
		if (this.yv < 0) this.yv += this.up_gravity
		this.yv += this.gravity
		this.rx = Math.round(this.x)
		this.ry = Math.round(this.y)
	}
	solidcollide(hitbox, xpos, ypos, tcoll={floor: true, ceiling: true, left: true, right: true}) {
		if (tcoll.floor && this.yv >= 0 && overlap(this.hitbox, this.x, this.y, {X_neg: -1, X_pos: hitbox.X_pos-1, Y_neg: 0, Y_pos: -this.hitbox.Y_neg+Math.abs(this.yv/16)+0.01}, xpos, ypos)) {
			this.yv = 0
			this.y = ypos-this.hitbox.Y_pos
			this.onfloor = true
		}
		if (this.origin_entity == Mario) {
			if (tcoll.ceiling && !this.onfloor && this.yv <= 0 && overlap({X_neg: 0, X_pos: 0, Y_neg: this.hitbox.Y_neg, Y_pos: this.hitbox.Y_pos}, this.x, this.y, {X_neg: 0, X_pos: hitbox.X_pos, Y_neg: -this.hitbox.Y_neg+Math.abs(this.yv/16)+0.01, Y_pos: hitbox.Y_pos}, xpos, ypos)) {
				this.yv = 1
				this.y = ypos+hitbox.Y_pos-this.hitbox.Y_pos+this.hitbox.Y_neg
				this.onceil = true
				if (tile_defs[level.temptiles[posToTile(xpos)+","+posToTile(ypos)]].interaction.ceiling) activateTile(posToTile(xpos), posToTile(ypos))
			}
		} else if (tcoll.ceiling && !this.onfloor && this.yv <= 0 && overlap(this.hitbox, this.x, this.y, {X_neg: -1, X_pos: hitbox.X_pos-1, Y_neg: -this.hitbox.Y_neg+Math.abs(this.yv), Y_pos: hitbox.Y_pos}, xpos, ypos)) {
			this.yv = 1
			this.y = ypos+hitbox.Y_pos-this.hitbox.Y_pos+this.hitbox.Y_neg
			this.onceil = true
		}
		if (tcoll.left && this.xv >= 0 && this.x < xpos+hitbox.X_pos/2 && overlap(this.hitbox, this.x, this.y, {X_neg: 0+hitbox.X_pos/2, X_pos: hitbox.X_pos, Y_neg: -2, Y_pos: hitbox.Y_pos-2}, xpos, ypos)) {
			this.x = xpos-this.hitbox.X_neg
			this.xv = 0
			this.onright = true
		}
		if (tcoll.right && this.xv <= 0 && this.x > xpos+hitbox.X_pos/2 && overlap(this.hitbox, this.x, this.y, {X_neg: 0-hitbox.X_pos/2, X_pos: hitbox.X_pos, Y_neg: -2, Y_pos: hitbox.Y_pos-2}, xpos, ypos)) {
			this.x = xpos+this.hitbox.X_pos+hitbox.X_pos
			this.xv = 0
			this.onleft = true
		}
	}
	draw() {
		canvas.fillStyle = 'rgba(0, 255, 0, 127)';
		canvas.fillRect(Math.round(this.rx-camera_x-this.hitbox.X_neg), Math.round(this.ry-camera_y-this.hitbox.Y_neg), this.hitbox.X_neg+this.hitbox.X_pos, this.hitbox.Y_neg+this.hitbox.Y_pos)
	}
}