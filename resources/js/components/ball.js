import { detectCollision} from './collisionDetection';
export default class Ball {
    constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;
        this.image = document.getElementById("img_ball");
        this.speed = {
            x: 4,
            y: -4,
        };
        this.position = {
            x: game.gameWidth/2,
            y: game.gameHeight - 100,
        }
        this.size = 20;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltatime){
        this.position.x += this.speed.x; 
        this.position.y += this.speed.y; 

        // Hit wall on left or right of the screen
        if(this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        // Hit wall on the bottom or top of the screen
        if(this.position.y + this.size > this.gameHeight || this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        if(detectCollision(this, this.game.paddle)){
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}