import { useCallback, useEffect, useState } from 'react';

let logoutTimer;
export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  // const [userId, setUserId] = useState(null);

  const login = useCallback((token, expirationDate) => {
    // setIsLoggedIn(true);
    setToken(token);
    // setUserId(uid);

    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60);
    // expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    console.log(tokenExpirationDate);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        // userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      }),
    );
  }, []);

  const logout = useCallback(() => {
    // setIsLoggedIn(false);
    setToken(null);
    setTokenExpirationDate(null);
    // setUserId(null);

    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, token, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.token);
    }
  }, [login]);

  return {
    token,
    login,
    logout,
    //  userId
  };
};
