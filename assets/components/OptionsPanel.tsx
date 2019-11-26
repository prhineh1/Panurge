import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { PlayerState, Immutable } from '../state/state';
import { activePlayer } from '../state/actions';

interface OptionsPanelProps {
  red: Immutable<PlayerState>;
  black: Immutable<PlayerState>;
  concede: (player: activePlayer) => void;
  turn: activePlayer;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  red,
  black,
  concede,
  turn,
}): ReactElement => (
  <div className="optionsPanel">
    { red.concede && <div>Black Wins</div> }
    { black.concede && <div>Red Wins</div> }
    <button type="button" onClick={(): void => concede(turn)}>Concede</button>
    <div>
      {`${turn}'s turn`}
    </div>
  </div>
);

OptionsPanel.propTypes = {
  red: PropTypes.exact({
    concede: PropTypes.bool.isRequired,
    lost: PropTypes.number.isRequired,
  }).isRequired,
  black: PropTypes.exact({
    concede: PropTypes.bool.isRequired,
    lost: PropTypes.number.isRequired,
  }).isRequired,
  concede: PropTypes.func.isRequired,
  turn: PropTypes.oneOf<activePlayer>(['black', 'red']).isRequired,
};

export default OptionsPanel;
