export class Board {
  constructor(config) {
    this.board = config.board
    this.cellSize = config.cellSize
    this.ctx = config.ctx
  }

  drawCell(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
  }

  draw() {
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        if (this.board[y][x] === 1) {
          this.drawCell(x, y, '#ebb77f');
        } else {
          this.drawCell(x, y, '#f8dbbb');
        }
      }
    }
  }
}