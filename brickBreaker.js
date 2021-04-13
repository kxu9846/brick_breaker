class BrickBreaker {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.initializeEntities();
    this.initializeEventListeners();
  }

  initializeBricks() {
    this.bricks = [];
    this.brickCols = 5;
    this.brickRows = 8;
    const brickWidth = 50;
    const brickLength = 25;

    const colors = ["red", "blue", "green", "yellow", "purple"];

    for (let col = 0; col < this.brickCols; col++) {
      for (let row = 0; row < this.brickRows; row++) {
        if (!this.bricks[row]) {
          this.bricks[row] = [];
        }
        const x = brickWidth * row;
        const y = brickLength * col;
        const brick = new Brick(
          this.ctx,
          x,
          y,
          brickWidth,
          brickLength,
          colors[col]
        );
        this.bricks[row][col] = brick;
      }
    }
  }

  initializeEntities() {
    this.score = 0;
    this.ball = new Ball(this.ctx, this.canvas.width / 2, 500, 10, "#FFF", 4);
    this.paddle = new Paddle(
      this.canvas,
      this.ctx,
      100,
      10,
      150,
      525,
      5,
      "grey"
    );
    this.initializeBricks();
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
      case " ":
        this.reset();
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

  updateEntities() {
    this.paddle.move();
    this.ball.move();
  }

  detectCanvasCollision(ballTop, ballLeft, ballRight) {
    if (ballLeft <= 0 || ballRight >= this.canvas.width) {
      this.ball.invertXDirection();
    } else if (ballTop <= 0) {
      this.ball.invertYDirection();
    } else if (ballTop > this.canvas.height) {
      this.ball.xDirection = 0;
      this.ball.yDirection = 0;
    }
  }

  detectBallCollisionWithEntity(entity) {
    const ballTop = this.ball.getTopEdge();
    const ballBottom = this.ball.getBottomEdge();
    const ballLeft = this.ball.getLeftEdge();
    const ballRight = this.ball.getRightEdge();

    if (entity === this.paddle) {
      //do stuff
    }
  }

  detectPaddleCollision(ballTop, ballBottom, ballLeft, ballRight) {
    const paddleTop = this.paddle.getTopEdge();
    const paddleBottom = this.paddle.getBottomEdge();
    const paddleLeft = this.paddle.getLeftEdge();
    const paddleRight = this.paddle.getRightEdge();

    if (paddleTop < ballBottom && ballTop >= paddleBottom) {
      if (paddleLeft <= ballLeft && paddleRight >= ballRight) {
        this.ball.invertYDirection();
      }
    }
  }

  detectBrickCollisions(ballTop, ballBottom, ballLeft, ballRight) {
    for (let row = 0; row < this.bricks.length; row++) {
      for (let col = 0; col < this.bricks[row].length; col++) {
        const brick = this.bricks[row][col];
        const brickTop = brick.getTopEdge();
        const brickBottom = brick.getBottomEdge();
        const brickLeft = brick.getLeftEdge();
        const brickRight = brick.getRightEdge();
        if (!brick.broken) {
          if (ballRight >= brickLeft && ballLeft <= brickRight) {
            if (brickBottom >= ballTop || brickTop >= ballBottom) {
              this.ball.invertXDirection();
              this.ball.invertYDirection();
              brick.broken = true;
              this.score += 1;
            }
          }
        }
      }
    }
  }

  detectCollisions() {
    const ballTop = this.ball.getTopEdge();
    const ballBottom = this.ball.getBottomEdge();
    const ballLeft = this.ball.getLeftEdge();
    const ballRight = this.ball.getRightEdge();

    this.detectPaddleCollision(ballTop, ballBottom, ballLeft, ballRight);
    this.detectCanvasCollision(ballTop, ballLeft, ballRight);
    this.detectBrickCollisions(ballTop, ballBottom, ballLeft, ballRight);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  reset() {
    this.clearCanvas();
    this.initializeEntities();
  }

  update() {
    this.updateEntities();
    this.detectCollisions();
  }

  renderBricks() {
    for (let row = 0; row < this.brickRows; row++) {
      for (let col = 0; col < this.brickCols; col++) {
        const brick = this.bricks[row][col];
        if (!brick.broken) {
          brick.render();
        }
      }
    }
  }

  renderScore() {
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 300, 575);
    if (this.score === this.brickRows * this.brickCols) {
      this.clearCanvas();
      this.ctx.font = "50px Arial";
      this.ctx.fillText("YOU WIN", 100, this.canvas.height / 2);
    }
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
