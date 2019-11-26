import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import redChecker from '../imgs/red_checker.svg';
import blackChecker from '../imgs/black_checker.svg';
import { coordContent } from '../state/actions';
import { Immutable } from '../state/state';

interface PositionProps {
  coord: Immutable<number[]>;
  content: coordContent;
  selected?: (coord: Immutable<number[]>, content: coordContent) => void;
  move?: (toCoords: Immutable<number[]>) => void;
}


const Position: React.FC<PositionProps> = ({
  coord, content, selected, move,
}): ReactElement => (content === 1 ? (
  <button type="button" onKeyDown={(): void => move && move(coord)} onClick={(): void => move && move(coord)} />
) : (
  <button type="button" onClick={(): void => selected && selected(coord, content)} onKeyDown={(): void => selected && selected(coord, content)}>
    <img
      className="piece"
      src={content === 'r' ? redChecker : blackChecker}
      alt={content === 'r' ? 'red checker piece' : 'black checker piece'}
    />
  </button>
));

Position.propTypes = {
  coord: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  content: PropTypes.oneOf<coordContent>([1, 'r', 'b']).isRequired,
  selected: PropTypes.func,
  move: PropTypes.func,
};

Position.defaultProps = {
  selected: (): void => {},
  move: (): void => {},
};

export default Position;
