
export class Pellets {
  constructor(config) {
    this.cellSize = config.cellSize
    this.board = config.board
    this.ctx = config.ctx
    this.list = []
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        if (this.board[y][x] === 0) {
          this.list = [...this.list, { x, y, id: x + '' + y }]
        }
      }
    }
  }


  drawPellet({ x, y }) {
    // console.log('drawPellet', x, y, this.cellSize);
    this.ctx.beginPath();
    this.ctx.arc((x + 0.5) * this.cellSize, (y + 0.5) * this.cellSize, this.cellSize / 8, 0, Math.PI * 2);
    this.ctx.fillStyle = '#000';
    this.ctx.fill();
  }

  draw() {
    this.list.forEach(item => {
      this.drawPellet(item)
    })
  }
}