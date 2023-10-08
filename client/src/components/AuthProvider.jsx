import { useState } from 'react';
import { AuthenticationContext } from "./AuthContext";

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState();
  
    const loginContext = (username) => {
      setUser({ username });
    };
  
    const logout = () => {
      setUser();
    };
  
    const value = 
    { user, 
      isAuthenticated: !!user, 
      loginContext, 
      logout };
  
    return (
      <AuthenticationContext.Provider value={value}>
        {children}
      </AuthenticationContext.Provider>
    );
  };