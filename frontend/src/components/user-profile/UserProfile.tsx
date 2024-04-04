import { useAuth } from "@/contexts/AuthContext";
import { ChangeDisplayNameButton } from "@/components/user-profile/ChangeDisplayNameButton";
import Spinner from "@/components/Spinner";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import ChangeUsernameButton from "./ChangeUsernameButton";
import { useNavigate } from "react-router-dom";

function UserProfile(this: any) {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = (project: string) => {
    navigate(`/projects/project-${project}`);
  };

  if (auth.loading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <div className="w-2/3 mx-auto mt-5 border rounded-2xl p-10">
          <div className="flex flex-row justify-between align-middle items-center w-full">
            <div className="flex flex-row align-middle items-center justify-start my-[0.25rem]">
              <span className="font-bold">Username:</span>
            </div>
            <div className="flex flex-row align-middle items-center justify-end my-[0.25rem]">
              {auth.userID}
              <ChangeUsernameButton className="ml-3" disabled />
            </div>
          </div>
          <div className="flex flex-row justify-between align-middle items-center mb-5 w-full">
            <div className="flex flex-row align-middle items-center justify-start my-[0.25rem]">
              <span className="font-bold">Display Name:</span>
            </div>
            <div className="flex flex-row align-middle items-center justify-end my-[0.25rem]">
              {auth.displayName || (
                <span className="text-foreground/50">Not set</span>
              )}
              <ChangeDisplayNameButton className="ml-3" />
            </div>
          </div>
          <Separator />
          <div className="flex flex-row justify-between align-top mt-5">
            <span className="font-bold">Assigned Projects: </span>
            {auth.project_list.length > 0 ? (
              <ul className="text-end list-none">
                {auth.project_list.map((project, index) => (
                  <li
                    onClick={() => {
                      handleClick(project);
                    }}
                    key={index}
                    className="cursor-pointer"
                  >
                    {project}
                  </li>
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
