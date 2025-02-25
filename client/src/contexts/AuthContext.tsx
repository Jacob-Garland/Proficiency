import { createContext } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
  location: string;
  bio: string;
  albums: { _id: string; name: string };
  posts: { _id: string; title: string; body: string };
  token: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  refetch: () => void;
}

export const AuthContext = createContext({} as AuthContextType);