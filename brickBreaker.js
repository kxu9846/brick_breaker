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
    this.ball = new Ball(
      this.ctx,
      this.canvas.width / 2,
      545,
      7,
      "#FFF",
      10,
      5,
      5
    );
    this.paddle = new Paddle(this.ctx, 100, 10, 150, 550, 5, "grey");
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
    // if paddle hits ball, ball moves in opposite direction, velocity increases
    const paddleTop = this.paddle.y;
    const paddleBottom = this.paddle.x + this.paddle.width;
    const paddleLeft = this.paddle.x;
    const paddleRight = this.paddle.y + this.paddle.height;

    const ballTop = this.ball.y - this.ball.radius;
    const ballBottom = this.ball.x + this.ball.radius;
    const ballLeft = this.ball.x - this.ball.radius;
    const ballRight = this.ball.y + this.ball.radius;

    if (paddleTop === ballBottom) {
      if (paddleLeft <= ballLeft && paddleRight >= ballRight) {
        this.ball.changeDirection(0, -1);
        this.ball.move();
      }
    }
  }

  detectBrickCollision() {
    // if ball hits brick, 1. brick breaks, score +=1, ball direction changes, velocity increases
  }

  detectCanvasCollision() {
    // if ball hits canvas edge, 1. direction changes, velocity increases
    const ballTop = this.ball.y - this.ball.radius;
    const ballLeft = this.ball.x - this.ball.radius;
    const ballRight = this.ball.y + this.ball.radius;

    //if ball hits right or left  wall, it moves in opposite direction
    if (ballLeft <= 0 || ballRight >= this.canvas.width) {
      // do something
    }
    //if ball hits top wall, it comes back down
    else if (ballTop >= 0) {
      //do something
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  reset() {
    // reset game if player wins
  }

  update() {
    console.log("paddle", this.paddle);
    this.updatePaddle();
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

  render() {
    // Draw all entities here - ball, paddle, bricks
    this.clearCanvas();
    this.renderBricks();
    this.ball.render();
    this.paddle.render();
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
