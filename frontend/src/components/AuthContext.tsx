import React, { createContext, useEffect, useState } from "react";
import auth from "../api/auth.ts";

// Updated interface to include userID and its setter
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userID: string | null; // Assuming userID is a string. Use null when there's no user.
  setUserID: (id: string | null) => void;
}

// Default values for the context, including userID and its setter
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userID: null,
  setUserID: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    setIsLoading(true);
    const isLoggedIn = auth.isLoggedIn();
    setIsAuthenticated(isLoggedIn);
    return isLoggedIn;
  };

  useEffect(() => {
    checkAuth().then((isLoggedIn) => {
      if (isLoggedIn) {
        auth.getUser().then((user) => {
          setUserID(user._id);
        });
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userID, setUserID }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
