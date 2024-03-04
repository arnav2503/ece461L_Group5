import { AuthContext } from "@/components/AuthContext";
import NavigationBar from "@/components/NavigationBar";
import TestProjectCards from "@/components/debug_component/TestProjectCard";
import { Toaster } from "@/components/ui/toaster";

import { useContext } from "react";

function HomePage() {
  const { userID } = useContext(AuthContext);

  return (
    <>
      {/* Welcome message */}
      <div className="flex flex-row justify-center align-baseline items-baseline">
        <p className=" text-3xl font-light">
          Welcome,{" "}
          <span className="font-bold dark:text-cyan-400 text-cyan-900">
            {userID}
          </span>
          !
        </p>
      </div>

      <NavigationBar />

      {/* View Projects */}
      <TestProjectCards />

      <Toaster />
    </>
  );
}

export default HomePage;
