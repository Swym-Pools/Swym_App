import sleep from '../sleep';

import transactionHistory from './mock-data/transaction-history';
import userAccount from './mock-data/user-account';

function mapUserAccount(accountResult) {
  return {
    id: accountResult.id,
    username: accountResult.username,
    email: accountResult.email,
    phone: accountResult.phone,
    balance: accountResult.balance,
    withdrawalAddress: accountResult.withdrawal_address,
  };
}

export async function fetchTransactionHistory() {
  await sleep(500);

  return transactionHistory.results;
}

export async function fetchUserAccount() {
  await sleep(500);

  return mapUserAccount(userAccount.account);
}
