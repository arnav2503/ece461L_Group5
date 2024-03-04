import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface CreateProjectButtonProps {
  className?: string;
}

const CreateProjectButton = (props: CreateProjectButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-project");
  };

  return (
    <Button
      className={cn("align-middle", props.className)}
      variant={"outline"}
      onClick={handleClick}
    >
      <PlusIcon className="mr-2" />
      Create New Project
    </Button>
  );
};

export default CreateProjectButton;
