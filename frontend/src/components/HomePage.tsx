import { useAuth } from "@/components/AuthContext";
import TestProjectCards from "@/components/debug_component/TestProjectCard";
import { Toaster } from "@/components/ui/toaster";
import PageHeader from "./PageHeader";

function HomePage() {
  const auth = useAuth();

  return (
    <>
      <PageHeader em={auth.userID} after={"'s Projects"} />
      <TestProjectCards />
      <Toaster />
    </>
  );
}

export default HomePage;
