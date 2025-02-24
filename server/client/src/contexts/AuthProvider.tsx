import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useQuery, useMutation } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries";
import { LOGIN_MUTATION } from "../graphql/mutations";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const { data, refetch } = useQuery(ME_QUERY, { skip: !token });

  useEffect(() => {
    if (data?.me) setUser(data.me);
  }, [data]);

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("id", data.login.user._id);
      localStorage.setItem("email", data.login.user.email);
      setUser(data.login.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refetch }}>
      {children}
    </AuthContext.Provider>
  );

};