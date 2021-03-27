export default class Paddle{
    constructor(gameWidth, gameHeight){
        this.width = 150;
        this.height = 30;
        this.position = {
            x: gameWidth/2 - this.width/2,
            y: gameHeight - this.height - 10,
        }
        this.maxSpeed = 7;
        this.speed = 0;
    }

    moveLeft(){
        this.speed = -this.maxSpeed;
    }
    moveRight(){
        this.speed = this.maxSpeed;
    }

    draw(ctx){
        ctx.fillStyle = "#0ff";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(deltatime){
        if(!deltatime) return;
        this.position.x += 5 / deltatime;
        this.position.x += this.speed;
    }
}