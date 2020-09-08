export function sortTransactionsByDate(transactions = [], ascending = true) {
  return transactions.sort((a, b) => {
    return ascending ? a.timestamp <= b.timestamp : a.timestamp > b.timestamp;
  });
}
