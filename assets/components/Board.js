import React from 'react';
import Position from './Position';

export default class Game extends React.Component {
    render() {
        return (
            <div className="board">
            {this.props.boardState.map((rank, rankIndex) =>
                rank.map((content, fileIndex) => {
                    switch([this.props.turn, content]) {
                        case ['black', 'b']:
                            return <Position key={fileIndex}
                                        coord={[rankIndex, fileIndex]}
                                        content={content}
                                        onClick={this.props.selected}
                                    />
                        case ['red', 'r']:
                            return <Position key={fileIndex}
                                        coord={[rankIndex, fileIndex]}
                                        content={content}
                                        onClick={this.props.selected}
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
