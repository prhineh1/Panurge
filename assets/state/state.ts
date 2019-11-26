import { coordContent } from './actions';

export type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>;
};

export interface GameState {
  red: PlayerState;
  black: PlayerState;
  blacksTurn: boolean;
  canMoveTo: number[][];
  selectedPiece: number[];
  boardState: coordContent[][];
}

export interface PlayerState {
  concede: boolean;
  lost: number;
}

const initialState: GameState = {
  red: { concede: false, lost: 12 },
  black: { concede: false, lost: 12 },
  blacksTurn: true,
  canMoveTo: [[]],
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
