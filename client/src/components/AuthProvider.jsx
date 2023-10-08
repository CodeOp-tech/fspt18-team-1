import { useState } from 'react';
import { AuthenticationContext } from "./AuthContext";

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState();
  
    const loginContext = (username) => {
      localStorage.setItem('user', JSON.stringify({ username }));
      setUser({ username });
    };
  
    const logout = () => {
      localStorage.removeItem('user');
      setUser(null);
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