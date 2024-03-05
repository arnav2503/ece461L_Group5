import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { MixerVerticalIcon, TrashIcon } from "@radix-ui/react-icons";
import { Database, FlaskConical, User, UserMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectProps {
  id: string;
  name: string;
  owner: string;
  description: string;
  startDate: string;
  endDate: string;
  resourcesUsed: number;
  resourcesCapacity: number;
}

const ProjectCard = (props: ProjectProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const calculateProgress = () => {
    const start = new Date(props.startDate);
    const end = new Date(props.endDate);
    const now = new Date();
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return (elapsed / total) * 100;
  };

  const isComplete = () => {
    const end = new Date(props.endDate);
    const now = new Date();
    return now.getTime() > end.getTime();
  };

  const onRemove = () => {
    if (auth.userID === props.owner) {
      // // project_management.deleteProject(id);
      // TODO: Implement deleteProject
    } else {
      // // project_management.leaveProject(id);
      // TODO: Implement leaveProject
    }
  };

  const handleManage = () => {
    navigate(`/projects/${props.id}`);
  };

  return (
    <div
      className={cn(
        "border rounded-2xl p-6 transition-all hover:transform hover:scale-105 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-stone-700",
        isComplete() ? "opacity-50 hover:opacity-100" : ""
      )}
    >
      <div className="ml-1 mb-1 flex flex-row items-baseline">
        <p className="text-sm text-left">{props.id}</p>
      </div>
      <div className="flex flex-row items-center mb-1">
        <FlaskConical className="size-5 mr-2" />
        <p className="font-semibold text-xl text-left">{props.name}</p>
      </div>
      <div className="text-sm flex flex-row mb-2 text-left items-center">
        <User className="mr-2 size-4" />
        <span className="font-semibold">{props.owner}</span>
      </div>
      <Separator />
      <p className="text-sm  my-2 text-left">{props.description}</p>
      <Separator />
      <div className="flex items-center my-2">
        <Database className="size-4 mr-2" />
        <span className="font-semibold">
          Resources Used:{" "}
          <span className="font-normal">
            {props.resourcesUsed} / {props.resourcesCapacity}
          </span>
        </span>
      </div>
      <div className="flex flex-col items-center mb-4">
        <div className="flex justify-between w-full mt-2">
          <small className="">{props.startDate}</small>
          <small className="">{props.endDate}</small>
        </div>
        <Progress value={calculateProgress()} className="w-full " />
      </div>
      <div className="flex justify-between">
        <Button
          variant="destructive"
          className="flex flex-row items-center"
          onClick={onRemove}
        >
          {auth.userID === props.owner ? (
            <>
              <TrashIcon className="mr-2" />
              Delete
            </>
          ) : (
            <>
              <UserMinus className="size-4 mr-2" />
              Unassign
            </>
          )}
        </Button>
        <Button className="flex flex-row items-center" onClick={handleManage}>
          <MixerVerticalIcon className="mr-2" />
          Manage
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
