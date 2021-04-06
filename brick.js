class Brick {
  constructor(ctx, x, y, width, height, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  render() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
