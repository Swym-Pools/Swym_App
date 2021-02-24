import PropTypes from 'prop-types';

export const TransactionKind = Object.freeze({
  DEPOSIT: 'deposit',
  SEND: 'withdraw',
});

const TransactionShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  kind: PropTypes.oneOf(Object.values(TransactionKind)).isRequired,
  amount: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired,
});

export default TransactionShape;
