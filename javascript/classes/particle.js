
class Particle_class {
	constructor(xpos, ypos, xv, yv, imgX, imgY, imgW=8, imgH=8, gravity=0.5, lifetime=-1, frames=1, speed=1) {
		this.x = xpos
		this.y = ypos
		this.xv = xv
		this.yv = yv
		this.gravity = gravity
		this.imgX = imgX
		this.imgY = imgY
		this.imgW = imgW
		this.imgH = imgH
		this.frames = frames
		this.speed = speed
		this.life = lifetime
	}
	game() {
		this.x += this.xv/4
		this.y += this.yv/4
		this.yv += this.gravity/4
		this.life -= 1/4
	}
	draw() {
		if (debug_mode) {
			canvas.globalAlpha = 0.5
			canvas.fillStyle = 'rgba(255, 0, 0)';
			canvas.fillRect(
				Math.trunc(this.x-this.imgW/2-camera_x),
				Math.trunc(this.y-this.imgH/2-camera_y),
				this.imgW,
				this.imgH
			)
			canvas.globalAlpha = 1
		}
		canvas.drawImage(
			img_particles,
			this.imgX+mod(Math.trunc(tileanim_timer*this.speed), this.frames)*this.imgW,
			this.imgY,
			this.imgW,
			this.imgH,
			Math.trunc(this.x-this.imgW/2-camera_x),
			Math.trunc(this.y-this.imgH/2-camera_y),
			this.imgW,
			this.imgH
		)
	}
}