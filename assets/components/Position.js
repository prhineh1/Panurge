import React from 'react';
import redChecker from '../imgs/red_checker.svg';
import blackChecker from '../imgs/black_checker.svg';

const Position = (props) => {
    switch(props.content) {
        case 1:
            return <div></div>
        case 'r':
            return <div><img className="piece" src={redChecker} alt="red checker piece" /></div>
        case 'b':
            return <div><img className="piece" src={blackChecker} alt="black checker piece" /></div>
    };
};

export default Position;