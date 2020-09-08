import PropTypes from 'prop-types';

export const TransactionKind = Object.freeze({
  DEPOSIT: 'deposit',
  SEND: 'send',
});

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  kind: PropTypes.oneOf(Object.values(TransactionKind)).isRequired,
  amount: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
});
