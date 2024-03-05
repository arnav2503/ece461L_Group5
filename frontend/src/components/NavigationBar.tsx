import CreateProjectButton from "@/components/CreateProjectButton";
import JoinProjectButton from "@/components/JoinProjectButton";
import LogoutButton from "@/components/LogoutButton";
import { ModeToggle } from "@/components/ModeToggle";
import HomeButton from "@/components/HomeButton";
import UserProfileButton from "@/components/UserProfileButton";

function NavigationBar() {
  return (
    <div className="flex items-center w-full flex-grow justify-between p-5 bg-stone-100 dark:bg-stone-900 rounded-2xl">
      <div className="space-x-3 items-center flex justify-center">
        <HomeButton />
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
