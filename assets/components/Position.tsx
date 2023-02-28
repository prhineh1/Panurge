import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import redChecker from '../imgs/red_checker.svg';
import blackChecker from '../imgs/black_checker.svg';
import { coordContent, Immutable } from '../types';

interface PositionProps {
  coord: Immutable<number[]>;
  content: coordContent;
  selected?: (coord: Immutable<number[]>, content: coordContent) => void;
  move?: (toCoords: Immutable<number[]>) => void;
  selectedPiece?: boolean;
}


const Position: React.FC<PositionProps> = ({
  coord, content, selected, move, selectedPiece,
}): ReactElement => (content === 1 ? (
  <button
    className={move && 'canMove'}
    type="button"
    onKeyDown={(): void => move?.(coord)}
    onClick={(): void => move?.(coord)}
  />
) : (
  <button
    type="button"
    className={`${selected && 'activeTurn'} ${selectedPiece && 'selectedPiece'}`}
    onClick={(): void => selected?.(coord, content)}
    onKeyDown={(): void => selected?.(coord, content)}
  >
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
  selectedPiece: PropTypes.bool,
};

Position.defaultProps = {
  selected: undefined,
  move: undefined,
  selectedPiece: false,
};

export default Position;
