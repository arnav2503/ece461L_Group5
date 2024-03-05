import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";

import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton(props: React.ComponentProps<typeof Button>) {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <Button onClick={auth.logout} {...props}>
      {props.children}
    </Button>
  );
}

export default LogoutButton;
