import React from 'react';
import Position from './Position';

export default class Game extends React.Component {
    render() {
        return (
            <div className="board">
            {props.boardState.map((rank, rankIndex) =>
                rank.map((content, fileIndex) => {
                    switch([props.turn, content]) {
                        case ['black', 'b']:
                            return <Position key={fileIndex}
                                        coord={[rankIndex, fileIndex]}
                                        content={content}
                                        onClick={props.selected}
                                    />
                        case ['red', 'r']:
                            return <Position key={fileIndex}
                                        coord={[rankIndex, fileIndex]}
                                        content={content}
                                        onClick={props.selected}
                                    />
                        default:
                            return <Position key={fileIndex}
                                        coord={[rankIndex, fileIndex]}
                                        content={content}
                                    />
                    };
                })
            )}
        </div>
        )
    }
}
