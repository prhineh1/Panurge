import React from 'react';
import PropTypes from 'prop-types';
import redChecker from '../imgs/red_checker.svg';
import blackChecker from '../imgs/black_checker.svg';

const Position = ({
  coord, content, selected, move,
}) => (content === 1 ? (
  <button type="button" onKeyDown={() => move(coord)} onClick={() => move(coord)} />
) : (
  <button type="button" onClick={() => selected(coord, content)} onKeyDown={() => selected(coord, content)}>
    <img
      className="piece"
      src={content === 'r' ? redChecker : blackChecker}
      alt={content === 'r' ? 'red checker piece' : 'black checker piece'}
    />
  </button>
));

Position.propTypes = {
  coord: PropTypes.arrayOf(PropTypes.number).isRequired,
  content: PropTypes.oneOf([1, 'r', 'b']).isRequired,
  selected: PropTypes.func,
  move: PropTypes.func,
};

Position.defaultProps = {
  selected: () => {},
  move: () => {},
};

export default Position;
