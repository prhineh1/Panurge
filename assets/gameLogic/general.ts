import { coordContent, Immutable, Move } from '../types';

/**
 * Returns an array of the possible moves/attacks or an empty array if none are available.
 * @param boardState current state of game board
 * @param coord coordinates of currently selected piece coord[0]=rank coord[1]=file
 * @param color current color's turn
 */
export const movable = (
  boardState: Immutable<coordContent[][]>,
  coord: Immutable<number[]>,
  color: coordContent,
  attack: boolean,
): Immutable<Move[]> => {
  const player = {
    move: color === 'r' ? coord[0] + 1 : coord[0] - 1,
    attack: color === 'r' ? coord[0] + 2 : coord[0] - 2,
    opposite: color === 'r' ? 'b' : 'r',
  };
  const moveRight = boardState[player.move]?.[coord[1] + 1];
  const attackRight = boardState[player.attack]?.[coord[1] + 2];
  const moveLeft = boardState[player.move]?.[coord[1] - 1];
  const attackLeft = boardState[player.attack]?.[coord[1] - 2];
  let moves: Immutable<Move[]> = [];

  // move right
  if (moveRight === 1 && !attack) {
    moves = moves.concat([{
      coords: [player.move, coord[1] + 1],
      attack: [],
    }]);
  }

  // attack right
  if (moveRight === player.opposite && attackRight === 1) {
    moves = moves.concat([{
      coords: [player.attack, coord[1] + 2],
      attack: [player.move, coord[1] + 1],
    }]);
  }

  // move left
  if (moveLeft === 1 && !attack) {
    moves = moves.concat([{
      coords: [player.move, coord[1] - 1],
      attack: [],
    }]);
  }

  // attack left
  if (moveLeft === player.opposite && attackLeft === 1) {
    moves = moves.concat([{
      coords: [player.attack, coord[1] - 2],
      attack: [player.move, coord[1] - 1],
    }]);
  }

  return moves;
};
