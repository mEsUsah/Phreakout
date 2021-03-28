import Paddle from './paddle';
import InputHandler from './input';
import Ball from './ball';
import Brick from './brick';


export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start(){
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        let brick = new Brick(this, {x: 10, y: 20});


        this.gameObjects = [
            this.ball,
            this.paddle,
            brick
        ]
    
        new InputHandler(this.paddle);
    }

    update(deltatime){
        this.gameObjects.forEach(object => object.update(deltatime));
    }

    draw(ctx){
        this.gameObjects.forEach(object => object.draw(ctx));
    }

}
