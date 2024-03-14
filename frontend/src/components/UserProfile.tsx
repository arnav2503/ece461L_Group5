import { useAuth } from "@/components/AuthContext";
import Spinner from "@/components/Spinner";
import PageHeader from "./PageHeader";
import { Separator } from "./ui/separator";

function UserProfile() {
  const auth = useAuth();

  if (auth.loading) {
    return <Spinner />;
  }

  return (
    <div>
      <PageHeader
        before={(auth.displayName || auth.userID) + "'s "}
        em={"Profile"}
      />
      <div className="w-1/2 mx-auto mt-5">
        <div className="flex flex-row justify-between align-baseline">
          <span className="font-bold">Username:</span> {auth.userID}
        </div>
        <div className="flex flex-row justify-between align-baseline mb-5">
          <span className="font-bold">Display Name:</span>{" "}
          {auth.displayName || (
            <span className="text-foreground/50">Not set</span>
          )}
        </div>
        <Separator />
        <div className="flex flex-row justify-between align-top mt-5">
          <span className="font-bold">Assigned Projects: </span>
          {auth.user.project_list.length > 0 ? (
            <ul className="text-end list-none">
              {auth.user.project_list.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          ) : (
            <span className="text-foreground/50">No projects found</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
