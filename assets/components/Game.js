import React, { useReducer } from 'react';
import Board from './Board';
import OptionsPanel from './OptionsPanel';
import { movable } from '../gameLogic/general';
import initialState from '../state/state';
import reducer from '../state/reducer';
import { concede } from '../state/actions';

const Game = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    selected = (coord, content) => this.setState(() => ({ canMoveTo : movable(this.state.boardState, coord, content), selectedPiece: coord }));

    move = (toCoord) => this.setState((prevState) => {
        let newBoardState, swapOld, swapNew;
        newBoardState = [...prevState.boardState];
        swapOld = newBoardState[this.state.selectedPiece[0]][this.state.selectedPiece[1]];
        swapNew = newBoardState[toCoord[0]][toCoord[1]];
        newBoardState[toCoord[0]][toCoord[1]] = swapOld;
        newBoardState[this.state.selectedPiece[0]][this.state.selectedPiece[1]] = swapNew;
        return {
            boardState: newBoardState,
            canMoveTo: [[]],
            blacksTurn: !prevState.blacksTurn,
            selectedPiece: []
        };
    });

    return (
        <div className="game-wrapper">
            <Board 
                turn={this.state.blacksTurn ? 'black' : 'red'}
                boardState={this.state.boardState}
                selected={this.selected}
                canMoveTo={this.state.canMoveTo}
                move={this.move}
            />
            <OptionsPanel concede={(activePlayer) => dispatch(concede(activePlayer))}
                turn={state.blacksTurn ? 'black' : 'red'}
                players={{ red: state.red, black: state.black }}
            />
        </div>
    )
}

export default Game;