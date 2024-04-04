import { useAuth } from "@/contexts/AuthContext";
import PageHeader from "@/components/navbar/PageHeader";
import { Toaster } from "@/components/ui/toaster";
import ViewProjects from "@/components/project-management/ViewProjects";

function ProjectsPage() {
  const auth = useAuth();

  return (
    <>
      <PageHeader
        before={(auth.displayName || auth.userID) + "'s "}
        em={"Projects"}
      />
      <ViewProjects />
      <Toaster />
    </>
  );
}

export default ProjectsPage;
