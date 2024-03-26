import { Toaster } from "@/components/ui/toaster";
import { useParams } from "react-router-dom";

function ProjectManagementPage() {
  const { projectId } = useParams();
  const project_id = projectId?.split("-")[1];
  return (
    <>
      <h1>Project Management Page</h1>
      <p>Project ID: {project_id}</p>
      <Toaster />
    </>
  );
}

export default ProjectManagementPage;
