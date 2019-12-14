import { movable } from '../gameLogic/general';
import {
  GameState,
  Immutable,
  ReducerAction,
  Concede,
  SelectPiece,
  MovePiece,
  ActionType,
} from '../types';

const reducer = (
  state: Immutable<GameState>,
  action: Immutable<ReducerAction>,
): Immutable<GameState> => {
  let updates;
  switch (action.type) {
    case ActionType.CONCEDE:
      updates = action.concede as Immutable<Concede>;
      return {
        ...state,
        [updates.activePlayer]: {
          ...state[updates.activePlayer],
          concede: true,
        },
      };

    case ActionType.SELECT_PIECE:
      updates = action.selectPiece as Immutable<SelectPiece>;
      return {
        ...state,
        canMoveTo: movable(updates.board, updates.selectedPiece, updates.coordContent),
        selectedPiece: updates.selectedPiece,
      };

    case ActionType.MOVE_PIECE: {
      updates = action.movePiece as Immutable<MovePiece>;
      const moveToRow = updates.moveToCoord[0];
      const moveToColumn = updates.moveToCoord[1];
      const selectedPieceRow = updates.selectedPiece[0];
      const selectedPieceColumn = updates.selectedPiece[1];
      const newPiece = updates.coordContent;

      const newBoard = updates.board.map((row, i) => {
        if (i === moveToRow) {
          return row.map((column, j) => ((j === moveToColumn) ? newPiece : column));
        }
        if (i === selectedPieceRow) {
          return row.map((column, j) => ((j === selectedPieceColumn) ? 1 : column));
        }
        return row;
      });
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
