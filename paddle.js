class Paddle {
  constructor(canvas, ctx, width, height, x, y, speed, color) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color;
    this.direction = 0;
  }

  getTopEdge() {
    return this.y;
  }

  getBottomEdge() {
    return this.x + this.height;
  }

  getLeftEdge() {
    return this.x;
  }

  getRightEdge() {
    return this.x + this.width;
  }

  move() {
    const left = this.getLeftEdge();
    const right = this.getRightEdge();

    const futureX = left + this.direction * this.speed;
    const futureRight = right + this.direction * this.speed;

    if (futureX >= 0 && futureRight <= this.canvas.width) {
      this.x = futureX;
    }
  }

  setDirection(direction) {
    this.direction = direction;
  }

  render() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
