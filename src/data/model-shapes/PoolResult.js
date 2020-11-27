import PropTypes from 'prop-types';

const PoolResultShape = PropTypes.shape({
  prize: PropTypes.number.isRequired,
  winnerUsername: PropTypes.string.isRequired,
  drawingTimestamp: PropTypes.string.isRequired,
});

export default PoolResultShape;
