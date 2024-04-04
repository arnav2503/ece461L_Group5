import "@/App.css";
import HomePage from "@/components/HomePage";
import ProjectsPage from "@/components/project-management/ProjectsPage";
import ProjectManagementPage from "@/components/project-management/ProjectManagementPage";
import LoginPage from "@/components/user-auth/LoginPage";
import ProtectedRoute from "@/components/user-auth/ProtectedRoute";
import SignupPage from "@/components/user-auth/SignupPage";
import UserProfilePage from "@/components/user-profile/UserProfilePage";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ProjectContextProvider } from "@/contexts/ProjectContext";
import { ThemeProvider } from "@/contexts/ThemeProvider";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <BrowserRouter>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <ProjectsPage />
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
                    <ProjectContextProvider>
                      <ProjectManagementPage />
                    </ProjectContextProvider>
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
