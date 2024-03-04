import auth from "@/api/auth";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

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
        try {
          auth.getUser().then((user) => {
            setUserID(user._id);
          });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              setIsAuthenticated(false);
              setUserID(null);
              localStorage.removeItem("auth_token");
            } else {
              console.error("Network Error");
            }
          }
        }
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
