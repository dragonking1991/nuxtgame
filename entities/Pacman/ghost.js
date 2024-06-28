export class Ghost {
  constructor(config) {
    this.x = config.x
    this.y = config.y
    this.id = config.id
    this.color = config.color
    this.direction = config.direction
    this.ctx = config.ctx
    this.board = config.board
    this.cellSize = config.cellSize
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc((this.x + 0.5) * this.cellSize, (this.y + 0.5) * this.cellSize, this.cellSize / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  move() {
    const directions = ['up', 'down', 'left', 'right'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    let nextX = this.x
    let nextY = this.y

    switch (randomDirection) {
      case 'up':
        nextY--;
        break;
      case 'down':
        nextY++;
        break;
      case 'left':
        nextX--;
        break;
      case 'right':
        nextX++;
        break;
    }
    if (this.board?.[nextY] && this.board[nextY]?.[nextX] === 0) {
      this.x = nextX
      this.y = nextY
      this.direction = randomDirection;
    }
  }

  isCollisions(hero) {
    if (hero.x === this.x && hero.y === this.y) {
      return true
    }
  }

}