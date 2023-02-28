import React, { useReducer, ReactElement } from 'react';
import Board from './Board';
import OptionsPanel from './OptionsPanel';
import initialState from '../state/state';
import reducer from '../state/reducer';
import {
  concede,
  selectPiece,
  movePiece,
} from '../state/actions';
import { Immutable, activePlayer } from '../types';

const Game: React.FC = (): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // reducer actions
  const actions = {
    selectPiece: (coord: Immutable<number[]>): void => dispatch(selectPiece({
      selectPiece: {
        board: state.boardState,
        selectedPiece: coord,
        coordContent: state.blacksTurn ? 'b' : 'r',
      },
    })),
    movePiece: (toCoords: Immutable<number[]>): void => dispatch(movePiece({
      movePiece: {
        board: state.boardState,
        moveToCoord: state.canMoveTo
          .filter((move) => move.coords[0] === toCoords[0] && move.coords[1] === toCoords[1]),
        selectedPiece: state.selectedPiece,
        coordContent: state.blacksTurn ? 'b' : 'r',
      },
    })),
    concede: (player: activePlayer): void => dispatch(concede({
      concede: {
        activePlayer: player,
      },
    })),
  };

  const turn: activePlayer = state.blacksTurn ? 'black' : 'red';
  return (
    <div className="game-wrapper">
      <Board
        turn={turn}
        boardState={state.boardState}
        selected={!state.attacked ? actions.selectPiece : undefined}
        canMoveTo={state.canMoveTo}
        move={actions.movePiece}
        selectedPiece={state.selectedPiece}
      />
      <OptionsPanel
        concede={actions.concede}
        turn={turn}
        red={state.red}
        black={state.black}
      />
    </div>
  );
};

export default Game;
