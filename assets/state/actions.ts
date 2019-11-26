import { Immutable } from './state';

export enum ActionType {
  CONCEDE = 'CONCEDE',
  SELECT_PIECE = 'SELECT_PIECE',
  MOVE_PIECE = 'MOVE_PIECE'
}

export const concede = (props: Immutable<ReducerActionProps>): Immutable<ReducerAction> => ({
  type: ActionType.CONCEDE,
  ...props,
});

export const selectPiece = (props: Immutable<ReducerActionProps>): Immutable<ReducerAction> => ({
  type: ActionType.SELECT_PIECE,
  ...props,
});

export const movePiece = (props: Immutable<ReducerActionProps>): Immutable<ReducerAction> => ({
  type: ActionType.MOVE_PIECE,
  ...props,
});

export interface ReducerAction extends ReducerActionProps {
  readonly type: ActionType;
}

interface ReducerActionProps {
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
  readonly moveToCoord: number[];
  readonly selectedPiece: number[];
  readonly coordContent: coordContent;
}

export type activePlayer = 'red' | 'black';

export type coordContent = 'r' | 'b' | 1;
