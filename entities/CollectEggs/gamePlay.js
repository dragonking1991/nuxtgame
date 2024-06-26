import { Basket } from "./basket"
import { Egg } from "./egg"

export class GamePlay {
  constructor(config) {
    this.canvas = config.canvas
    this.ctx = this.canvas?.getContext("2d");
    this.basket = null
    this.eggs = []
    this.eggRadius = config.setup.eggRadius || 20
    this.status = config.status
    this.setup = config.setup
    this.keyPress = config.interact.keyPress
    this.elementX = config.interact.elementX
    this.isOutside = config.interact.isOutside
  }

  checkScore() { return this.basket?.collected.length || 0 }

  initEggs() {
    for (let index = 0; index < this.setup.balls; index++) {
      const config = {
        id: index,
        x: getRandomFloat(this.canvas.width - this.eggRadius * 2, this.eggRadius),
        y: 0,
        r: this.eggRadius,
        color: getRandomColor(),
        gravity: (this.canvas.height / 100) * 0.8,
      };
      this.eggs = [...this.eggs, new Egg(config)];
    }
  };

  initBasket() {
    const basketW = 100;
    const basketH = 30;
    const basketConfig = {
      x: this.canvas.width / 2 - basketW / 2,
      y: this.canvas.height - basketH,
      w: basketW,
      h: basketH,
      speed: this.canvas.width / 100 * .7
    };
    this.basket = new Basket(basketConfig);
  };

  refreshCanvas() {
    this.canvas.width = window?.innerWidth || 0;
    this.canvas.height = window?.innerHeight || 0;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  update() {
    this.refreshCanvas();
    if (!this.eggs.length) {
      this.status.playing = false;

      if (this.checkScore < 8) {
        this.status.lose = true;
      } else {
        this.status.win = true;
      }
      return;
    } else {
      this.moveEggs();
      this.moveBasket();

      this.eggs[0]?.draw(this.ctx);
      this.basket.draw(this.ctx);
      !this.setup.stop && window.requestAnimationFrame(() => {
        this.update()
      });
    }
  };

  moveBasket() {
    // !this.isOutside
    //   && this.elementX
    //   && (this.basket.x = this.elementX - this.basket.w / 2);

    this.keyPress === "ArrowRight" && this.basket.moveRight()
    this.keyPress === "ArrowLeft" && this.basket.moveLeft()
  };

  moveEggs() {
    const [activeEgg, ...remainEgg] = this.eggs;

    if (activeEgg) {

      if (this.basket.isCollision(activeEgg)) {
        this.basket.isValidCollision(activeEgg)
          ? this.basket.collect(activeEgg)
          : activeEgg.fallout()
      }

      activeEgg.y <= this.canvas.height
        ? activeEgg.moveDown()
        : this.eggs = [...remainEgg];
    }
  };

  start() {
    this.initEggs();
    this.initBasket();
    this.status.playing = true;
    this.update();
  };

  replay() {
    this.status.win = false;
    this.status.lose = false;
    this.score = 0;
    this.eggs = [];
    this.basket.collected = [];
    this.start();
  };

  stop() {
    this.status.stop = true;
    window.cancelAnimationFrame(() => {
      this.update()
    });
  };

  play() {
    this.status.stop = false;
    window.requestAnimationFrame(() => {
      this.update()
    });
  };
}