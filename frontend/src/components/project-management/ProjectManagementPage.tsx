import PageHeader from "@/components/navbar/PageHeader";
import ResourceManager from "@/components/resource-management/ResourceManager";
import { Toaster } from "@/components/ui/toaster";
import { useProject } from "@/contexts/ProjectContext";
import { useParams } from "react-router-dom";

function ProjectManagementPage() {
  const { projectId } = useParams();
  const project_id = projectId?.split("-")[1] ?? "";

  const project = useProject();
  project.setProjectId(project_id);

  return (
    <>
      <PageHeader before="" em={project.name} />
      <div className="flex flex-row items-center g-2 m-2 align-middle justify-center">
        <div className="flex-grow border"></div>
        <ResourceManager className="" />
      </div>
      <Toaster />
    </>
  );
}

export default ProjectManagementPage;
