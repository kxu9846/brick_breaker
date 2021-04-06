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
    this.ball = new Ball(this.ctx, this.canvas.width / 2, 200, 7, "#FFF", 4);
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

  detectPaddleCollision() {
    if (this.paddle.top <= this.ball.bottom) {
      if (
        this.paddle.left <= this.ball.left &&
        this.paddle.right >= this.ball.right
      ) {
        this.ball.setDirection(-1, -1);
      }
    }
  }

  updateBall() {
    this.ball.move();
  }

  detectBrickCollision() {
    // if ball hits brick, 1. brick breaks, score +=1, ball direction changes, velocity increases
  }

  detectCanvasCollision() {
    if (this.ball.left <= 0) {
      this.ball.setDirection(1, -1);
    } else if (this.ball.right >= 400) {
      this.ball.setDirection(-1, 1);
    } else if (this.ball.top <= 0) {
      this.ball.setDirection(1, 1);
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  reset() {
    // reset game if player wins
  }

  update() {
    this.updatePaddle();
    this.updateBall();
    this.detectPaddleCollision();
    this.detectBrickCollision();
    this.detectCanvasCollision();
  }

  renderBricks() {
    for (let row = 0; row < this.bricks.length; row++) {
      for (let col = 0; col < this.bricks[row].length; col++) {
        this.bricks[row][col].render();
      }
    }
  }

  renderScore() {
    console.log("in render score");
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 300, 575);
  }

  render() {
    // Draw all entities here - ball, paddle, bricks
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
