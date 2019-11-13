import React from 'react';
import PropTypes from 'prop-types';
import Position from './Position';

const Board = ({
  turn, boardState, selected, canMoveTo, move,
}) => (
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
          />
        );
      }
      return (
        <Position
          key={[rankIndex, fileIndex].toString()}
          coord={[rankIndex, fileIndex]}
          content={content}
          selected={undefined}
          move={canMoveTo.some((moves) => moves[0] === rankIndex && moves[1] === fileIndex)
            ? move : undefined}
        />
      );
    }))}
  </div>
);

Board.propTypes = {
  turn: PropTypes.oneOf(['black', 'red']).isRequired,
  boardState: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  selected: PropTypes.func.isRequired,
  canMoveTo: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
};

export default Board;
