import "@/App.css";
import { AuthContextProvider } from "@/contexts/AuthContext";
import ViewAssignedProjects from "@/components/ViewAssignedProjects";
import LoginPage from "@/components/user-auth/LoginPage";
import ProtectedRoute from "@/components/user-auth/ProtectedRoute";
import SignupPage from "@/components/user-auth/SignupPage";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import UserProfilePage from "@/components/user-profile/UserProfilePage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectManagementPage from "./components/project-management/ProjectManagementPage";

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
                    <ViewAssignedProjects />
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
