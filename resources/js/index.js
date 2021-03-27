import Paddle from './components/paddle';
import InputHandler from './components/input';
import Ball from './components/ball';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;



let paddle = new Paddle(GAME_WIDTH,GAME_HEIGHT);
let ball = new Ball(GAME_WIDTH,GAME_HEIGHT);

new InputHandler(paddle);

paddle.draw(ctx);

let lastTime = 0;



//Game - Main loop
function gameLoop(timestamp){
    let deltatime = timestamp - lastTime;
    lastTime = timestamp

    ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    paddle.update(deltatime);
    paddle.draw(ctx);

    ball.update(deltatime);
    ball.draw(ctx);

    
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);