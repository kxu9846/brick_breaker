class BrickBreaker {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.score = 0;
    this.initializeEntities();
    this.initializeEventListeners();
  }

  initializeEntities() {
    this.ball = new Ball(this.ctx, this.canvas.width / 2, 200, 10, "#FFF", 4);
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
    this.bricks = [];
    this.brickRows = 5;
    this.brickCols = 8;
    this.brickWidth = 50;
    this.brickLength = 25;

    const colors = ["red", "blue", "green", "yellow", "purple"];

    for (let col = 0; col < this.brickRows; col++) {
      for (let row = 0; row < this.brickCols; row++) {
        if (!this.bricks[row]) {
          this.bricks[row] = [];
        }
        let brick = new Brick(
          this.ctx,
          row * 50,
          col * 25,
          this.brickWidth,
          this.brickLength,
          colors[col]
        );
        this.bricks[row][col] = brick;
      }
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

  updateEntities() {
    this.paddle.move();
    this.ball.move();
  }

  detectCollisions() {
    this.updateEntities();

    if (
      this.paddle.top <= this.ball.bottom &&
      this.ball.top >= this.paddle.bottom
    ) {
      if (
        this.paddle.left <= this.ball.left &&
        this.paddle.right >= this.ball.right
      ) {
        this.ball.setXDirection(-1);
        this.ball.setYDirection(-1);
      }
    }

    if (this.ball.left <= 0) {
      this.ball.setXDirection(1);
      this.ball.setYDirection(this.ball.yDirection);
    } else if (this.ball.right >= this.canvas.width) {
      this.ball.setXDirection(-1);
      this.ball.setYDirection(this.ball.yDirection);
    } else if (this.ball.top <= 0) {
      this.ball.setXDirection(this.ball.xDirection);
      this.ball.setYDirection(1);
    } else if (this.ball.top > this.canvas.height) {
      this.ball.setXDirection(0);
      this.ball.setYDirection(0);
    }
  }

  detectBrickCollisions() {
    for (let row = 0; row < this.bricks.length; row++) {
      for (let col = 0; col < this.bricks[row].length; col++) {
        let brick = this.bricks[row][col];
        if (brick.bottom >= this.ball.top && brick.broken === false) {
          if (this.ball.right >= brick.left && this.ball.left <= brick.right) {
            this.ball.setXDirection(1);
            this.ball.setYDirection(1);
            brick.broken = true;
            this.score += 1;
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
    this.detectCollisions();
    this.detectBrickCollisions();
  }

  renderBricks() {
    for (let row = 0; row < this.bricks.length; row++) {
      for (let col = 0; col < this.bricks[row].length; col++) {
        const brick = this.bricks[row][col];
        if (brick.broken === false) {
          brick.render();
        }
      }
    }
  }

  renderScore() {
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.score}`, 300, 575);
    if (this.score === this.brickRows * this.bricksC) {
      this.ctx.font = "30px Arial";
      this.ctx.fillText(
        "YOU WIN",
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      this.reset();
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
