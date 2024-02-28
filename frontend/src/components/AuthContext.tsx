import React, { createContext, useEffect, useState } from "react";
import auth from "../api/auth.ts";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isLoggedIn());

  useEffect(() => {
    const check_auth = async () => {
      const isLoggedIn = await auth.isLoggedIn();
      setIsAuthenticated(isLoggedIn);
    };
    check_auth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
