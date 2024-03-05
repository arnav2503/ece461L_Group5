import { useAuth } from "@/components/AuthContext";
import Spinner from "@/components/Spinner";

function UserProfile() {
  const auth = useAuth();

  if (auth.loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {auth.user._id}</p>
      <div>
        <span>Projects: </span>
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
