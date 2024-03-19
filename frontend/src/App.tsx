import "@/App.css";
import { AuthContextProvider } from "@/components/AuthContext";
import CreateProjectPage from "@/components/CreateProjectPage";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import SignupPage from "@/components/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import UserProfilePage from "./components/UserProfilePage";

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
                path="/create-project"
                element={
                  <ProtectedRoute>
                    <CreateProjectPage />
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
            </Routes>
          </AuthContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
