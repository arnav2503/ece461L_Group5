import PageHeader from "@/components/navbar/PageHeader";
import ResourceManager from "@/components/resource-management/ResourceManager";
import { Toaster } from "@/components/ui/toaster";
import { useProject } from "@/contexts/ProjectContext";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";
import ProjectDetails from "./ProjectDetails";
import { useEffect } from "react";
import Spinner from "../Spinner";

function ProjectManagementPage() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 970px)" });
  const { projectId } = useParams();
  const project_id = projectId?.split("-")[1] ?? "";

  const project = useProject();

  useEffect(() => {
    project.setProjectId(project_id);
  }, []);

  if (project.loading) {
    return <Spinner />;
  }

  return (
    <>
      {project.project_found ? (
        <>
          <PageHeader
            before=""
            em={project.name}
            subtitle={"project-" + project.id}
          />
          <div
            className={cn(
              "flex g-2 m-2",
              isTabletOrMobile
                ? "flex-col items-center align-middle space-y-2"
                : "flex-row align-top items-start space-x-5"
            )}
          >
            <div className="flex-grow border rounded-2xl p-5">
              <ProjectDetails />
            </div>
            <ResourceManager className={cn("flex-grow-0")} />
          </div>
        </>
      ) : (
        <>
          <PageHeader
            before="Error "
            em={"404"}
            subtitle={"The project was not found."}
          />
        </>
      )}
      <Toaster />
    </>
  );
}

export default ProjectManagementPage;
