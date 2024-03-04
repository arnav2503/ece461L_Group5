import "@/App.css";
import { AuthContextProvider } from "@/components/AuthContext";
import CreateProjectPage from "@/components/CreateProjectPage";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import SignupPage from "@/components/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <AuthContextProvider>
          <BrowserRouter>
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
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
