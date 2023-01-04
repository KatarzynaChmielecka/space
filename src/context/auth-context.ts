import { createContext } from 'react';

export const AuthContext = createContext<{
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}>({
  token: null,
  login: () => {},
  logout: () => {},
});
