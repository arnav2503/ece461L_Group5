import auth from "@/api/auth";
import { AuthContext } from "@/components/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function HomePage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState(""); // Fix: Use correct syntax for useState hook
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await auth.getUser();
        console.log("User:", user);
        setUsername(user.username);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 401) {
              auth.logout();
              setIsAuthenticated(false);
              navigate("/login");
            }
          } else {
            console.error("Network error. Please try again.");
          }
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold my-5">Welcome, {username}</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in</p>
          <LogoutButton className="mt-2" variant="destructive">
            Log Out
          </LogoutButton>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
        </>
      )}
    </div>
  );
}

export default HomePage;
