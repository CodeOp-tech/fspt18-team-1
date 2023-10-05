import { useState } from 'react';
import { AuthContext } from "./AuthContext";

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState();
  
    const loginContext = (username) => {
      setUser({ username });
    };
  
    const logout = () => {
      setUser();
    };
  
    const value = { user, isAuthenticated: !!user, loginContext, logout };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };