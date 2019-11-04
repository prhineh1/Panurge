import React, { useReducer } from 'react';
import Board from './Board';
import OptionsPanel from './OptionsPanel';
import initialState from '../state/state';
import reducer from '../state/reducer';
import { concede, selectPiece, movePiece } from '../state/actions';

const Game = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // reducer actions
    const actions = {
        selectPiece: coord => dispatch(selectPiece(state.boardState, coord, state.blacksTurn ? 'b' : 'r')),
        movePiece: toCoords => dispatch(movePiece(state.boardState, toCoords, state.selectedPiece, state.blacksTurn ? 'b' : 'r')),
        concede: activePlayer => dispatch(concede(activePlayer))
    };

    const turn = state.blacksTurn ? 'black' : 'red';
    return (
        <div className="game-wrapper">
            <Board 
                turn={turn}
                boardState={state.boardState}
                selected={actions.selectPiece}
                canMoveTo={state.canMoveTo}
                move={actions.movePiece}
            />
            <OptionsPanel 
                concede={actions.concede}
                turn={turn}
                players={{ red: state.red, black: state.black }}
            />
        </div>
    )
}

export default Game;