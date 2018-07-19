import React from 'react';
import Position from './Position';

export default class Game extends React.Component {
    render() {
        return (
            <div className="board">
            {this.props.boardState.map((rank, rankIndex) =>
                rank.map((content, fileIndex) => {
                    let cases =
                        this.props.turn === 'black' && content === 'b' ||
                        this.props.turn === 'red' && content === 'r';
                    return cases ? (
                        <Position key={fileIndex}
                            coord={[rankIndex, fileIndex]}
                            content={content}
                            selected={this.props.selected}
                        />
                     ) : (
                        <Position key={fileIndex}
                            coord={[rankIndex, fileIndex]}
                            content={content}
                        />
                     )
                })
            )}
        </div>
        )
    }
}
