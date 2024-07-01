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
    drawObj({ ctx, ...this })
  }

  isCollision(target) {
    return checkCollision(this, target)
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