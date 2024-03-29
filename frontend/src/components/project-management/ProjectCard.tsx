import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { MixerVerticalIcon, TrashIcon } from "@radix-ui/react-icons";
import { Database, FlaskConical, User, UserMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProject } from "@/contexts/ProjectContext";
import ProjectCardSkeleton from "@/components/project-management/ProjectCardSkeleton";
import { useEffect } from "react";

interface ProjectProps {
  id: string;
}

const ProjectCard = (props: ProjectProps) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const project = useProject();

  useEffect(() => {
    project.setProjectId(props.id);
  }, []);

  const calculateProgress = () => {
    const start = new Date(project.start_date || "1970-01-01");
    const end = new Date(project.end_date || "3000-01-01");
    const now = new Date();
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return (elapsed / total) * 100;
  };

  const isComplete = () => {
    const end = new Date(project.end_date);
    const now = new Date();
    return now.getTime() > end.getTime();
  };

  const onRemove = () => {
    if (auth.userID === project.owner) {
      project.deleteProject();
      auth.update_user();
    } else {
      project.unassignUser();
      auth.update_user();
    }
  };

  const handleManage = () => {
    navigate(`/projects/project-${project.id}`);
  };

  if (project.loading) {
    return <ProjectCardSkeleton />;
  }

  return (
    <div
      className={cn(
        "flex flex-col border rounded-2xl p-6 transition-all hover:transform hover:scale-105 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-stone-700",
        isComplete() ? "opacity-50 hover:opacity-100" : ""
      )}
    >
      <div className="ml-1 mb-1 flex flex-row items-baseline">
        <p className="text-sm text-left">{"project-" + project.id}</p>
      </div>
      <div className="flex flex-row items-center mb-1">
        <FlaskConical className="size-5 mr-2" />
        <p className="font-semibold text-xl text-left">{project.name}</p>
      </div>
      <div className="text-sm flex flex-row mb-2 text-left items-center">
        <User className="mr-2 size-4" />
        <span className="font-semibold">{project.owner}</span>
      </div>
      <Separator />
      <p className="text-sm  my-2 text-left">{project.description}</p>
      <Separator />
      <div className="flex items-center my-2">
        <Database className="size-4 mr-2" />
        <span className="font-semibold">
          Resources Used:{" "}
          <span className="font-normal">
            {project.resources_used} / {project.resources_capacity}
          </span>
        </span>
      </div>
      <div className="flex flex-col items-center mb-4 flex-grow">
        <div className="flex justify-between w-full mt-2 flex-grow">
          <small className="">
            {new Date(project.start_date).toLocaleDateString("us-EN") ||
              "1970-01-01"}
          </small>
          <small className="">
            {new Date(project.end_date).toLocaleDateString("us-EN") ||
              "3000-01-01"}
          </small>
        </div>
        <Progress value={calculateProgress()} className="w-full " />
      </div>
      <div className="flex justify-between">
        <Button
          variant="destructive"
          className="flex flex-row items-center"
          onClick={onRemove}
        >
          {auth.userID === project.owner ? (
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
