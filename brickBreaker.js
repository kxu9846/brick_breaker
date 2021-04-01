import Brick  from './brick'
import Ball  from './ball'
import Paddle from './paddle'

class BrickBreaker {
    constructor() {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.score = 0
        this.initializeEntities()
    }

    initializeEntities() {
        this.ball = new Ball(200,-500, 5, 'white')
        this.paddle = new Paddle(100, 10, 200, -505, 'white')
        this.bricks = []
        let x = 0
        let y = 0

        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 8; col++) {
                x+= 100
                let brick = new Brick(this.ctx, 100, 50, 'red', x, y)
                this.bricks.push(brick)
            }
            y-= 50
        }
    }

    updateEntities() {

    }

    detectCollisions() {
        
    }

    update() {
        this.updateEntities()
        this.detectCollisions()
    }

    render() {
        // Draw all entities here - ball, paddle, bricks
        this.ball.render()
        this.paddle.render()
    }

    run() {
       this.update()
       this.render()
    }

    start() {
        // interval loop where you run this.run()
        setInterval(this.run(), 1000 / 60);
    }

}

new BrickBreaker().start()

/*
notes:
phases:
    1. initialize
    2. run phase
        1. update - movement & collision detection
        2. draw
    3.


*/