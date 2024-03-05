import { useAuth } from "@/components/AuthContext";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import React, { useState } from "react";
import { Link } from "react-router-dom";

interface LoginFormProps {
  className?: string;
}

const LoginForm = (props: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await auth.login(username, password);
    setIsLoading(false);
  };

  return (
    <div className={cn("container mx-auto", props.className)}>
      <div className="flex flex-col items-center py-12">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-1"
            disabled={isLoading}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-1"
            disabled={isLoading}
            required
          />

          <div className="flex flex-row-reverse justify-between align-middle mt-4">
            <Button type="submit" className="" disabled={isLoading}>
              <Spinner size={15} disabled={!isLoading} />
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
