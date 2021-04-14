class Brick {
  constructor(ctx, x, y, width, height, color) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.broken = false;
  }

  getTopEdge() {
    return this.y;
  }

  getBottomEdge() {
    return this.y + this.height;
  }

  getLeftEdge() {
    return this.x;
  }

  getRightEdge() {
    return this.x + this.width;
  }

  render() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = "white";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
