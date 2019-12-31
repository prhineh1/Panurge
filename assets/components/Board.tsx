import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import Position from './Position';
import { activePlayer, coordContent, Immutable } from '../types';

interface BoardProps {
  turn: activePlayer;
  boardState: Immutable<coordContent[][]>;
  selected: (coord: Immutable<number[]>) => void;
  canMoveTo: Immutable<number[][]>;
  move: (toCoords: Immutable<number[]>) => void;
  selectedPiece: Immutable<number[]>;
}

const Board: React.FC<BoardProps> = ({
  turn, boardState, selected, canMoveTo, move, selectedPiece,
}): ReactElement => (
  <div className="board">
    {boardState.map((rank, rankIndex) => rank.map((content, fileIndex) => {
      const cases = (turn === 'black' && content === 'b')
                    || (turn === 'red' && content === 'r');
      if (cases) {
        return (
          <Position
            key={[rankIndex, fileIndex].toString()}
            coord={[rankIndex, fileIndex]}
            content={content}
            selected={selected}
            selectedPiece={selectedPiece[0] === rankIndex && selectedPiece[1] === fileIndex}
          />
        );
      }
      return (
        <Position
          key={[rankIndex, fileIndex].toString()}
          coord={[rankIndex, fileIndex]}
          content={content}
          move={
            canMoveTo.some((moves) => moves[0] === rankIndex && moves[1] === fileIndex)
              ? move
              : undefined
          }
        />
      );
    }))}
  </div>
);

Board.propTypes = {
  turn: PropTypes.oneOf<activePlayer>(['black', 'red']).isRequired,
  boardState: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOf<coordContent>(['b', 'r', 1]).isRequired).isRequired).isRequired,
  selected: PropTypes.func.isRequired,
  canMoveTo:
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number.isRequired).isRequired).isRequired,
  move: PropTypes.func.isRequired,
  selectedPiece: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default Board;
