import Brick from './brick';

export function buildLevel(game, level){
    let bricks = [];

    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) =>{
            if(brick >= 1) {
                let type = brick;
                let position = {
                    x: 80*brickIndex,
                    y: 80 + 30*rowIndex,
                }
                bricks.push(new Brick(game, type, position));
            }
        });
    });
    return bricks;
}

export const levels = [
    [
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
    ],[
        [3,3,3,3,3,3,3,3,3,3],
        [2,2,2,2,2,2,2,2,2,2],
        [1,1,1,1,1,1,1,1,1,1],
    ],[
        [0,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,0,0,1,1,1,0],
        [0,1,1,1,0,0,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,0],
    ],[
        [1,1,0,0,1,1,0,0,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
    ]
];