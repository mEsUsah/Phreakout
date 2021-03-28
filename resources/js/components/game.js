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

        let bricks = [];
        for( let i=0; i<10; i++){
            bricks.push(new Brick(this, {x: i*52,y:30}));
        }

        this.gameObjects = [
            this.ball,
            this.paddle,
            ...bricks
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
