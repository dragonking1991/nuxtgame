export class Hero {
  constructor(config) {
    this.x = config.x
    this.y = config.y
    this.collected = []
    this.ctx = config.ctx
    this.board = config.board
    this.cellSize = config.cellSize
  }

  draw() {
    drawCircle({
      ctx: this.ctx,
      x: (this.x + 0.5) * this.cellSize,
      y: (this.y + 0.5) * this.cellSize,
      r: this.cellSize / 2,
      color: 'yellow'
    })
  }

  move(key, pellets) {
    let nextX = this.x;
    let nextY = this.y;

    switch (key) {
      case 'ArrowUp':
        nextY--;
        break;
      case 'ArrowDown':
        nextY++;
        break;
      case 'ArrowLeft':
        nextX--;
        break;
      case 'ArrowRight':
        nextX++;
        break;
    }

    if (this.board[nextY]?.[nextX] === 0) {
      this.x = nextX;
      this.y = nextY;
      this.collectPellet(pellets)
    }
  }

  collectPellet(pellets) {
    const pelletIndex = pellets.findIndex(pellet => pellet.x === this.x && pellet.y === this.y);
    if (pelletIndex !== -1) {
      this.collected = [...this.collected, pellets.splice(pelletIndex, 1)];
    }
  }
}