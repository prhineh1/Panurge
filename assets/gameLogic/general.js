/**
 * Returns an array of the possible moves or an empty array if none are available.
 * @param {number[][]} boardState - current state of game board
 * @param {number[]} coord - coordinates of currently selected piece coord[0]=rank coord[1]=file
 * @param {string} color - current color's turn
 */
export const movable = (boardState, coord, color) => {
    // by default red moves up (+1)
    if (color === 'r') {
        // at end of board
       if (boardState[coord[0]+1] === undefined) {
           return [[]];
       }

       const redMoveRight = boardState[coord[0]+1][coord[1]+1];
       const redMoveLeft = boardState[coord[0]+1][coord[1]-1];

       // can move either right or left
       if (redMoveRight === 1 && redMoveLeft === 1) {
            return [[coord[0]+1, coord[1]+1], [coord[0]+1, coord[1]-1]];
        }

        // can only move right
       if (redMoveRight === 1) {
           return [[coord[0]+1, coord[1]+1]]
        }

        // can only move left
       if (redMoveLeft === 1) {
            return [[coord[0]+1, coord[1]-1]];
       }

       return [[]];
    }
    // by default black moves down (-1)
    if (boardState[coord[0]-1] === undefined) {
        return[[]];
    }

    const blackMoveRight = boardState[coord[0]-1][coord[1]+1];
    const blackMoveLeft = boardState[coord[0]-1][coord[1]-1];

    if (blackMoveRight === 1 && blackMoveLeft === 1) {
        return [[coord[0]-1, coord[1]+1], [coord[0]-1, coord[1]-1]];
    }
    if (blackMoveRight === 1) {
        return [[coord[0]-1, coord[1]+1]];
    }
    if (blackMoveLeft === 1) {
        return [[coord[0]-1, coord[1]-1]];
    }

    return [[]];
};
