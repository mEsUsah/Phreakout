import Paddle from './paddle';
import InputHandler from './input';
import Ball from './ball';
import Brick from './brick';
import {buildLevel, level1} from './levels';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
}


export default class Game{
    constructor(gameWidth, gameHeight){
        this.gameObjects = [];
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gamestate = GAMESTATE.MENU;
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.bricks = [];
        this.lives = 3;

        new InputHandler(this.paddle, this);
    }

    start(){
        if(this.gamestate !== GAMESTATE.MENU) return;

        this.bricks = buildLevel(this, level1);

        this.gameObjects = [
            this.ball,
            this.paddle,
        ]
        this.gamestate = GAMESTATE.RUNNING;
    }

    update(deltatime){
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
        if(this.gamestate === GAMESTATE.PAUSED 
            || this.gamestate === GAMESTATE.MENU
            || this.gamestate === GAMESTATE.GAMEOVER
        ) return;

        if(this.bricks.length === 0){
            console.log("new level");
        }


        [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltatime));
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }

    draw(ctx){
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

        // PAUSE SCREEN
        if(this.gamestate == GAMESTATE.PAUSED){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle="white";
            ctx.textAlign = "center";
            ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
        }

        // MAIN MENU
        if(this.gamestate == GAMESTATE.MENU){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle="white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to start", this.gameWidth/2, this.gameHeight/2);
        }
        
        // Game Over 
        if(this.gamestate == GAMESTATE.GAMEOVER){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "30px Arial";
            ctx.fillStyle="white";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", this.gameWidth/2, this.gameHeight/2);
        }
    }

    togglePause(){
        // GameStates
        if(this.gamestate == GAMESTATE.PAUSED){
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }

}
