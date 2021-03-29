import Paddle from './paddle';
import InputHandler from './input';
import Ball from './ball';
import Brick from './brick';
import {buildLevel, levels} from './levels';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    NEWLEVEL: 3,
    GAMEOVER: 4,
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
        this.score = 0;

        this.levels = levels;
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);
    }

    start(){
        if(this.gamestate !== GAMESTATE.MENU 
            && this.gamestate !== GAMESTATE.NEWLEVEL
            && this.gamestate !== GAMESTATE.GAMEOVER
        ) return;

        if(this.gamestate == GAMESTATE.GAMEOVER){
            this.lives = 3;
            this.score = 0;
            this.currentLevel = 0;
        }

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();

        this.gameObjects = [
            this.ball,
            this.paddle,
        ]
        this.gamestate = GAMESTATE.RUNNING;
    }

    update(deltatime, lastTime){
        if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
        if(this.gamestate === GAMESTATE.PAUSED 
            || this.gamestate === GAMESTATE.MENU
        ) return;
        
        let destructables = 0;
        this.bricks.forEach(brick => {
            if(brick.breakable) destructables++;
        });

        if(destructables === 0){
            this.currentLevel++;
            if(this.currentLevel > this.levels.length-1){
                this.gamestate = GAMESTATE.GAMEOVER;
            } else{
                this.gamestate = GAMESTATE.NEWLEVEL;
                this.start();
            }

        }

        if(this.gamestate == GAMESTATE.RUNNING){
            [...this.gameObjects, ...this.bricks].forEach(object => object.update(deltatime, lastTime));
            this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
        }
    }

    draw(ctx){
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
        if(this.gamestate == GAMESTATE.RUNNING){

            ctx.font = "10px Arial";
            ctx.fillStyle="black";
            ctx.textAlign = "left";
            ctx.fillText("Score: " + this.score, 20, this.gameHeight-20);
            
            ctx.textAlign = "right";
            ctx.fillText(this.lives + " Lives", this.gameWidth - 20, this.gameHeight-20);
        }

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
            ctx.fillStyle="#FF5000";
            ctx.font = "80px Arial";
            ctx.fillText("PHREAKOUT!", this.gameWidth/2, this.gameHeight/3);
            ctx.font = "40px Arial";
            ctx.fillText("A clone by Stanley Skarshaug", this.gameWidth/2, (this.gameHeight/3)*2);
        }
        
        // Game Over 
        if(this.gamestate == GAMESTATE.GAMEOVER){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "60px Arial";
            ctx.fillStyle="white";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", this.gameWidth/2, this.gameHeight/2);
            ctx.font = "30px Arial";
            ctx.fillText("Score: " + this.score, this.gameWidth/2, this.gameHeight/3);
            ctx.fillText("Press SPACEBAR to retry", this.gameWidth/2, (this.gameHeight/3)*2);
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
