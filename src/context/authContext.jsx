import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import Loading from "../components/Loading";

export const API_URL = process.env.EXPO_BASE_URL_API;
const TOKEN_KEY = process.env.EXPO_TOKEN_KEY;
const authContext = createContext({});

axios.defaults.baseURL = API_URL;

export const Role = Object.freeze({
  ADMIN: "admin",
  USER: "user",
});

export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
    user: {
      userId: null,
      username: null,
      role: null,
    },
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const result = await axios.get(`/user`);
        setAuthState((prevState) => ({
          ...prevState,
          token: token,
          authenticated: true,
          user: {
            userId: result.data.user.userId,
            role: result.data.user.role,
            username: result.data.user.username,
          },
        }));
      }
    };

    loadToken();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const register = async (username, password) => {
    try {
      return await axios.post(`/auth/register`, {
        username,
        password,
      });
    } catch (error) {
      return { error: true, msg: error.response.data.msg };
    }
  };

  const login = async ({ username, password }) => {
    try {
      const result = await axios.post(`/auth/login`, {
        username,
        password,
      });

      setAuthState({
        token: result.data.token,
        authenticated: true,
        user: result.data.user,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      return result;
    } catch (error) {
      console.error("LOGIN API ERROR:", error.response.data.error);
      return {
        error: {
          msg: error.response.data.error.message,
          code: error.response.data.error.code,
        },
      };
    }
  };

  const logout = async () => {
    try {
      const result = await axios.delete(`/auth/logout`);
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      axios.defaults.headers.common["Authorization"] = "";
      setAuthState({
        token: null,
        authenticated: null,
        user: {
          userId: null,
          username: null,
          role: null,
        },
      });
    } catch (error) {
      return { error: true, msg: error.response.data.message };
    }
  };

  const value = {
    register,
    login,
    logout,
    authState,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default authContext;
