class Ball {
  constructor(ctx, x, y, radius, color, speed, velocityX, velocityY) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  move() {
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  changeDirection(directionX, directionY) {
    this.velocityX *= directionX;
    this.velocityY *= directionY;
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
