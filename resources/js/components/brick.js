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
        this.height = 60;

        this.markedForDeletion = false;
    }

    update(){
        let collision = detectCollision(this.game.ball, this);
        if(collision){
            console.log(this.game.ball.direction);
            switch(collision){
                case "top":
                    console.log(this.game.ball);
                    this.game.ball.direction.y = true;
                    this.markedForDeletion = true;
                    break;
                case "bottom":
                    this.game.ball.direction.y = false;
                    this.markedForDeletion = true;
                    break;
                case "left":
                    this.game.ball.direction.x = true;
                    this.markedForDeletion = true;
                    break;
                case "right":
                    this.game.ball.direction.x = false;
                    this.markedForDeletion = true;
                    break;
            }
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}