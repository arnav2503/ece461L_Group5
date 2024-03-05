import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/AuthContext";

import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

interface UserProfileButtonProps {
  className?: string;
}

const UserProfileButton = (props: UserProfileButtonProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <Button
      className={cn("align-middle", props.className)}
      variant={"outline"}
      onClick={handleClick}
    >
      <PersonIcon className="mr-2" />
      {auth.userID}
    </Button>
  );
};

export default UserProfileButton;
