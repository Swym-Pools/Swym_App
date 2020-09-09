import { useState, useEffect } from 'react';
import { fetchUserAccount } from '../networking/API';

export default function useUserAccountState() {
  const [userAccount, setUserAccount] = useState(null);
  const [isFetchingUserAccount, setIsFetchingUserAccount] = useState(false);
  const [hasUserAccountFetchError, setHasUserAccountFetchError] = useState(false);

  useEffect(() => {
    loadAccountDetails();
  }, []);

  async function loadAccountDetails() {
    setIsFetchingUserAccount(true);

    try {
      // TODO: Refactor after there's more clarity about how to retrieve authentication
      // credentials from the API.
      const userAccount = await fetchUserAccount();

      setUserAccount(userAccount);
      setHasUserAccountFetchError(false);
    } catch (error) {
      setHasUserAccountFetchError(true);
    } finally {
      setIsFetchingUserAccount(false);
    }
  }

  return {
    userAccount,
    isFetchingUserAccount,
    hasUserAccountFetchError,
  };
}
