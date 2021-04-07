class BrickBreaker {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.score = 0;
    this.leftArrowPressed = false;
    this.rightArrowPressed = false;
    this.initializeEntities();
    this.initializeEventListeners();
  }

  initializeEntities() {
    this.ball = new Ball(this.ctx, this.canvas.width / 2, 200, 10, "#FFF", 4);
    this.paddle = new Paddle(this.ctx, 100, 10, 150, 500, 5, "grey");
    this.bricks = [];

    const colors = ["red", "blue", "green", "yellow", "purple"];

    let y = 0;
    for (let row = 0; row < 5; row++) {
      let x = 0;
      if (!this.bricks[row]) {
        this.bricks[row] = [];
      }
      for (let col = 0; col < 8; col++) {
        let brick = new Brick(this.ctx, x, y, 50, 25, colors[row]);
        x += 50;
        this.bricks[row][col] = brick;
      }
      y += 25;
    }
  }

  initializeEventListeners() {
    window.addEventListener("keydown", this.keyDownHandler.bind(this));
    window.addEventListener("keyup", this.keyUpHandler.bind(this));
  }

  keyDownHandler(e) {
    switch (e.key) {
      case "ArrowLeft":
        this.paddle.setDirection(-1);
        break;
      case "ArrowRight":
        this.paddle.setDirection(1);
        break;
    }
  }

  keyUpHandler(e) {
    switch (e.key) {
      case "ArrowLeft":
        this.paddle.setDirection(0);
        break;
      case "ArrowRight":
        this.paddle.setDirection(0);
        break;
    }
  }

  updatePaddle() {
    this.paddle.move();
  }

  updateBall() {
    this.ball.move();
  }

  detectPaddleCollision() {
    if (
      this.paddle.top <= this.ball.bottom &&
      this.ball.top >= this.paddle.bottom
    ) {
      if (
        this.paddle.left <= this.ball.left &&
        this.paddle.right >= this.ball.right
      ) {
        this.ball.setDirection(-1, -1);
      }
    }
  }

  detectCanvasCollision() {
    // console.log("this is ball bottom", this.ball.bottom);
    if (this.ball.left <= 0) {
      this.ball.setDirection(1, this.ball.yDirection);
    } else if (this.ball.right >= 400) {
      this.ball.setDirection(-1, this.ball.yDirection);
    } else if (this.ball.top <= 0) {
      this.ball.setDirection(this.ball.xDirection, 1);
    } else if (this.ball.top > this.canvas.height) {
      this.ball.setDirection(0, 0);
    }
  }

  detectBrickCollision() {
    for (let row = 0; row < this.bricks.length; row++) {
      for (let col = 0; col < this.bricks[row].length; col++) {
        let brick = this.bricks[row][col];
        if (brick.bottom >= this.ball.top) {
          if (this.ball.right >= brick.left && this.ball.left <= brick.right) {
            if (brick.broken === false) {
              this.ball.setDirection(1, 1);
              brick.broken = true;
              this.score += 1;
            }
          }
        }
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  reset() {
    this.clearCanvas();
    this.initializeEntities();
  }

  update() {
    this.updatePaddle();
    this.updateBall();
    this.detectPaddleCollision();
    this.detectCanvasCollision();
    this.detectBrickCollision();
  }

  renderBricks() {
    let allBroken = true;
    for (let row = 0; row < this.bricks.length; row++) {
      for (let col = 0; col < this.bricks[row].length; col++) {
        let brick = this.bricks[row][col];
        if (brick.broken === false) {
          brick.render();
          allBroken = false;
        }
      }
    }
    if (allBroken) {
      this.reset();
    }
  }

  renderScore() {
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 300, 575);
  }

  render() {
    this.clearCanvas();
    this.renderBricks();
    this.ball.render();
    this.paddle.render();
    this.renderScore();
  }

  run() {
    this.update();
    this.render();
  }

  start() {
    setInterval(this.run.bind(this), 1000 / 60);
  }
}

new BrickBreaker().start();

/*
TODO:
1. move paddle
2. move ball
3. collision logic
4. break brick logic
5. win game logic


*/
