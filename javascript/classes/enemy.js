class Baddie_Class {
	constructor(xpos, ypos, id) {
		
		//some default enemy properties
		this.inherit = "inherit"
		
		
		//get properties from json
		for (let i = 0; i < (Object.keys(enemy_defs["inherit"]).length); i++) {
			//gets default property from "inherit"
			this[Object.keys(enemy_defs["inherit"])[i]] = enemy_defs["inherit"][Object.keys(enemy_defs["inherit"])[i]]
		}
		for (let i2 = 0; i2 < (Object.keys(enemy_defs[id]).length); i2++) {
			//gets property from enemy id
			this[Object.keys(enemy_defs[id])[i2]] = enemy_defs[id][Object.keys(enemy_defs[id])[i2]]
		}
		
		//enemies always inherit the "inherit" properties
		
		//some default object properties
		this.mirror = false
		this.flip = false
		this.animationTimer = 0
		this.direction = -1
		this.deathtimer = 0
		this.dead = false
		this.enemyid = id
		
		//create the entity
		this.entity = new Generic_entity_class(xpos, ypos, this.hitbox, this)
		this.entity.gravity = this.gravity
		this.entity.tilecollision = this.tilecollision
	
		//image hitbox for onscreen check
		this.img_hitbox = {X_neg: this.animationWidth/2, X_pos: this.animationWidth/2, Y_neg: this.animationHeight, Y_pos: 0}
		
	}
	game() {
		if (this.dead) {
			if (this.deathAnimation) {
				this.deathtimer += 1
			} else {
				this.entity.tilecollision = false
				this.entity.game()
			}
			if (this.deathtimer >= 120) this.delete = true
			this.entity.hitbox = false
		} else {
			this.entity.game()
			this.animationTimer += (1/240)*this.animationFPS
			this.entity.xv = this.speed*5*this.direction
			if (this.entity.onleft) {
				this.direction = 1
				this.mirror = true
			}
			if (this.entity.onright) {
				this.direction = -1
				this.mirror = false
			}
			for (let i = 0; i < enemies.length; i++) {
				if (!(enemies[i] == this) && !enemies[i].dead && enemies[i].enemycollision && this.enemycollision && overlap(enemies[i].entity.hitbox, enemies[i].entity.x, enemies[i].entity.y, this.entity.hitbox, this.entity.x, this.entity.y)) {
					if (this.entity.x > enemies[i].entity.x) {
						this.direction = 1
						this.mirror = true
						enemies[i].direction = -1
						enemies[i].mirror = false
					} else {
						this.direction = -1
						this.mirror = false
						enemies[i].direction = 1
						enemies[i].mirror = true
					}
				}
			}
			if (overlap(Mario.entity.hitbox, Mario.entity.x, Mario.entity.y, this.entity.hitbox, this.entity.x, this.entity.y)) {
				if ((Mario.entity.y < this.entity.y || Mario.entity.yv > Mario.entity.gravity)&& this.canStomp) {
					Mario.entity.yv = -20
					Mario.enemy_combo += 1
					if (Mario.enemy_combo < 8) {
						Mario.score += [100, 200, 400, 800, 1000, 2000, 4000, 8000][Mario.enemy_combo]
		//Particle_class(xpos, ypos, xv, yv, imgX, imgY, imgW, imgH, gravity, lifetime, frames, speed)
						particles.push(new Particle_class(this.entity.x, this.entity.y-8, 0, -1, 0, [0, 8, 16, 24, 0, 8, 16, 24][Mario.enemy_combo], [11, 12, 12, 12, 15, 16, 16, 16][Mario.enemy_combo], 8, 0, 45))
					} else {
						particles.push(new Particle_class(this.entity.x, this.entity.y-8, 0, -1, 0, 32, 16, 7, 0, 45))
					}
					if (level.settings.enemy_high_jump) Mario.jumptimer = 90
					this.dead = true
					if (!this.deathAnimation) {
						this.flip = true
						this.entity.yv = -10
						this.entity.gravity = 0.5
					}
				} else {
					if (this.kills) Mario.damage()
					if (this.growsMario) Mario.grow()
				}
				if (this.destroyOnMario) {
					this.delete = true
				}
			}
		}
	}
	draw() {
		//drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
		this.animationFrame = mod(Math.trunc(this.animationTimer), this.animation.length)
		if (this.dead && this.deathAnimation) {
			this.frameX = this.deathFrame.frameX
			this.frameY = this.deathFrame.frameY
		} else {
			this.frameX = this.animation[mod(Math.trunc(this.animationTimer), this.animation.length)].frameX
			this.frameY = this.animation[mod(Math.trunc(this.animationTimer), this.animation.length)].frameY
		}
		if (onscreen(this.img_hitbox, this.entity.rx, this.entity.ry)) {
			this.flipvalue = 1
			this.mirrorvalue = 1
			if (this.flip) this.flipvalue = -1
			if (this.mirror && this.mirrors) this.mirrorvalue = -1
			canvas.scale(this.mirrorvalue, this.flipvalue);
			canvas.drawImage(
				img_sprites,
				this.frameX,
				this.frameY,
				(this.img_hitbox.X_neg+this.img_hitbox.X_pos),
				(this.img_hitbox.Y_neg+this.img_hitbox.Y_pos),
				this.mirrorvalue*(-Math.round(camera_x)+this.entity.rx)-(this.img_hitbox.X_neg+this.img_hitbox.X_pos)/2,
				this.flipvalue*(-Math.round(camera_y)+this.entity.ry+1)-(this.img_hitbox.Y_neg+this.img_hitbox.Y_pos)/2-(this.img_hitbox.Y_neg+this.img_hitbox.Y_pos)/2*this.flipvalue,
				(this.img_hitbox.X_neg+this.img_hitbox.X_pos),
				(this.img_hitbox.Y_neg+this.img_hitbox.Y_pos)
			);
			canvas.scale(this.mirrorvalue, this.flipvalue);
		}
	}
}


