import React from 'react';

const OptionsPanel = (props) => (
    <div className="optionsPanel">
        { Object.values(props.players.red).some(el => !!el) && <div>Black Wins</div> }
        { Object.values(props.players.black).some(el => !!el) && <div>Red Wins</div> }
        <button onClick={props.concede}>Concede</button>
        <div>{props.turn}'s turn</div>
    </div>
)

export default OptionsPanel;