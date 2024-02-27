import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mt-10">Welcome to the homepage</h1>
      {isAuthenticated ? (
        <p>You are logged in</p>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
}

export default HomePage;
