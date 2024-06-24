export class Basket {
  constructor(config) {
    this.x = config.x,
      this.y = config.y,
      this.w = config.w,
      this.h = config.h,
      this.speed = config.speed || 1,
      this.color = config.color || "#000",
      this.collected = []
  }

  moveLeft() {
    this.x -=  this.speed
  }
  moveRight() {
    this.x +=  this.speed
  }

  collect(item) {
    this.collected = [...this.collected, item]
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.w, this.h)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }
  isCollision(target) {
    let dx = this.x - Math.max(target.x, Math.min(this.x, target.x + target.w))
    let dy = this.y - Math.max(target.y, Math.min(this.y, target.y + target.h))
    console.log('checkCollision', this.x, target.x, (dx * dx + dy * dy), (this.w * this.h));
    return (dx * dx + dy * dy) < (this.w * this.h)
  }
}