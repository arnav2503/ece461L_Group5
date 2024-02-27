import React, { useState } from "react";
import { signup } from "../../api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const SignupForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // Additional field
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");

            toast({
                title: "Signup failed",
                description: errorMessage,
                variant: "destructive",
            });
            return; // Early exit
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
            const response = await signup(username, password);
            console.log("Signup successful:", response);
            // TODO: Login newly created user and redirect to protected route
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage("Network error. Please try again.");
                }
            } else {
                console.error("Unexpected error during signup:", error); // Log for debugging
                setErrorMessage(
                    "An unexpected error occurred. Please try again."
                );
            }
            toast({
                title: "Signup failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto">
            {" "}
            {/* Container for centering */}
            <div className="flex flex-col items-center py-12">
                {" "}
                {/* Basic layout */}
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <Input
                        placeholder="Username"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUsername(e.target.value)
                        }
                        required
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setConfirmPassword(e.target.value)
                        }
                        required
                    />

                    <Button type="submit" className="mt-4" disabled={isLoading}>
                        Sign Up
                    </Button>
                    <Link to="/login">
                        <Button variant="secondary" className="mt-2">
                            Sign In
                        </Button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
