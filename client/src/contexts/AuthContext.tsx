import { createContext } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  profilePic: string;
  location: string;
  bio: string;
  posts: { _id: string; title: string; content: string; images: string[]; createdAt: string }[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  refetch: () => void;
}

export const AuthContext = createContext({} as AuthContextType);