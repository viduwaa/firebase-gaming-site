import { STAGE_HEIGHT,STAGE_WIDTH,TETROMINOS } from "./setup";

export const createStage = () => {
    return Array.from(Array(STAGE_HEIGHT),()=>Array.from((Array(STAGE_WIDTH)),()=>[0,'clear']));
}

export const randomTetromino = () => {
    const tetrominos = ['I','J','L','O','S','T','Z'];
    const randomTetromino = tetrominos[Math.floor(Math.random()*tetrominos.length)];
    return TETROMINOS[randomTetromino];
}