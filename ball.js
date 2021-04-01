class Ball {
    constructor(ctx, x, y, radius, color) {
        this.ctx = ctx
        this.x = x
        this.y =  y
        this.radius = radius
        this.color = color
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

export default Ball