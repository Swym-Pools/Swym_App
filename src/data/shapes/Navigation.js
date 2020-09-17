import PropTypes from 'prop-types';

const NavigationShape = PropTypes.shape({
  navigate: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
});

export default NavigationShape;
