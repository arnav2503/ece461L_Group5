import "@/App.css";
import { AuthContextProvider } from "@/components/AuthContext";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import SignupPage from "@/components/SignupPage";
import { ThemeProvider } from "@/components/ThemeProvider";
import UserProfilePage from "@/components/UserProfilePage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectManagementPage from "./components/ProjectManagementPage";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <BrowserRouter>
          <AuthContextProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <UserProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/projects/:projectId"
                element={
                  <ProtectedRoute>
                    <ProjectManagementPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
