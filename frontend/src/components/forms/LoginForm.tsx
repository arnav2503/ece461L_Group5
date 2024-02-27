import React, { useState } from "react";
import { login } from "../../api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(""); // Clear any previous errors

        try {
            const user = await login(username, password);
            // TODO: Redirect to protected route
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
                        required
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" className="mt-4" disabled={isLoading}>
                        Login
                    </Button>
                    <Link to="/signup">
                        <Button variant="secondary" className="mt-2">
                            Create Account
                        </Button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
