import { cn } from "@/lib/utils";

import { UsersIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface JoinProjectButtonProps {
  className?: string;
}

const JoinProjectButton = (props: JoinProjectButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/join-project");
  };

  return (
    <Button
      className={cn("align-middle", props.className)}
      variant={"outline"}
      onClick={handleClick}
    >
      <UsersIcon className="mr-2 size-3" />
      Join Existing Project
    </Button>
  );
};

export default JoinProjectButton;
