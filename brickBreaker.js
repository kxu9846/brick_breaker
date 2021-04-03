class BrickBreaker {
    constructor() {
        this.canvas = document.getElementById('canvas')
        this.ctx = this.canvas.getContext('2d')
        this.score = 0
        this.initializeEntities()
    }

    initializeEntities() {
        this.ball = new Ball(this.ctx, this.canvas.width/2,545, 7, '#FFF', 10, 5, 5)
        this.paddle = new Paddle(this.ctx, 100, 10, 155, 550, 'grey')
        this.bricks = new Array(5).fill(new Array(8).fill([]))

        const colors = ['red', 'blue', 'green', 'yellow', 'purple']

        let y = 0
        for (let row = 0; row < 5; row++) {
            let x = 0
            for (let col = 0; col < 8; col++) {
                let color = colors[row]
                console.log("x, y, and color: ", x, y, color)
                console.log("array row and col: ", row, col)
                let brick = new Brick(this.ctx, x, y, 50, 25, color)
                x+=50
                this.bricks[row][col] = brick
                console.log("current brick before pushing to array", this.bricks[row][col])
                console.log("brick array", this.bricks)
                console.log("key into array for current brick value", this.bricks[row][col])
            }
            y+=25
        }
    }

    detectKeyPressed() {
        window.addEventListener('keyDown', this.keyUpHandler);
        window.addEventListener('keyUp', this.keyDownHandler);
    }

    keyUpHandler() {
        switch (key) {
            case 37:
              this.leftArrowPressed = true;
              break;
            case 39:
              this.rightArrowPressed = true;
              break;
        }
    }

    keyDownHandler() {
        switch (key) {
            case 37:
              this.leftArrowPressed = false;
              break;
            case 39:
              this.rightArrowPressed = false;
              break;
        }
    }
    updateEntities() {
        //if leftArrow pressed, paddle's x value decreases
        if (this.leftArrowPressed && this.paddle.x > 0) {
            this.paddle.x -= 8
        }
        //if rightArrowPressed, paddle's x value increases
        else if (this.rightArrowPressed && this.paddle.x < this.canvas.wdith) {
            this.paddle.x += 8
        }
    }

    detectPaddleCollision() {
        // if paddle hits ball, ball moves in opposite direction, velocity increases
        const paddleTop = this.paddle.y
        const paddleBottom = this.paddle.x + this.paddle.width
        const paddleLeft = this.paddle.x
        const paddleRight = this.paddle.y + this.paddle.height

        const ballTop = this.ball.y - this.ball.radius
        const ballBottom = this.ball.x + this.ball.radius
        const ballLeft = this.ball.x - this.ball.radius
        const ballRight = this.ball.y + this.ball.radius

        if (paddleTop === ballBottom) {
            if (paddleLeft <= ballLeft && paddleRight >= ballRight) {
                this.ball.velocityY = -this.ball.velocityY
            }
        }
        
    }

    detectBrickCollisions() {
        // if ball hits brick, 1. brick breaks, score +=1, ball direction changes, velocity increases
    }

    detectCanvasCollision() {
        // if ball hits canvas edge, 1. direction changes, velocity increases
        const ballTop = this.ball.y - this.ball.radius
        const ballLeft = this.ball.x - this.ball.radius
        const ballRight = this.ball.y + this.ball.radius

        //if ball hits right or left  wall, it moves in opposite direction
        if (ballLeft <= 0 || ballRight >= this.canvas.width) {
            this.ball.velocityX = -this.ball.velocityX
        }
        //if ball hits top wall, it comes back down
        else if (ballTop >= 0) {
            this.ball.velocityY = -this.ball.velocityY
        }
    }

    reset() {
        // reset game
    }

    update() {
        this.detectKeyPressed()
        this.updateEntities()
        this.detectPaddleCollision()
        this.detectBrickCollisions()
        this.detectCanvasCollision()
        this.ball.move()
    }

    render() {
        // Draw all entities here - ball, paddle, bricks
        // console.log("this is bricks", this.bricks)
        for (let row = 0; row < this.bricks.length; row++) {
            for (let col = 0; col < this.bricks[row].length; col++ ) {
                this.bricks[row][col].render()
            }
        }
        this.ball.render()
        this.paddle.render()
    }

    run() {
        console.log("i am in run")
        this.update()
        this.render()
    }

    start() {
        setInterval(this.run.bind(this), 1000 / 60);
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