import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CreateProjectButtonProps {
  className?: string;
}

const CreateProjectButton = (props: CreateProjectButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Button
      className={cn("align-middle", props.className)}
      variant={"outline"}
      onClick={handleClick}
    >
      <FlaskConical className="size-3 mr-2" />
      All Projects
    </Button>
  );
};

export default CreateProjectButton;
