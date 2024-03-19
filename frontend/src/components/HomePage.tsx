import { useAuth } from "@/components/AuthContext";
import TestProjectCards from "@/components/debug_component/TestProjectCard";
import PageHeader from "@/components/PageHeader";
import { Toaster } from "@/components/ui/toaster";

function HomePage() {
  const auth = useAuth();

  return (
    <>
      <PageHeader
        before={(auth.displayName || auth.userID) + "'s "}
        em={"Projects"}
      />
      <TestProjectCards />
      <Toaster />
    </>
  );
}

export default HomePage;
