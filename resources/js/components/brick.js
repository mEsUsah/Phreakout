import {detectCollision} from "./collisionDetection";
export default class Brick {
    constructor(game,position){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;
        this.image = document.getElementById("img_brick--green");
        this.speed = {
            x: 6,
            y: 6,
        };
        this.position = position;
        this.width = 80;
        this.height = 24;

    }

    update(){
        if(detectCollision(this.game.ball, this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}