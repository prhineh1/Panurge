export enum ActionType {
    CONCEDE = 'CONCEDE',
    SELECT_PIECE = 'SELECT_PIECE',
    MOVE_PIECE = 'MOVE_PIECE'
  }

export interface ReducerAction extends ReducerActionProps {
    readonly type: ActionType;
  }

export interface ReducerActionProps {
    readonly concede?: Concede;
    readonly selectPiece?: SelectPiece;
    readonly movePiece?: MovePiece;
  }

export interface Concede {
    readonly activePlayer: activePlayer;
  }

export interface SelectPiece {
    readonly board: coordContent[][];
    readonly selectedPiece: number[];
    readonly coordContent: coordContent;
  }

export interface MovePiece {
    readonly board: coordContent[][];
    readonly moveToCoord: Move[];
    readonly selectedPiece: number[];
    readonly coordContent: coordContent;
  }

export type activePlayer = 'red' | 'black';

export type coordContent = 'r' | 'b' | 1;

export type Immutable<T> = {
    readonly [K in keyof T]: Immutable<T[K]>;
  };

export interface GameState {
    red: PlayerState;
    black: PlayerState;
    blacksTurn: boolean;
    canMoveTo: Move[];
    selectedPiece: number[];
    boardState: coordContent[][];
    attacked: boolean;
  }

export interface PlayerState {
    concede: boolean;
    lost: number;
  }

export interface Move {
  coords: number[];
  attack: number[];
}
