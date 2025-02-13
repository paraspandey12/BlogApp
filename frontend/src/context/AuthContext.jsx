import { useState } from "react";
import { createContext } from "react";
import cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [authtoken, setAuthToken] = useState(cookies.get('token'));
  const login = (token) => {
    setAuthToken(token);
    cookies.set("token", token);
  };
  const logout = () => {
    setAuthToken(null);
    cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ authtoken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
