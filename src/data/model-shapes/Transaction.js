import PropTypes from 'prop-types';

export const TransactionKind = Object.freeze({
  DEPOSIT: 'deposit',
  SEND: 'send',
});

const TransactionShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  kind: PropTypes.oneOf(Object.values(TransactionKind)).isRequired,
  amount: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
});

export default TransactionShape;