class Enemy_block_animation {
	constructor(xpos, ypos, id) {
		this.x = xpos
		this.y = ypos
		this.id = id
		this.emergetimer = 0
		this.frameX = enemy_defs[id].animation[0].frameX
		this.frameY = enemy_defs[id].animation[0].frameY
		this.animationWidth = (function(){if(typeof(enemy_defs[id].animationWidth) == "undefined"){return enemy_defs.inherit.animationWidth}else{return enemy_defs[id].animationWidth}})()
		this.animationHeight = (function(){if(typeof(enemy_defs[id].animationWidth) == "undefined"){return enemy_defs.inherit.animationHeight}else{return enemy_defs[id].animationHeight}})()
		this.img_hitbox = {X_neg: this.animationWidth/2, X_pos: this.animationWidth/2, Y_neg: this.animationHeight, Y_pos: 0}
		this.flipvalue = 1
		this.mirrorvalue = 1
	}
	game(id) {
		this.emergetimer += 0.125
		if (Math.trunc(this.emergetimer) >= this.animationHeight) {
			enemies.push(new Baddie_Class(this.x, this.y, this.id))
			bgparticles.splice(id,1)
		}
	}
	draw(id) {
		//drawImage(image, image x, image y, image width, image height, x pos, y pos, width, height)
		if (onscreen(this.img_hitbox, this.x, this.y)) {
			canvas.scale(this.mirrorvalue, this.flipvalue);
			canvas.drawImage(
				img_sprites,
				this.frameX,
				this.frameY,
				(this.img_hitbox.X_neg+this.img_hitbox.X_pos),
				Math.trunc(this.emergetimer),
				this.mirrorvalue*(-Math.round(camera_x)+this.x)-(this.img_hitbox.X_neg+this.img_hitbox.X_pos)/2,
				this.y+1-Math.trunc(this.emergetimer),
				(this.img_hitbox.X_neg+this.img_hitbox.X_pos),
				Math.trunc(this.emergetimer)
			);
			canvas.scale(this.mirrorvalue, this.flipvalue);
		}
	}
}