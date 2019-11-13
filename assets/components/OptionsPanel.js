import React from 'react';
import PropTypes from 'prop-types';

const OptionsPanel = ({ players, concede, turn }) => (
  <div className="optionsPanel">
    { players.red.concede && <div>Black Wins</div> }
    { players.black.concede && <div>Red Wins</div> }
    <button type="button" onClick={() => concede(turn)}>Concede</button>
    <div>
      {`${turn}'s turn`}
    </div>
  </div>
);

OptionsPanel.propTypes = {
  players: PropTypes.exact({
    red: PropTypes.exact({
      concede: PropTypes.bool,
      lost: PropTypes.number,
    }),
    black: PropTypes.exact({
      concede: PropTypes.bool,
      lost: PropTypes.number,
    }),
  }).isRequired,
  concede: PropTypes.func.isRequired,
  turn: PropTypes.oneOf(['black', 'red']).isRequired,
};

export default OptionsPanel;
