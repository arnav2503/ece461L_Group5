import auth from "@/api/auth";
import { AuthContext } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

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
