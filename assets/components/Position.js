import React from 'react';
import redChecker from '../imgs/red_checker.svg';
import blackChecker from '../imgs/black_checker.svg';

const Position = (props) =>
    props.content === 1 ? (
        <div onClick={!!props.move && props.move(props.coord)}></div>
    ) : (
        <div>
            <img className="piece"
                onClick={props.selected(props.coord, props.content)}
                src={props.content === 'r' ? redChecker : blackChecker}
                alt={props.content === 'r' ? "red checker piece" : "black checker piece"}
            />
        </div>
    )

export default Position;