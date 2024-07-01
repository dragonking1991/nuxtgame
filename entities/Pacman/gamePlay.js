import { Board } from "./board";
import { Ghost } from "./ghost";
import { Hero } from "./hero";
import { Pellets } from "./pellets";

export class GamePlay {
  constructor(config) {
    this.canvas = config.canvas
    this.ctx = this.canvas?.getContext("2d");
    this.hero = null;
    this.pellets = null;
    this.ghosts = [];
    this.status = config.status
    this.setup = config.setup
    this.cellSize = 0
    this.frameControl = {
      stop: false,
      now: Date.now(),
      then: null,
      elapsed: null,
      fpsInterval: null,
    };
  }

  init() {
    const structure = {
      board: this.setup.board,
      ctx: this.ctx,
      cellSize: this.cellSize,
    }
    this.board = new Board({ ...structure })

    this.setup.ghosts.forEach((item, index) => {
      this.ghosts = [...this.ghosts, new Ghost({ id: index, ...item, ...structure })]
    })
    this.hero = new Hero({ ...this.setup.hero, ...structure })
    this.pellets = new Pellets({ ...structure })
  }
  update() {
    this.refreshCanvas();
    this.updateCell()
    this.ghosts.forEach(ghost => {
      if (!ghost.isCollisions(this.hero)) {
        ghost.move()
      } else {
        this.status.stop = true
        this.status.lose = true
        this.status.playing = false
      }
    });

    this.board.draw();
    this.hero.draw();
    this.ghosts.forEach(ghost => {
      ghost.draw()
    })
    this.pellets.draw()
  }

  animate() {
    if (this.frameControl.stop) return;
    !this.setup.stop && !this.status.stop && requestAnimationFrame(() => { this.animate() });
    this.frameControl.now = Date.now();
    this.frameControl.elapsed = this.frameControl.now - this.frameControl.then;
    if (this.frameControl.elapsed > this.frameControl.fpsInterval) {
      this.update();
      this.frameControl.then = this.frameControl.now - (this.frameControl.elapsed % this.frameControl.fpsInterval);
    }
  };

  startAnimating(fps) {
    this.frameControl.fpsInterval = 1000 / fps;
    this.frameControl.then = Date.now();
    this.init()
    this.animate();
  };

  calcCell() {
    return Math.min(this.canvas?.width, this.canvas?.height) / 20 || 0;
  }

  updateCell() {
    this.board.cellSize = this.calcCell()
    this.ghosts.map(ghost => ghost.cellSize = this.calcCell())
    this.hero.cellSize = this.calcCell()
    this.pellets.cellSize = this.calcCell()
  }

  refreshCanvas() {
    this.canvas.width = window?.innerWidth || 0;
    this.canvas.height = window?.innerHeight || 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  moveHero(key) {
    this.hero.move(key,this.pellets?.list);
    !this.pellets?.list.length && (this.status.win = true)
  }

  start() {
    this.status.playing = true;
    this.status.stop = false;
    this.startAnimating(60)
  };

  replay() {
    this.score = 0;
    this.status.win = false;
    this.status.lose = false;
    this.score = 0;
    this.ghosts = [];
    this.hero = null;
    this.start();
  }

}