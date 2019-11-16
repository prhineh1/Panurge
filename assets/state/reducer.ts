import { movable } from '../gameLogic/general';
import { GameState } from './state';

const reducer = (state: GameState, action): GameState => {
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
    case 'MOVE_PIECE': {
      const newBoard = action.board;
      newBoard[action.toCoords[0]][action.toCoords[1]] = action.player;
      newBoard[action.selectedPiece[0]][action.selectedPiece[1]] = 1;
      return {
        ...state,
        boardState: newBoard,
        canMoveTo: [[]],
        selectedPiece: [],
        blacksTurn: !state.blacksTurn,
      };
    }
    default:
      return state;
  }
};

export default reducer;
