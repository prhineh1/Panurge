import { GameState, Immutable } from '../types';

const initialState: Immutable<GameState> = {
  red: { concede: false, lost: 12 },
  black: { concede: false, lost: 12 },
  blacksTurn: true,
  canMoveTo: [],
  selectedPiece: [],
  boardState: [
    [1, 'r', 1, 'r', 1, 'r', 1, 'r'],
    ['r', 1, 'r', 1, 'r', 1, 'r', 1],
    [1, 'r', 1, 'r', 1, 'r', 1, 'r'],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    ['b', 1, 'b', 1, 'b', 1, 'b', 1],
    [1, 'b', 1, 'b', 1, 'b', 1, 'b'],
    ['b', 1, 'b', 1, 'b', 1, 'b', 1],
  ],
};

export default initialState;
