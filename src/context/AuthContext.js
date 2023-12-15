import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  authenticate: (user) => {},
  logout: () => {},
  isLoading: false,
  userToken: "",
  userId: "",
  isLogin: false,
});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedId = await AsyncStorage.getItem("id");

      if (storedToken) {
        setUserToken(storedToken);
        setUserId(storedId);
      }
    }

    fetchToken();
  }, []);

  const login = (user) => {
    setUserToken(user.token);
    setUserId(user.id);
    setIsLoading(false);
    AsyncStorage.setItem("token", user.token);
    AsyncStorage.setItem("id", user.id);
  };

  const logout = () => {
    setUserToken(null);
    setUserId(null);
    setIsLoading(false);
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("id");
  };

  const value = {
    authenticate: login,
    logout: logout,
    isLoading: isLoading,
    userToken: userToken,
    userId: userId,
    isLogin: !!userToken,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
