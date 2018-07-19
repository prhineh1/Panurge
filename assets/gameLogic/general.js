//check whether the piece can move
export const movable = (boardState, coords, color) => {
    if (boardState[coords[0]-1] === undefined || boardState[coords[0]+1] === undefined) {
        return false;
    }
    if (color === 'r') {
       return (boardState[coords[0]+1][coords[1]+1] === 1 ||
        boardState[coords[0]+1][coords[1]-1] === 1) ? true : false;
    } else {
        return boardState[coords[0]-1][coords[1]+1] === 1 ||
            boardState[coords[0]-1][coords[1]+1] === 1 ? true : false;
    }
};