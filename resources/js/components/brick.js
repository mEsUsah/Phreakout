import {detectCollision} from "./collisionDetection";
export default class Brick {
    constructor(game,type, position){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.health = 0;
        this.breakable = true
        
        this.type = type;
        switch(type){
            case 1:
                this.image = document.getElementById("img_brick--green");
                this.health = 1;
                break
            case 2:
                this.image = document.getElementById("img_brick--yellow");
                this.health = 2;
                break
            case 3:
                this.image = document.getElementById("img_brick--red");
                this.health = 3;
                break
            case 9:
                this.image = document.getElementById("img_brick--gray");
                this.breakable = false;
                break
        }

        this.position = position;
        this.width = 80;
        this.height = 30;

        this.markedForDeletion = false;
    }

    updateHealth(hp){
        if(this.breakable){
            this.health += hp;
            switch(this.health){
                case 2:
                    this.image = document.getElementById("img_brick--yellow");
                    break;
                case 1:
                    this.image = document.getElementById("img_brick--green");
                    break;
            }
            if(this.health <= 0) this.markedForDeletion = true;
        } 
    }

    update(deltatime, lastTime){
        let collision = detectCollision(this.game.ball, this);
        if(collision){
            switch(collision){
                case "top":
                    if(lastTime > this.game.ball.lastDirectionChange + 1){
                        this.game.ball.direction.y = false;
                        this.game.ball.lastDirectionChange = lastTime;
                    }
                    break;
                case "bottom":
                    if(lastTime > this.game.ball.lastDirectionChange + 1){
                        this.game.ball.direction.y = true;
                        this.game.ball.lastDirectionChange = lastTime;
                    }
                    break;
                case "left":
                    if(lastTime > this.game.ball.lastDirectionChange + 1){
                        this.game.ball.direction.x = true;
                        this.game.ball.lastDirectionChange = lastTime;
                    }
                    break;
                case "right":
                    if(lastTime > this.game.ball.lastDirectionChange + 1){
                        this.game.ball.direction.x = false;
                        this.game.ball.lastDirectionChange = lastTime;
                    }
                    break;
            }
            this.updateHealth(-1);
            this.game.score++;
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}