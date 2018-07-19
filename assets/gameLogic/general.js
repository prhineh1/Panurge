//check whether the piece can move
export const movable = (boardState, coords, color) => {
    if (color === 'red') {
       return boardState[coords[0]+1][coords[1]+1] === 1 ||
        boardState[coords[0]+1][coords[1]-1] === 1 ? true : false;
    } else {
        return boardState[coords[0]-1][coords[1]+1] === 1 ||
            boardState[coords[0]-1][coords[1]+1] === 1 ? true : false
    }
};