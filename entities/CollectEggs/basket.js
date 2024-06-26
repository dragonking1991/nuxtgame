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

  moveLeft() { this.x -= this.speed }
  moveRight() { this.x += this.speed }

  collect(item) {
    const checkIdDuplicated = this.collected.findIndex(el => el.id === item.id)
    checkIdDuplicated < 0 && (this.collected = [...this.collected, item])
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.w, this.h)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  isCollision(target) {
    let dx = target.x - Math.max(this.x, Math.min(target.x, this.x + this.w))
    let dy = target.y - Math.max(this.y, Math.min(target.y, this.y + this.h))
    return (dx * dx + dy * dy) < (target.r * target.r)
  }

  isValidCollision(target) {
    const basketLeft = this.x
    const basketRight = this.x + this.w
    const eggMiddle = target.x

    if (basketLeft > eggMiddle) {
      target.thrust = -1
    } else if (basketRight < eggMiddle) {
      target.thrust = 1
    } else {
      return true
    }
  }
}