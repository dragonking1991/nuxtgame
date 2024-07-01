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
    this.moveCounter = 0
    this.moveInterval = 18
  }

  draw() {
    drawCircle({
      ctx: this.ctx,
      x: (this.x + 0.5) * this.cellSize,
      y: (this.y + 0.5) * this.cellSize,
      r: this.cellSize / 2,
      color: this.color
    })
  }

  move() {
    this.moveCounter++;
    if (this.moveCounter % this.moveInterval !== 0) {
      return;
    }

    const directions = ['up', 'down', 'left', 'right'];
    const randomDirection = directions[~~(Math.random() * directions.length)];

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