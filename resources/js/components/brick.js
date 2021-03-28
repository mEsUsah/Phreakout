import {detectCollision} from "./collisionDetection";
export default class Brick {
    constructor(game,position){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;
        this.image = document.getElementById("img_brick--green");

        this.position = position;
        this.width = 80;
        this.height = 60;

        this.markedForDeletion = false;
    }

    update(deltatime, lastTime){
        let collision = detectCollision(this.game.ball, this);
        if(collision){
            console.log(this.game.ball.lastDirectionChange);
            console.log(lastTime);
            switch(collision){
                case "top":
                    if(lastTime > this.game.ball.lastDirectionChange + 1){
                        this.game.ball.direction.y = false;
                        this.game.ball.lastDirectionChange = lastTime;
                    }
                    this.markedForDeletion = true;
                    break;
                case "bottom":
                    if(lastTime > this.game.ball.lastDirectionChange + 1){
                        this.game.ball.direction.y = true;
                        this.game.ball.lastDirectionChange = lastTime;
                    }
                    this.markedForDeletion = true;
                    break;
                case "left":
                    if(lastTime > this.game.ball.lastDirectionChange + 1){
                        this.game.ball.direction.x = true;
                        this.game.ball.lastDirectionChange = lastTime;
                    }
                    this.markedForDeletion = true;
                    break;
                case "right":
                    if(lastTime > this.game.ball.lastDirectionChange + 1){
                        this.game.ball.direction.x = false;
                        this.game.ball.lastDirectionChange = lastTime;
                    }
                    this.markedForDeletion = true;
                    break;
            }
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}