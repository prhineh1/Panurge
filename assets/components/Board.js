import React from 'react';
import Position from './Position';

export default class Game extends React.Component {
    render() {
        return (
            <div className="board">
                {this.props.boardState.map((rank, rankIndex) =>
                    rank.map((content, fileIndex) => {
                        let cases =
                            (this.props.turn === 'black' && content === 'b') ||
                            (this.props.turn === 'red' && content === 'r');
                        return cases
                          ? (
                            <Position key={fileIndex}
                                coord={[rankIndex, fileIndex]}
                                content={content}
                                selected={this.props.selected}
                            />
                        ) : (
                            <Position key={fileIndex}
                                coord={[rankIndex, fileIndex]}
                                content={content}
                                toMoveTo={[[3,4], [3,2]]
                                    .reduce((acc, cur) => acc.concat(cur), [])
                                    .filter((coord, index, coordList) => {
                                        if (index < coordList.length - 1 && index % 2 === 0) {
                                            return coordList[index] === rankIndex && coordList[index+1] === fileIndex
                                        }
                                        if (index > 0 && index % 2 !== 0) {
                                            return coordList[index-1] === rankIndex && coordList[index] === fileIndex
                                        }
                                    })
                                }
                            />
                        )
                    })
                )}
            </div>
        )
    }
}
