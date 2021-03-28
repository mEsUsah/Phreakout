import { detectCollision} from './collisionDetection';
export default class Ball {
    constructor(game){
        this.game = game;
        this.image = document.getElementById("img_ball");
         
        this.lastDirectionChange = 0;

        this.speed = 4;

        this.size = 20;
        this.reset();
    }

    reset(){
        this.position = {
            x: 10,
            y: this.game.gameHeight -40,
        }
        this.direction = {
            x: false, 
            y: false, 
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this. position.x, this.position.y, this.size, this.size);
    }

    update(deltatime){
        if (this.direction.y){
            this.position.y = this.position.y + this.speed;
        } else {
            this.position.y = this.position.y - this.speed
        }

        if (this.direction.x){
            this.position.x = this.position.x - this.speed;
        } else {
            this.position.x = this.position.x + this.speed
        }



        // Hit wall on left or right of the screen
        if(this.position.x + this.size > this.game.gameWidth || this.position.x < 0){
            if(this.direction.x){
                this.direction.x = false;
            } else {
                this.direction.x = true;
            }
        }

        // Hit wall on top of the screen
        if(this.position.y < 0){
            this.direction.y = true;
        }
        // Hit bootm of the screen - loss of life.
        if(this.position.y + this.size > this.game.gameHeight ){
            this.game.lives--;
            this.reset();
        }

        if(detectCollision(this, this.game.paddle)){
            this.direction.y = false;
        }
    }
}