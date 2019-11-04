import React from 'react';

const OptionsPanel = (props) => (
    <div className="optionsPanel">
        { props.players.red.concede && <div>Black Wins</div> }
        { props.players.black.concede && <div>Red Wins</div> }
        <button onClick={() => props.concede(props.turn)}>Concede</button>
        <div>{props.turn}'s turn</div>
    </div>
)

export default OptionsPanel;