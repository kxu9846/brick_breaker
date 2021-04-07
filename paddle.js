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

  move() {
    if (this.left === 0) {
      this.setDirection(1);
    } else if (this.right === this.canvas.width) {
      this.setDirection(-1);
    }
    this.x += this.direction * this.speed;
    this.updateEdges();
  }

  updateEdges() {
    this.top = this.y;
    this.bottom = this.x + this.height;
    this.left = this.x;
    this.right = this.x + this.width;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  render() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
