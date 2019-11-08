import { movable } from '../gameLogic/general';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONCEDE':
      return {
        ...state,
        [action.player]: {
          ...state[action.player],
          concede: true,
        },
      };
    case 'SELECT_PIECE':
      return {
        ...state,
        canMoveTo: movable(action.board, action.coord, action.player),
        selectedPiece: action.coord,
      };
    case 'MOVE_PIECE':
      action.board[action.toCoords[0]][action.toCoords[1]] = action.player;
      action.board[action.selectedPiece[0]][action.selectedPiece[1]] = 1;
      return {
        ...state,
        boardState: action.board,
        canMoveTo: [[]],
        selectedPiece: [],
        blacksTurn: !state.blacksTurn,
      };
    default:
      return state;
  }
};

export default reducer;
