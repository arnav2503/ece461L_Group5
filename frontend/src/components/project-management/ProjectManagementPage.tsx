import { Toaster } from "@/components/ui/toaster";
import { useParams } from "react-router-dom";
import { useProject } from "@/contexts/ProjectContext";

function ProjectManagementPage() {
  const { projectId } = useParams();
  const project_id = projectId?.split("-")[1] ?? "";

  const project = useProject();
  project.setProjectId(project_id);

  return (
    <>
      <h1>Project Management Page</h1>
      <p>Project ID: {project_id}</p>
      <Toaster />
    </>
  );
}

export default ProjectManagementPage;
