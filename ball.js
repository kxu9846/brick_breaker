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
  }

  getTopEdge() {
    return this.y - this.radius;
  }

  getBottomEdge() {
    return this.y + this.radius;
  }

  getLeftEdge() {
    return this.x - this.radius;
  }

  getRightEdge() {
    return this.x + this.radius;
  }

  move() {
    this.x += this.xDirection * this.speed;
    this.y += this.yDirection * this.speed;
  }

  setXDirection(direction) {
    this.xDirection = direction;
  }

  setYDirection(direction) {
    this.yDirection = direction;
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
