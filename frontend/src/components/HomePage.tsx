import { useAuth } from "@/components/AuthContext";
import PageHeader from "@/components/PageHeader";
import { Toaster } from "@/components/ui/toaster";
import ViewProjects from "@/components/ViewProjects";

function HomePage() {
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

export default HomePage;
