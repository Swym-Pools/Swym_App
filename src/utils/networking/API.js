import sleep from '../sleep';

import transactionHistory from './mock-data/transaction-history';
import userAccount from './mock-data/user-account';
import poolState from './mock-data/pool-state';
import poolResultsHistory from './mock-data/pool-results-history';

function mapUserAccount(accountResult) {
  return {
    id: accountResult.id,
    username: accountResult.username,
    email: accountResult.email,
    phoneNumber: accountResult.phoneNumber,
    balance: accountResult.balance,
    withdrawalAddress: accountResult.withdrawal_address,
  };
}

function mapPoolState(result) {
  return {
    estimatedPrize: result.estimated_prize,
    totalSavings: result.total_savings,
    isLive: result.is_live,
    secondsUntilNextSelection: result.seconds_until_next_selection,
  };
}

function mapPoolResultsHistory(result) {
  return {
    prize: result.prize,
    winnerUsername: result.winner_username,
    drawingTimestamp: result.drawing_timestamp,
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

export async function fetchPoolState() {
  await sleep(500);

  return mapPoolState(poolState.pool);
}

export async function fetchPoolResultsHistory() {
  await sleep(500);

  return poolResultsHistory.results.map(mapPoolResultsHistory);
}
