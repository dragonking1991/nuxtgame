import { Basket } from "./basket"
import { Egg } from "./egg"

export class GamePlay {
  constructor(config) {
    this.ctx = config.ctx
    this.eggs = config.eggs
    this.setup = config.setup
    this.status = config.status
    this.basket = config.basket
    this.canvas = config.canvas
    this.score = config.status.score
    this.keyPress = config.interact.keyPress
    this.elementX = config.interact.elementX
    this.isOutside = config.interact.isOutside
  }

  initEggs() {
    for (let index = 0; index < this.setup.balls; index++) {
      const config = {
        x: Math.random() * 500 + 50,
        y: 0,
        r: 20,
        color: getRandomColor(),
        speed: (this.canvas.height / 100) * 0.5,
      };
      this.eggs = [...this.eggs, new Egg(config)];
    }
  };

  checkScore() {
    return this.basket?.collected.length || 0
  }

  initBasket() {
    const basketW = 100;
    const basketH = 30;
    const basketConfig = {
      x: this.canvas.width / 2 - basketW / 2,
      y: this.canvas.height - basketH,
      w: basketW,
      h: basketH,
      speed: this.canvas.width / 10 * .2
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
    if (!this.status.playing) return;

    this.moveEggs();
    this.moveBasket();

    this.eggs[0]?.draw(this.ctx);
    this.basket.draw(this.ctx);

    if (this.eggs.length === 0 && !this.status.win) {
      this.status.lose = true;
      this.status.playing = false;
    } else if (!this.eggs.length) {
      this.status.win = true;
      this.status.playing = false;
    } else {
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

  updateEgg() {
    const [collectedEgg, ...remainEgg] = this.eggs;
    this.basket.collect(collectedEgg);
    this.eggs = [...remainEgg];
  };

  moveEggs() {
    if (this.eggs[0]) {
      if (this.eggs[0].isCollision(this.basket)) {
        this.updateEgg()
        this.score = this.checkScore();
      } else {
        if (this.eggs[0].y <= this.canvas.height) {
          this.eggs[0].y += this.eggs[0].speed;
        } else {
          this.updateEgg()
        }
      }
    } else {

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
    eggs.value = [];
    basket.value.collected = [];
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