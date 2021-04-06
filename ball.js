class Ball {
  constructor(ctx, x, y, radius, color, speed) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.xDirection = 0;
    this.yDirection = 1;
    this.gameOver = false;
  }

  move() {
    if (this.gameStart) {
      this.x += this.xDirection * this.speed;
    }
    this.y += this.yDirection * this.speed;
    this.updateEdges();
  }

  updateEdges() {
    this.top = this.y - this.radius;
    this.bottom = this.y + this.radius;
    this.left = this.x - this.radius;
    this.right = this.x + this.radius;
  }

  setDirection(xDirection, yDirection) {
    this.xDirection = xDirection;
    this.yDirection = yDirection;
    this.gameStart = true;
  }

  render() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    // syntax --> arc(x, y, radius, startAngle, endAngle, antiClockwise_or_not)
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true); // π * 2 Radians = 360 degrees
    this.ctx.closePath();
    this.ctx.fill();
  }
}
