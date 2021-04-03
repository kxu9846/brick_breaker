class Paddle {
    constructor(ctx, width, height, x, y, color) {
        this.ctx = ctx
        this.width = width
        this.height =  height
        this.x = x
        this.y = y
        this.color = color

    }

    render() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
