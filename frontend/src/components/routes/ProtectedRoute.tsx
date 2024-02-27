import { ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"; // Or your routing library

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:5000/test-auth"); // Adjust your endpoint
            if (response.status === 200) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error("Error checking authentication:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />; // For nested routes
};

export default ProtectedRoute;
