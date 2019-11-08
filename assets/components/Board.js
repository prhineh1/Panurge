import React from 'react';
import Position from './Position';
import PropTypes from 'prop-types';

const Board = ({ turn, boardState, selected, canMoveTo, move }) => (
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
          move={canMoveTo.some((moves) => moves[0] === rankIndex && moves[1] === fileIndex) ? move : undefined}
        />
      );
    }))}
  </div>
);
export default Board;
