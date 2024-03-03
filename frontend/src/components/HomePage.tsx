import { AuthContext } from "@/components/AuthContext";
import CreateProjectButton from "@/components/CreateProjectButton";
import LogoutButton from "@/components/LogoutButton";
import { Toaster } from "@/components/ui/toaster";
import { useContext } from "react";
import TestProjectCards from "./debug_component/TestProjectCard";

function HomePage() {
  const { userID } = useContext(AuthContext);

  return (
    <>
      <h1>Welcome, {userID}!</h1>
      <CreateProjectButton />
      <TestProjectCards />
      <LogoutButton className="mt-6" variant={"destructive"}>
        Logout
      </LogoutButton>
      <Toaster />
    </>
  );
}

export default HomePage;
