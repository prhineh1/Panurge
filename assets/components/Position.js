import React from 'react';
import redChecker from '../imgs/red_checker.svg';
import blackChecker from '../imgs/black_checker.svg';

const Position = (props) =>
    props.content === 1 ? (
        <div></div>
    ) : (
        <div>
            <img className="piece"
                onClick={props.selected}
                src={props.content === 'r' ? redChecker : blackChecker}
                alt={props.content === 'r' ? "red checker piece" : "black checker piece"}
            />
        </div>
    )

export default Position;