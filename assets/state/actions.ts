import { ActionType, Immutable, ReducerAction, ReducerActionProps } from '../types';

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

