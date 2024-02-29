import { BrowserRouter, Route, Routes } from "react-router-dom";
import "@/App.css";
import { AuthContextProvider } from "@/components/AuthContext";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import SignupPage from "@/components/SignupPage";
import TestProjectCards from "@/components/debug_component/TestProjectCard";

function App() {
  return (
    <>
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/debug/test_project" element={<TestProjectCards />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
