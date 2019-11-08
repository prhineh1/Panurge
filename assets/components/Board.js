import React from 'react';
import Position from './Position';

const Board = (props) => (
<div className="board">
        {props.boardState.map((rank, rankIndex) =>
            rank.map((content, fileIndex) => {
                const cases =
                    (props.turn === 'black' && content === 'b') ||
                    (props.turn === 'red' && content === 'r');
                if (cases) {
                    return <Position key={[rankIndex,fileIndex].toString()}
                                coord={[rankIndex, fileIndex]}
                                content={content}
                                selected={props.selected}
                            />
                } else {
                    return <Position key={[rankIndex,fileIndex].toString()}
                                coord={[rankIndex, fileIndex]}
                                content={content}
                                selected={undefined}
                                move={props.canMoveTo
                                    .map(moves => moves.filter(move => move[0] === rankIndex && move[1] === fileIndex))
                                    .some(el => el) ? props.move : undefined
                                }
                            />
                }
            })
        )}  </div>
);
export default Board;
