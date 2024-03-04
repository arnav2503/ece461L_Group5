import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { cn } from "@/lib/utils";

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
  const { userID } = useContext(AuthContext);

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

  const onRemove = (id: string) => {
    if (userID === props.owner) {
      // // project_management.deleteProject(id);
      // TODO: Implement deleteProject
    } else {
      // // project_management.leaveProject(id);
      // TODO: Implement leaveProject
    }
  };

  return (
    <div
      className={cn(
        "border-2 rounded-lg p-6 transition-all hover:transform hover:scale-105",
        isComplete() ? "opacity-50 hover:opacity-100" : ""
      )}
    >
      <p className="text-xl text-left">
        Project: <strong className="font-semibold">{props.name}</strong>
      </p>
      <p className="text-sm  mb-2 text-left">{props.id}</p>
      <p className="text-sm  mb-2 text-left">
        Created by <strong className="font-semibold">{props.owner}</strong>
      </p>
      <Separator />
      <p className="text-sm  my-2 text-left">{props.description}</p>
      <Separator />
      <div className="flex justify-between my-2">
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
        <Progress value={calculateProgress()} className="w-full" />
      </div>
      <div className="flex justify-between">
        <Button variant="destructive" onClick={() => onRemove(props.id)}>
          {userID === props.owner ? "Delete" : "Unassign"}
        </Button>
        <Button>
          <Link to={`/projects/${props.id}`}>Manage</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
