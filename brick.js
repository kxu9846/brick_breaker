class Brick {
  constructor(ctx, x, y, width, height, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.top = this.y - this.radius;
    this.bottom = this.y + this.radius;
    this.left = this.x - this.radius;
    this.right = this.x + this.radius;
  }

  render() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
