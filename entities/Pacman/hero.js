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
    this.ctx.beginPath();
    this.ctx.arc((this.x + 0.5) * this.cellSize, (this.y + 0.5) * this.cellSize, this.cellSize / 2, 0, Math.PI * 2);
    this.ctx.fillStyle = 'yellow';
    this.ctx.fill();
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

  collectPellet(pellets){
    const pelletIndex = pellets.findIndex(pellet => pellet.x === this.x && pellet.y === this.y);
    if (pelletIndex !== -1) {
      this.collected = [ ...this.collected, pellets.splice(pelletIndex, 1)];
    }
  }
}