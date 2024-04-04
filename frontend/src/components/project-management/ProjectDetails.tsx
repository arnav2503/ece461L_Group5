import { useAuth } from "@/contexts/AuthContext";
import { useProject } from "@/contexts/ProjectContext";
import { TrashIcon } from "@radix-ui/react-icons";
import { UserMinus, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import ProjectDescriptionEditButton from "./ProjectDescriptionEditButton";
import ProjectEndDateEditButton from "./ProjectEndDateButton";
import ProjectIDEditButton from "./ProjectIDEditButton";
import ProjectNameEditButton from "./ProjectNameEditButton";
import ProjectOwnerEditButton from "./ProjectOwnerEditButton";
import ProjectStartDateEditButton from "./ProjectStartDateEditButton";
import { useNavigate } from "react-router-dom";

function ProjectDetails() {
  const project = useProject();
  const auth = useAuth();
  const options = {
    timeZone: "UTC",
  };
  const navigate = useNavigate();

  const handleDelete = () => {
    project.deleteProject();
    auth.refreshProjectList();
    navigate("/projects");
  };

  const handleAssign = () => {
    project.assignUser();
    auth.refreshProjectList();
  };

  const handleUnassign = () => {
    project.unassignUser();
    auth.refreshProjectList();
    navigate("/projects");
  };

  return (
    <>
      <section className="flex flex-row justify-between w-full mb-5">
        <div className="flex flex-col space-y-2 w-full">
          <h1 className="text-2xl font-semibold">Project Details</h1>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start items-center w-full">
              <label className="text-sm text-foreground/60 w-1/6 text-left">
                ID:
              </label>
              <h1 className="text-lg text-left">project-{project.id}</h1>
            </div>
            <ProjectIDEditButton disabled />
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row align-baseline justify-start items-center w-full">
              <label className="text-sm text-foreground/60 w-1/6 text-left">
                Owner:
              </label>
              <h1 className="text-lg text-left">{project.owner}</h1>
            </div>
            <ProjectOwnerEditButton disabled />
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row align-baseline justify-start items-center w-full">
              <label className="text-sm text-foreground/60 w-1/6 text-left">
                Name:
              </label>
              <h1 className="text-lg text-left">{project.name}</h1>
            </div>
            <ProjectNameEditButton />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row align-baseline justify-start items-center w-full">
              <label className="text-sm text-foreground/60 w-1/6 text-left">
                Description:
              </label>
              <h1 className="text-lg text-left">{project.description}</h1>
            </div>
            <ProjectDescriptionEditButton />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row align-baseline justify-start items-center w-full">
              <label className="text-sm text-foreground/60 w-1/6 text-left">
                Start Date:
              </label>
              <h1 className="text-lg">
                {new Date(project.start_date).toLocaleDateString(
                  "en-US",
                  options
                )}
              </h1>
            </div>
            <ProjectStartDateEditButton />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row align-baseline justify-start items-center w-full">
              <label className="text-sm text-foreground/60 w-1/6 text-left">
                End Date:
              </label>
              <h1 className="text-lg text-left">
                {new Date(project.end_date).toLocaleDateString(
                  "en-US",
                  options
                )}
              </h1>
            </div>
            <ProjectEndDateEditButton />
          </div>
        </div>
      </section>
      <section className="flex flex-row-reverse mt-5">
        <div className="flex flex-row justify-end">
          {auth.userID === project.owner ? (
            <Button variant="destructive" onClick={handleDelete}>
              <TrashIcon className="mr-2" />
              Delete Project
            </Button>
          ) : auth.project_list.includes(project.id) ? (
            <Button variant="destructive" onClick={handleUnassign}>
              <UserMinus className="size-4 mr-2" />
              Unassign Project
            </Button>
          ) : (
            <Button variant="default" onClick={handleAssign}>
              <UserPlus className="size-4 mr-2" />
              Assign Project
            </Button>
          )}
        </div>
      </section>
    </>
  );
}

export default ProjectDetails;
