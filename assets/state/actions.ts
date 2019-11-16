export const concede = (player) => ({
  type: 'CONCEDE',
  player,
});

export const selectPiece = (board, coord, player) => ({
  type: 'SELECT_PIECE',
  board,
  coord,
  player,
});

export const movePiece = (board, toCoords, selectedPiece, player) => ({
  type: 'MOVE_PIECE',
  board,
  toCoords,
  selectedPiece,
  player,
});

export interface ReducerAction {
  readonly type: string;
}
