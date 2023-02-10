import { useCallback, useEffect, useState } from 'react';

let logoutTimer: NodeJS.Timeout;
export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>();

  const login = useCallback((token: string, expirationDate?: Date) => {
    setToken(token);

    const tokenExpirationDate =
      // expirationDate || new Date(new Date().getTime() + 1000 * 60); //60s
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //60m
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);

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
    const storedData = JSON.parse(localStorage.getItem('userData') as string);
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
  };
};
