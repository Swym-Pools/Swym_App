import PropTypes from 'prop-types';

const UserAccountShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  // balance: PropTypes.number.isRequired,
  withdrawalAddress: PropTypes.string,
});

export default UserAccountShape;
