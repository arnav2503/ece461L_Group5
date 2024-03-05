import { useAuth } from "@/components/AuthContext";
import TestProjectCards from "@/components/debug_component/TestProjectCard";
import { Toaster } from "@/components/ui/toaster";
import PageHeader from "./PageHeader";
import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

function HomePage() {
  const auth = useAuth();

  return (
    <>
      <PageHeader before={auth.userID + "'s "} em={"Projects"} />
      <TestProjectCards />
      <Toaster />
    </>
  );
}

export default HomePage;
