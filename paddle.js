class Paddle {
  constructor(ctx, width, height, x, y, speed, color) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color;
    this.direction = 0;
  }

  move() {
    const paddleLeft = this.x;
    const paddleRight = this.x + this.width;

    if (paddleLeft === 0) {
      this.setDirection(1);
    } else if (paddleRight === 400) {
      this.setDirection(-1);
    }
    this.x += this.direction * this.speed;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  render() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
