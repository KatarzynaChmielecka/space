import { createContext } from 'react';

export const AuthContext = createContext<{
  // isLoggedIn: boolean;
  // userId: string | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}>({
  // isLoggedIn: false,
  // userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
