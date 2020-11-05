import sleep from '../sleep';
import axios from 'axios';
import transactionHistory from './mock-data/transaction-history';
import userAccount from './mock-data/user-account';
import poolState from './mock-data/pool-state';
import poolResultsHistory from './mock-data/pool-results-history';
const API_URL = process.env.API_URL || 'https://blooming-meadow-37606.herokuapp.com';

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

export async function createUserAccount(user) {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, user);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function validateLogin(user) {
  try {
    console.log('sending: ', user);
    const response = await axios.put(`${API_URL}/auth/login`, user);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function fetchUserAccount(user) {
  try {
    console.log('sending: ', user);
    const response = await axios.put(`${API_URL}/auth/me`, user);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function logoutUser() {
  try {
    const response = await axios.delete(`${API_URL}/auth/logout`);
    console.log('logged out');
    return response;
  } catch (err) {
    console.log('logged out error');
    return err.response;
  }
}

export async function fetchPoolState() {
  await sleep(500);

  return mapPoolState(poolState.pool);
}

export async function fetchPoolResultsHistory() {
  await sleep(500);

  return poolResultsHistory.results.map(mapPoolResultsHistory);
}
