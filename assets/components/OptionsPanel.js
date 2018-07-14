import React from 'react';

const OptionsPanel = (props) => (
            <div className="optionsPanel">
                { Object.values(props.players.red).reduce((acc, cur) => !!cur || !!acc) && <div>Black Wins</div> }
                { Object.values(props.players.black).reduce((acc, cur) => !!cur || !!acc) && <div>Red Wins</div> }
                <button onClick={props.concede}>Concede</button>
            </div>
)

export default OptionsPanel;