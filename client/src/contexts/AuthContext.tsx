import { createContext } from "react";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextType);