import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface ProjectProps {
  id: string;
  owner: string;
  description: string;
  startDate: string; // Or a Date object if you prefer
  endDate: string; // Or a Date object if you prefer
  onDelete: (projectId: string) => void;
  onUnassign: (projectId: string) => void;
  isCurrentUserOwner: boolean;
  resourcesUsed: number;
  resourcesCapacity: number;
}

const ProjectCard = ({
  id,
  owner,
  isCurrentUserOwner,
  description,
  startDate,
  endDate,
  onDelete,
  onUnassign,
  resourcesUsed,
  resourcesCapacity,
}: ProjectProps) => {
  const calculateProgress = () => {
    return 10;
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <p className="text-xl text-left">
        Project <strong className="font-semibold">{id}</strong>
      </p>
      <p className="text-sm text-gray-700 mb-2 text-left">
        Created by <strong className="font-semibold">{owner}</strong>
      </p>
      <Separator />
      <p className="text-sm text-gray-600 my-2 text-left">{description}</p>
      <Separator />
      <div className="flex justify-between my-2">
        {" "}
        {/* Container for resources */}
        <span className="font-semibold">
          Resources Used:{" "}
          <span className="font-normal">
            {resourcesUsed} / {resourcesCapacity}
          </span>
        </span>
      </div>
      <div className="flex flex-col items-center mb-4">
        {" "}
        {/* Column layout */}
        <div className="flex justify-between w-full mt-2">
          {" "}
          {/* Dates in a row */}
          <small className="text-gray-600 ">{startDate}</small>
          <small className="text-gray-600 ">{endDate}</small>
        </div>
        <Progress value={calculateProgress()} className="w-full" />
      </div>
      <div className="flex justify-between">
        {isCurrentUserOwner ? (
          <Button variant="destructive" onClick={() => onDelete(id)}>
            Delete
          </Button>
        ) : (
          <Button variant="destructive" onClick={() => onUnassign(id)}>
            Unassign
          </Button>
        )}
        <Button>
          <Link to={`/projects/${id}/manage`}>Manage</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
