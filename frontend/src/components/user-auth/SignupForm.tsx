import { useAuth } from "@/contexts/AuthContext";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SignupFormProps {
  className?: string;
}

const SignupForm = (props: SignupFormProps) => {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState(""); // Additional field
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Additional field
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await auth.signup(username, displayName, password, confirmPassword);
    setIsLoading(false);
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
            disabled={isLoading}
            required
          />

          <Input
            placeholder="Display Name"
            value={displayName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDisplayName(e.target.value)
            }
            className="mb-1"
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
            required
          />
          <div className="flex flex-row-reverse justify-between align-middle mt-4">
            <Button type="submit" className="" disabled={isLoading}>
              <Spinner size={15} disabled={!isLoading} />
              Sign Up
            </Button>
            <Link to="/login">
              <Button variant="ghost" className="">
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
