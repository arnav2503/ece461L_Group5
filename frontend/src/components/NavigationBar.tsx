import CreateProjectButton from "./CreateProjectButton";
import JoinProjectButton from "./JoinProjectButton";
import LogoutButton from "./LogoutButton";
import { ModeToggle } from "./ModeToggle";

function NavigationBar() {
  return (
    <div className="flex m-2 items-center w-full flex-grow justify-between">
      <div className="space-x-3 items-center flex justify-center">
        <CreateProjectButton />
        <JoinProjectButton />
      </div>
      <div className="space-x-3 items-center flex justify-center">
        <ModeToggle />
        <LogoutButton variant={"destructive"}>Logout</LogoutButton>
      </div>
    </div>
  );
}

export default NavigationBar;
