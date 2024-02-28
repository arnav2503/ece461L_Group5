import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Button } from "./ui/button";
import auth from "../api/auth";

function LogoutButton(props: React.ComponentProps<typeof Button>) {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    setIsAuthenticated(false);
    auth.logout();
    navigate("/");
  };

  return (
    <Button onClick={handleLogout} {...props}>
      {props.children}
    </Button>
  );
}

export default LogoutButton;
