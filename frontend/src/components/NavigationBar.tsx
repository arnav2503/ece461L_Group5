import CreateProjectButton from "@/components/CreateProjectButton";
import JoinProjectButton from "@/components/JoinProjectButton";
import LogoutButton from "@/components/LogoutButton";
import { ModeToggle } from "@/components/ModeToggle";
import UserProfileButton from "./UserProfileButton";

function NavigationBar() {
  return (
    <div className="flex m-2 items-center w-full flex-grow justify-between">
      <div className="space-x-3 items-center flex justify-center">
        <CreateProjectButton />
        <JoinProjectButton />
      </div>
      <div className="space-x-3 items-center flex justify-center">
        <ModeToggle />
        <UserProfileButton />
        <LogoutButton variant={"destructive"}>Logout</LogoutButton>
      </div>
    </div>
  );
}

export default NavigationBar;
