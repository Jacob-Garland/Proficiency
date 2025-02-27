import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_PROFILE } from "../graphql/queries/userQueries";
import { LOGIN_USER } from "../graphql/mutations/userMutations";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const { data, refetch } = useQuery(GET_USER_PROFILE, { 
    skip: !token,
    fetchPolicy: "cache-and-network",
    onError: (error) => console.error("Error fetching user profile:", error),  
  });

  useEffect(() => {
    if (data?.me && data.me !== user) setUser(data.me);
  }, [data?.me, user]);

  const [loginMutation] = useMutation(LOGIN_USER);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({ variables: { email, password } });
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("id", data.login.user._id);
      localStorage.setItem("email", data.login.user.email);
      setUser(data.login.user);
      await refetch();
    } catch (error) {
      console.error("Login failed:", error);
    }
  }, [loginMutation, refetch]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, refetch }}>
      {children}
    </AuthContext.Provider>
  );

};