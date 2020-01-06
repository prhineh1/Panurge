import React, { ReactElement } from 'react';
import PropTypes, { number } from 'prop-types';
import Position from './Position';
import {
  activePlayer,
  coordContent,
  Immutable,
  Move,
} from '../types';

interface BoardProps {
  turn: activePlayer;
  boardState: Immutable<coordContent[][]>;
  selected: (coord: Immutable<number[]>) => void;
  canMoveTo: Immutable<Move[]>;
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
            canMoveTo
              .some((moves) => moves.coords[0] === rankIndex && moves.coords[1] === fileIndex)
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
    PropTypes.arrayOf(PropTypes.shape({
      coords: PropTypes.arrayOf(number.isRequired).isRequired,
      attack: PropTypes.arrayOf(number.isRequired).isRequired,
    }).isRequired).isRequired,
  move: PropTypes.func.isRequired,
  selectedPiece: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default Board;
