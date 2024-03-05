import { useAuth } from "@/components/AuthContext";
import Spinner from "@/components/Spinner";
import PageHeader from "./PageHeader";

function UserProfile() {
  const auth = useAuth();

  if (auth.loading) {
    return <Spinner />;
  }

  return (
    <div>
      <PageHeader before={auth.userID + "'s "} em={"Profile"} />
      <p>Username: {auth.userID}</p>
      <div>
        <span>Assigned Projects: </span>
        {auth.user.project_list.length > 0 ? (
          <ul>
            {auth.user.project_list.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        ) : (
          <span>No projects found</span>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
