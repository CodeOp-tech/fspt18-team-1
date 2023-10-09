import { useState, useEffect } from "react";
import { AuthenticationContext } from "./AuthContext";
import axios from "axios";

const HOSTNAME = "/api";

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const loginContext = async (credentials) => {
    try {
      const { data } = await axios.post(`${HOSTNAME}/users/login`, credentials);
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = () => {
    fetch("http://localhost:5000/api/users/profile/", {
      headers: { authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setToken(null);
        setUser(null);
        console.log("Oops! Something went wrong");
      });
  };

  useEffect(() => {
    getUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = { user, isAuthenticated: !!token, loginContext, logout };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};
