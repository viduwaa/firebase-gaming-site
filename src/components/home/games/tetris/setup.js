export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
export const ROWPOINTS = [1, 2, 3, 4];

export const TETROMINOS = {
    0: { shape: [[0]], color: '0, 0, 0' },
    I:{
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        color: '#46edc8',
    },
    J:{
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0]
        ],
        color: '#374d7c',
    },
    L:{
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L']
        ],
        color: '#ff5978',
    },
    O:{
        shape: [
            ['O', 'O'],
            ['O', 'O']
        ],
        color: '#fbb35a',
    },
    S:{
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],
        color: '#fdf289',
    },
    T:{
        shape: [
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0]
        ],
        color: '#05ffa1',
    },
    Z:{
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0]
        ],
        color: '#ff5e78',
    }
}