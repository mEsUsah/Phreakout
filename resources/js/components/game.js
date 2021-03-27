import Paddle from './paddle';
import InputHandler from './input';
import Ball from './ball';


export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start(){
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
    
        new InputHandler(this.paddle);
    }

    update(deltatime){
        this.paddle.update(deltatime);
        this.ball.update(deltatime);
    }

    draw(ctx){
        this.paddle.draw(ctx);
        this.ball.draw(ctx);

    }

}
