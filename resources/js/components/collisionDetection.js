export function detectCollision(ballObject, gameObject){
    // Check collistion with the object
    let ball = {
        top: ballObject.position.y,
        bottom: ballObject.position.y + ballObject.size,
        left: ballObject.position.x,
        right: ballObject.position.x + ballObject.size,
    }
    let object = {
        top: gameObject.position.y,
        bottom: gameObject.position.y + gameObject.height,
        left: gameObject.position.x,
        right: gameObject.position.x + gameObject.width,
    }

    
    
    if(    ball.top <= object.bottom 
        && ball.bottom >= object.top 
        && ball.right >= object.left
        && ball.left <= object.right
    ){
        let returnString = "";
        if(    ball.right   >=  object.left 
            && ball.left    <   object.left 
            && (ball.bottom >=  object.top 
                || ball.top <= object.bottom)
        ){
            returnString = "left";
        }
        
        else if(ball.left       <=  object.right
            &&  ball.right      >   object.right
            &&  (ball.bottom    >=  object.top 
                ||  ball.top    <=  object.bottom)
        ){
            returnString = "right";
        }

        else if(ball.bottom     >=  object.top 
            &&  ball.top        <   object.top
            &&  (ball.right     >=  object.left 
                ||  ball.left   <=  object.right)
        ){
            returnString = "top";
        }

        else if(ball.top        <=  object.bottom 
            &&  ball.bottom     >   object.bottom
            &&  (ball.right     >=  object.left 
                ||  ball.left   <=  object.right)
        ){
            returnString = "bottom";
        }
        return returnString; 
    } else {
        return false;
    }
}