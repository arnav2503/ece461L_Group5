import { useContext } from "react";
import { AuthContext } from "@/components/AuthContext";
import LogoutButton from "./LogoutButton";

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold my-5">Welcome to the homepage</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in</p>
          <LogoutButton className="mt-2" variant="destructive">
            Log Out
          </LogoutButton>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
        </>
      )}
    </div>
  );
}

export default HomePage;
