import auth from "@/api/auth";
import { AuthContext } from "@/components/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjectForm from "@/components/CreateProjectForm";
import LogoutButton from "@/components/LogoutButton";

function HomePage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState("");
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
    <>
      <h1>Welcome, {username}!</h1>
      <CreateProjectForm />
      <LogoutButton className="mt-6" variant={"destructive"}>
        Logout
      </LogoutButton>
    </>
  );
}

export default HomePage;
