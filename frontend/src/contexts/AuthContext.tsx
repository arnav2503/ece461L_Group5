import auth from "@/api/auth";
import { toast } from "@/components/ui/use-toast";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Updated interface to include userID and its setter
interface AuthContextType {
  isAuthenticated: boolean;
  userID: string | null; // Assuming userID is a string. Use null when there's no user.
  displayName: string | null;
  login: (username: string, password: string) => void;
  signup: (
    username: string,
    displayName: string,
    password: string,
    confirmPassword: string
  ) => void;
  logout: () => void;
  loading: boolean;
  project_list: string[];
  refreshUser: () => void;
  updateDisplayName: (displayName: string) => void;
  refreshProjectList: () => void;
}

// Default values for the context, including userID and its setter
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userID: null,
  displayName: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  loading: true,
  project_list: [],
  refreshUser: () => {},
  updateDisplayName: () => {},
  refreshProjectList: () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [projectList, setProjectList] = useState<string[]>([]); // Added state for project list
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const user = await auth.getUser();
      setIsAuthenticated(true);
      setUserID(user._id);
      setDisplayName(user.display_name);
      setProjectList(user.project_list); // Set project list
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          setUserID(null);
          setDisplayName(null);
        }
      } else {
        console.error("Unexpected error during authentication check:", error); // Log for debugging
      }
    }
  };

  const refreshUser = () => {
    setLoading(true);
    checkAuth().finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshProjectList = async () => {
    auth
      .getAssignedProjects()
      .then((projects) => {
        setProjectList(projects);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            toast({
              title: "Failed to fetch projects",
              description: error.response.data.error,
              variant: "destructive",
            });
          }
        } else {
          console.error("Unexpected error during project list refresh:", error); // Log for debugging
          toast({
            title: "Failed to fetch projects",
            description: error.response.error,
            variant: "destructive",
          });
        }
      });
  };

  const updateDisplayName = async (displayName: string) => {
    try {
      await auth.updateDisplayName(displayName);
      setDisplayName(displayName);
      toast({
        title: "Display name updated",
        description: "Your display name has been updated.",
        variant: "default",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast({
            title: "Update failed",
            description: error.response.data.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Update failed",
            description: "Network error. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        console.error("Unexpected error during update:", error); // Log for debugging
        toast({
          title: "Update failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const signup = async (
    username: string,
    displayName: string,
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      toast({
        title: "Signup failed",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return; // Early exit
    }

    try {
      await auth.signup(username, password, displayName);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast({
            title: "Signup failed",
            description: error.response.data.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup failed",
            description: "Network error. Please try again.",
            variant: "destructive",
          });
        }
      } else {
        console.error("Unexpected error during signup:", error); // Log for debugging
        toast({
          title: "Signup failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await auth.login(username, password);
      setIsAuthenticated(true);
      setUserID(response.username);
      setDisplayName(response.display_name);
      refreshUser();
      navigate("/projects");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast({
            title: "Login Failed",
            description: error.response.data.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Network Error",
            description: "Please try again.",
            variant: "destructive",
          });
        }
      } else {
        console.error("Unexpected error during login:", error); // Log for debugging
      }
    }
  };

  const logout = () => {
    auth.logout();
    setIsAuthenticated(false);
    setUserID(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userID,
        displayName,
        login: login,
        signup: signup,
        logout: logout,
        loading,
        project_list: projectList,
        refreshUser: refreshUser,
        updateDisplayName,
        refreshProjectList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return auth;
};

export { AuthContext, AuthContextProvider, useAuth };
