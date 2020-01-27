import { movable } from '../gameLogic/general';
import {
  GameState,
  Immutable,
  ReducerAction,
  Concede,
  SelectPiece,
  MovePiece,
  ActionType,
  Move,
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
        canMoveTo: movable(updates.board,
          updates.selectedPiece,
          updates.coordContent,
          state.attacked),
        selectedPiece: updates.selectedPiece,
      };

    case ActionType.MOVE_PIECE: {
      updates = action.movePiece as Immutable<MovePiece>;
      const [move] = updates.moveToCoord;
      const selectedPieceRow = updates.selectedPiece[0];
      const selectedPieceColumn = updates.selectedPiece[1];
      const newPiece = updates.coordContent;
      let attacked = false;
      let newCoord: number[] = [];
      let stillAttacking: Immutable<Move[]> = [];

      const newBoard = updates.board.map((row, i) => {
        // move selected piece
        if (i === move.coords[0]) {
          return row.map((column, j) => {
            if (j === move.coords[1]) {
              newCoord = newCoord.concat(i, j);
              return newPiece;
            }
            return column;
          });
        }
        // replace with empty space
        if (i === selectedPieceRow) {
          return row.map((column, j) => ((j === selectedPieceColumn) ? 1 : column));
        }
        // remove attacked piece
        if (i === move.attack[0]) {
          attacked = true;
          return row.map((column, j) => ((j === move.attack[1]) ? 1 : column));
        }
        return row;
      });

      // if player attacked check if any more attacks are available
      if (attacked) {
        stillAttacking = movable(
          newBoard,
          newCoord,
          newPiece,
          attacked,
        );
      }

      return {
        ...state,
        boardState: newBoard,
        canMoveTo: stillAttacking.length ? stillAttacking : [],
        selectedPiece: stillAttacking.length ? newCoord : [],
        blacksTurn: stillAttacking.length ? state.blacksTurn : !state.blacksTurn,
        attacked: !!stillAttacking.length,
      };
    }

    default:
      return state;
  }
};

export default reducer;
