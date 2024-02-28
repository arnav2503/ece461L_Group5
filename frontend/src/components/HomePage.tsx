import { useContext } from "react";
import { AuthContext } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import auth from "@/api/auth";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    auth.logout();
    navigate("/");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold my-5">Welcome to the homepage</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in</p>
          <Button onClick={handleLogout}>Log Out</Button>
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
