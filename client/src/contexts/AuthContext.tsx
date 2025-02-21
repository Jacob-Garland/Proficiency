import { createContext } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
  location: string;
  bio: string;
  albums: { id: string; name: string }[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  refetch: () => void;
}

export const AuthContext = createContext({} as AuthContextType);