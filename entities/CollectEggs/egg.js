export class Egg {
  constructor(config) {
    this.id = config.id,
      this.x = config.x,
      this.y = config.y,
      this.r = config.r,
      this.gravity = config.gravity || 1,
      this.thrust = config.thrust || 0,
      this.color = config.color || "rgb(146,79,38)"
  }

  moveDown() { this.y += this.gravity }

  fallout() {
    console.log('fallout',this.thrust);
    this.x += this.thrust * Math.sin(50 * Math.PI / 180)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  isCollision(target) {
    let dx = this.x - Math.max(target.x, Math.min(this.x, target.x + target.w))
    let dy = this.y - Math.max(target.y, Math.min(this.y, target.y + target.h))
    return (dx * dx + dy * dy) < (this.r * this.r)
  }
}