class Mario_Class {
	constructor(xpos, ypos) {
		//create mario entity
		this.entity = new Generic_entity_class(xpos, ypos, {X_neg: 6, X_pos: 6, Y_neg: 14, Y_pos: 0}, this)

		//default properties
		this.mirror = false
		this.dead = false
		this.freezeWorld = false
		this.powerup = 0
		this.frame = 4
		this.jumptimer = 0
		this.speedcap = 11
		this.walkanim = 0
		this.entity.up_gravity = 0
		this.deathtimer = 0
		this.iframes = 0
		this.score = 0
		this.coins = 0
		this.enemy_combo = -1
		
		//image hitbox for onscreen check
		this.img_hitbox = {X_neg: 16, X_pos: 16, Y_neg: 32, Y_pos: 0}
	}
	game() {
		if (!this.freezeWorld) {
			if (this.powerup == 0) {
				this.entity.hitbox = {X_neg: 6, X_pos: 6, Y_neg: 14, Y_pos: 0}
			} else {
				this.entity.hitbox = {X_neg: 6, X_pos: 6, Y_neg: 30, Y_pos: 0}
			}
			this.entity.game()
			if (this.entity.onfloor && !Math.round(this.entity.xv) == 0) {
				this.walkanim = mod(this.walkanim+(this.entity.xv/150), 3)
				this.frame = 2+Math.trunc(this.walkanim)
			}
			if (keyboard.Space && this.jumptimer > 0) {
				if (this.jumptimer > 0) {this.entity.yv = -4}
				if (this.jumptimer > 15) {this.entity.yv = -12}
				if (this.jumptimer > 30) {this.entity.yv = -20}
				this.jumptimer -= 0.8
			}
			if (keyboard.D) {
				this.entity.xv += 0.06
				if (this.entity.onfloor) this.entity.xv += 0.01
				if (this.speedcap = 15) this.entity.xv += 0.01
				if (!keyboard.A && this.entity.xv < 0) {
					this.entity.xv += 0.06
					if (this.entity.onfloor) this.frame = 5
				}
			}
			if (keyboard.A) {
				this.entity.xv -= 0.06
				if (this.entity.onfloor) this.entity.xv -= 0.01
				if (this.speedcap = 15) this.entity.xv -= 0.01
				if (!keyboard.D && this.entity.xv > 0) {
					this.entity.xv -= 0.06
					if (this.entity.onfloor) this.frame = 5
				}
			}
			if (((!keyboard.A && !keyboard.D) || (keyboard.A && keyboard.D)) && Math.round(this.entity.xv) == 0) {
				this.entity.xv = 0
			}
			if (((!keyboard.A && !keyboard.D) || (keyboard.A && keyboard.D)) && this.entity.onfloor && Math.round(this.entity.xv) != 0) {
				this.entity.xv -= (Math.abs(this.entity.xv)/this.entity.xv)*0.12
			}
			if (keyboard.Shift && this.entity.onfloor) {this.speedcap = 15} else if (!keyboard.Shift || (Math.abs(this.entity.xv) < 11 && !this.entity.onfloor)) {this.speedcap = 11};
			if (this.entity.xv > this.speedcap)
				this.entity.xv = this.speedcap
			if (this.entity.xv < -this.speedcap)
				this.entity.xv = -this.speedcap
			if (!this.entity.onfloor && this.entity.yv < 0) {
				this.frame = 6
				if (!keyboard.Space) {
					this.jumptimer = 0
				}
			}
			if (!this.entity.onfloor && !keyboard.Space)
				this.jumptimer = 0
			if (this.entity.onceil) {
				this.entity.onceil = false
				this.jumptimer = 0
			}
			if (this.entity.onfloor && Math.round(this.entity.xv) == 0) {
				this.frame = 0
			}
			if (this.entity.onfloor && !keyboard.Space) {
				this.jumptimer = 76 + Math.abs(this.entity.xv)/2.5
				if (keyboard.Shift) this.jumptimer = 76 + Math.abs(this.entity.xv)/1.5
			}
			if (this.entity.onfloor && keyboard.D && !keyboard.A) {
				this.mirror = false
			}else if (this.entity.onfloor && keyboard.A && !keyboard.D) {
				this.mirror = true
			}
			if (this.entity.onfloor) this.enemy_combo = -1
			if (this.entity.x < Math.round(camera_x)+6) {
				this.entity.x = Math.round(camera_x)+6
				if (this.entity.xv < 0) this.entity.xv = 0
			}
			if (this.entity.x > Math.round(camera_x)+250) {
				this.entity.x = Math.round(camera_x)+250
				if (this.entity.xv > 0) this.entity.xv = 0
			}
		} 
		if (this.dead) {
			this.freezeWorld = true
			this.frame = 1
			this.powerup = 0
			this.deathtimer += 1
			if (this.deathtimer > 960) startGame()
			if (this.deathtimer > 120) {
				this.entity.y += this.entity.yv/4
				this.entity.ry = Math.round(this.entity.y)
				this.entity.yv += 0.05
			} else {
				this.entity.yv = -5
			}
		}
		if (this.entity.y > camera_y+272) this.dead = true
		if (this.iframes > 0) this.iframes -= 1
		if (this.damageframes >= 0) this.damageframes -= 1
		if (this.damageframes == 0) this.freezeWorld = false
		if (this.damageframes < 144 && !(this.damageframes <= 0)) {
			if (Math.trunc(this.damageframes/24) === Math.round(this.damageframes/24)) {
				this.powerup = 0
			} else {
				this.powerup = 1
			}
		} else if (this.damageframes >= 144) {
			this.powerup = 1
		}
	}
	draw() {
		if ((Math.trunc(this.iframes/8) === Math.round(this.iframes/8) || this.iframes === 0) && onscreen(this.img_hitbox, this.entity.rx, this.entity.ry)) {
			if (this.mirror) {
				canvas.scale(-1, 1);
				canvas.drawImage(img_mario, 32+this.frame*32, this.powerup*32, 32, 32, Math.round(camera_x)-this.entity.rx-16, -Math.trunc(camera_y)+this.entity.ry-31, 32, 32);
				canvas.scale(-1, 1);
			}else{
				canvas.drawImage(img_mario, 32+this.frame*32, this.powerup*32, 32, 32, -Math.round(camera_x)+this.entity.rx-16, -Math.trunc(camera_y)+this.entity.ry-31, 32, 32);
			}
		}
		if (debug_mode) {
			canvas.globalAlpha = 0.5
			canvas.fillStyle = 'rgb(255, 0, 0)';
			canvas.fillRect(this.x-camera_x, 0, 1, 240)
			canvas.globalAlpha = 1
		}
	}
	damage() {
		if (this.iframes > 0) return
		if (this.powerup > 0) {
			this.iframes = 960
			this.damageframes = 200
			this.freezeWorld = true
			this.powerup = 0
			this.frame = 6
		} else {
			this.dead = true
		}
	}
}