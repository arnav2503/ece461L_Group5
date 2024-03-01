import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface SignupFormProps {
  className?: string;
}

const SignupForm = (props: SignupFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Additional field
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Signup failed",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return; // Early exit
    }

    setIsLoading(true);
    try {
      const response = await auth.signup(username, password);
      console.log("Signup successful:", response);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("container mx-auto", props.className)}>
      <div className="flex flex-col items-center py-12">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            className="mb-1"
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="mb-1"
            required
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            className="mb-1"
            required
          />
          <div className="flex flex-row-reverse justify-between align-middle mt-4">
            <Button type="submit" className="" disabled={isLoading}>
              Sign Up
            </Button>
            <Link to="/login">
              <Button variant="secondary" className="">
                Back to Sign In
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
