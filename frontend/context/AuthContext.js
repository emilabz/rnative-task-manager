// frontend/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });

      if (response.data.token) {
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);
        setUserToken(token);
        return null;
        // You can also fetch user info here if needed
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      return (
        error.response?.data?.message ||
        "Invalid credentials. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/signup", {
        name: name,
        email: email,
        password: password,
      });

      if (response.data.token) {
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);
        setUserToken(token);
      }
    } catch (error) {
      console.error(
        "Signup error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("token");
      setUserToken(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      setUserToken(token);
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        isLoading,
        userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
