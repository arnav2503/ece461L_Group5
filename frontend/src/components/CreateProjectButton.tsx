import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

const CreateProjectButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/create-project");
  };

  return (
    <Button
      className="mt-6 align-middle"
      variant={"outline"}
      onClick={handleClick}
    >
      <PlusIcon className="mr-2" />
      Create Project
    </Button>
  );
};

export default CreateProjectButton;
