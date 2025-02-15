import { createContext } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);