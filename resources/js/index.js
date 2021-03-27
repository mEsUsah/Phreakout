import Paddle from './components/paddle';
import InputHandler from './components/input';
import Ball from './components/ball';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;



let paddle = new Paddle(GAME_WIDTH,GAME_HEIGHT);
let ball = new Ball();

new InputHandler(paddle);

paddle.draw(ctx);

let lastTime = 0;



//Game - Main loop
function gameLoop(timestamp){
    let deltatime = timestamp - lastTime;
    lastTime = timestamp

    ctx.clearRect(0,0,800,600);
    paddle.update(deltatime);
    paddle.draw(ctx);

    ball.draw(ctx);

    



    requestAnimationFrame(gameLoop);
}

gameLoop();