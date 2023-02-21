import { createContext } from 'react';

export const AuthContext = createContext<{
  token: string | null;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}>({
  token: null,
  userId: '',
  login: () => {},
  logout: () => {},
});
