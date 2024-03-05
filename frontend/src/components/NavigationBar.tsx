import CreateProjectButton from "@/components/CreateProjectButton";
import HomeButton from "@/components/HomeButton";
import JoinProjectButton from "@/components/JoinProjectButton";
import { ModeToggle } from "@/components/ModeToggle";
import AccountManageButton from "@/components/AccountManageButton";

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
        <AccountManageButton />
      </div>
    </div>
  );
}

export default NavigationBar;
