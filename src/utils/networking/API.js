import sleep from '../sleep';
import axios from 'axios';
import poolResultsHistory from './mock-data/pool-results-history';
/*
if ( !process.env.MODE || process.env.MODE === 'production' ) {
  const API_URL =  'https://swym-backend.herokuapp.com';
} else {
  const API_URL = 'https://swym-dev.herokuapp.com';
}
*/

const API_URL =  'https://swym-backend.herokuapp.com';
console.log('API url = ' + API_URL);

function mapPoolResultsHistory(result) {
  return {
    prize: result.prize,
    winnerUsername: result.winner_username,
    drawingTimestamp: result.drawing_timestamp,
  };
}

export async function fetchTransactionHistory(userId) {
  try {
    const response = await axios.get(`${API_URL}/api/transactions/user/${userId}`);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function fetchQRCode(user) {
  try {
    const response = await axios.get(`${API_URL}/auth/setup-2fa`, user);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function fetchTOTPCode(user) {
  try {
    console.log("user is ", user);
    const response = await axios.get(`${API_URL}/auth/create-b32-totp-code`);
    return response;
  } catch (err) {
    return err.response;
  }
}



export async function setup2FA(user, params) {
  try {
    const response = await axios.post(`${API_URL}/auth/setup-2fa`, params);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function saveTOTP(userId, params) {
  try {
    console.log("USER ID= " + userId);
    console.log(params);
    const response = await axios.post(`${API_URL}/auth/save-b32-totp-code?userId=${userId}`, params);
    return response;
  } catch (err) {
    return err.response;
  }
}
export async function validateTOTP(userId, params) {
  try {
    var url = `${API_URL}/auth/validate-totp?userId=${userId}`;
    console.log('URL is ', url);
    const response = await axios.post(url, params);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function resetPassword(email) {
  try {
    const response = await axios.post(`${API_URL}/auth/reset`, {email});
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function resetVerify(email, temp) {
  try {
    const response = await axios.post(`${API_URL}/auth/reset_verify`, {password: temp, email});
    return response;
  } catch (err) {
    return err.response;
  }
}
export async function resetFinalize(email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/reset_finalize`, {email, password});
    return response;
  } catch (err) {
    return err.response;
  }
}
export async function createUserAccount(user) {
  console.log('Registering..');
  console.log('API url = ' + API_URL);
  const response = await axios.post(`${API_URL}/auth/signup`, user);
  return response;
}

export async function validateLogin(user) {
  try {
    const response = await axios.put(`${API_URL}/auth/login`, user);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function fetchUserAccount(userId) {
  try {
    const response = await axios.get(`${API_URL}/api/users/${userId}`);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function editUserAccount(user) {
  try {
    const response = await axios.put(`${API_URL}/api/users/${user.id}`, user);
    return response;
  } catch (err) {
    return err.response;
  }
}
export async function resetUserIsWinner(userId) {
  try {
    const response = await axios.put(`${API_URL}/api/users/resetWinner/${userId}`);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function logoutUser() {
  try {
    const response = await axios.delete(`${API_URL}/auth/logout`);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function fetchPoolState() {
  try {
    const response = await axios.get(`${API_URL}/api/champions/`);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function fetchMostRecentWinner() {
  try {
    const response = await axios.get(`${API_URL}/api/champions/mostRecent`);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function generateCode(userId) {
  try {
    const response = await axios.get(`${API_URL}/api/generateCode/${userId}`);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function withdrawFunds(userId, reqBody) {
  try {
    const response = await axios.post(`${API_URL}/api/transactions/withdraw/${userId}`, reqBody);
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function fetchPoolResultsHistory() {
  await sleep(500);

  return poolResultsHistory.results.map(mapPoolResultsHistory);
}

export async function getReferralLink(params) {
  try {
    let response = await axios.get(`${API_URL}/api/rewards/getreferralcode`, { params: params });
    response.data.code = API_URL + '/view/referral/' + response.data.code;
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function getReferralCode(params) {
  try {
    const response = await axios.get(`${API_URL}/api/rewards/getreferralcode`, { params: params });
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function redeemCode(params) {
  try {
    const response = await axios.post(`${API_URL}/api/rewards/redeem/`, params);
    return response;
  } catch (err) {
    return err.response;
  }
}