import { useAuth } from "@/components/AuthContext";
import { ChangeDisplayNameButton } from "@/components/ChangeDisplayNameButton";
import Spinner from "@/components/Spinner";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

function UserProfile() {
  const auth = useAuth();

  if (auth.loading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <div className="w-2/3 mx-auto mt-5 border rounded-2xl p-10">
          <div className="flex flex-row justify-between align-middle items-center">
            <span className="font-bold">Username:</span> {auth.userID}
          </div>
          <div className="flex flex-row justify-between align-middle items-center mb-5">
            <div className="flex flex-row align-middle items-center justify-start my-1">
              <span className="font-bold">Display Name:</span>
            </div>
            <div className="flex flex-row align-middle items-center justify-between my-1">
              {auth.displayName || (
                <span className="text-foreground/50">Not set</span>
              )}
              <ChangeDisplayNameButton className="ml-3" />
            </div>
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
      <Toaster />
    </>
  );
}

export default UserProfile;
