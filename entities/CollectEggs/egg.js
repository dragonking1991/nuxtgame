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
    this.x += this.thrust * Math.sin(50 * Math.PI / 180)
  }

  draw(ctx) {
    drawObj({ ctx, ...this })
  }

  isCollision(target) {
    return checkCollision(this, target)
  }
}