import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";

import React from "react";

function LogoutButton(props: React.ComponentProps<typeof Button>) {
  const auth = useAuth();

  return (
    <Button onClick={auth.logout} {...props}>
      {props.children}
    </Button>
  );
}

export default LogoutButton;
