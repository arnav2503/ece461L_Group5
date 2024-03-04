import { AuthContext } from "@/components/AuthContext";
import CreateProjectButton from "@/components/CreateProjectButton";
import LogoutButton from "@/components/LogoutButton";
import { Toaster } from "@/components/ui/toaster";
import { useContext } from "react";
import TestProjectCards from "./debug_component/TestProjectCard";
import { ModeToggle } from "./ModeToggle";
import JoinProjectButton from "./JoinProjectButton";

function HomePage() {
  const { userID } = useContext(AuthContext);

  return (
    <>
      {/* Welcome message */}
      <h1 className=" text-3xl font-light">
        Welcome,{" "}
        <span className="font-bold dark:text-cyan-400 text-cyan-900">
          {userID}
        </span>
        !
      </h1>

      {/* Navigation */}
      <div className="flex m-2 items-center w-full flex-grow justify-between">
        <div className="space-x-3 items-center flex justify-center">
          <CreateProjectButton />
          <JoinProjectButton />
        </div>
        <div className="space-x-3 items-center flex justify-center">
          <ModeToggle />
          <LogoutButton variant={"destructive"}>Logout</LogoutButton>
        </div>
      </div>

      {/* View Projects */}
      <TestProjectCards />

      <Toaster />
    </>
  );
}

export default HomePage;
