import React, { useState } from "react";
import auth from "../api/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsAuthenticated } = React.useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Clear any previous errors

    try {
      await auth.login(username, password);
      setIsAuthenticated(true);
      navigate("/"); // Redirect to home page
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data.error);
          toast({
            title: "Login Error:",
            description: errorMessage,
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      {" "}
      <div className="flex flex-col items-center py-12">
        {" "}
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-1"
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-1"
            required
          />

          <div className="flex flex-row-reverse justify-between align-middle mt-4">
            <Button type="submit" className="" disabled={isLoading}>
              Login
            </Button>

            <Link to="/signup">
              <Button variant="secondary" className="">
                Create Account
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
