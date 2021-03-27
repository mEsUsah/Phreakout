export default class Ball {
    constructor(gameWidht, gameHeight){
        this.gameWidth = gameWidht;
        this.gameHeight = gameHeight;
        this.image = document.getElementById("img_ball");
        this.speed = {
            x: 2,
            y: 2,
        };
        this.position = {
            x: 10,
            y: 10,
        }
        this.size = 20;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltatime){
        this.position.x += this.speed.x; 
        this.position.y += this.speed.y; 

    }
}