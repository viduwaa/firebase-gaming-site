export const Block  ={
    I : 'I',
    J : 'J',
    L : 'L',
    O : 'O',
    S : 'S',
    T : 'T',
    Z : 'Z',
  }
  
export const EmptyCell ={
    Empty : 'Empty',
  }

export const CellOptions = Block || EmptyCell;


export const SHAPES = {
    I: {
      shape: [
        [false, false, false, false],
        [false, false, false, false],
        [true, true, true, true],
        [false, false, false, false],
      ],
    },
    J: {
      shape: [
        [false, false, false],
        [true, false, false],
        [true, true, true],
      ],
    },
    L: {
      shape: [
        [false, false, false],
        [false, false, true],
        [true, true, true],
      ],
    },
    O: {
      shape: [
        [true, true],
        [true, true],
      ],
    },
    S: {
      shape: [
        [false, false, false],
        [false, true, true],
        [true, true, false],
      ],
    },
    T: {
      shape: [
        [false, false, false],
        [false, true, false],
        [true, true, true],
      ],
    },
    Z: {
      shape: [
        [false, false, false],
        [true, true, false],
        [false, true, true],
      ],
    },
  };
  