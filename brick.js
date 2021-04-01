class Brick {
    constructor(ctx, width, height, color, x, y) {
        this.ctx = ctx
        this.width = width
        this.height =  height
        this.color = color
        this.x = x
        this. y = y
    }
    
    render() {
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.fillStyle = this.color;
    }
}

export default Brick