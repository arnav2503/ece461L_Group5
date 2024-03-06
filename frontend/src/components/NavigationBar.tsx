import CreateProjectButton from "@/components/CreateProjectButton";
import HomeButton from "@/components/HomeButton";
import JoinProjectButton from "@/components/JoinProjectButton";
import { ModeToggle } from "@/components/ModeToggle";
import AccountManageButton from "@/components/AccountManageButton";
import { useMediaQuery } from "react-responsive";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

function NavigationBar() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 970px)" });

  return (
    <>
      {isTabletOrMobile ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <HamburgerMenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col p-0 m-1">
            <DropdownMenuItem asChild>
              <HomeButton className="border-none justify-start" />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <CreateProjectButton className="border-none justify-start" />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <JoinProjectButton className="border-none justify-start" />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <AccountManageButton className="border-none justify-start" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center w-full flex-grow justify-between p-3 bg-stone-100 dark:bg-stone-900 rounded-2xl">
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
      )}
    </>
  );
}

export default NavigationBar;
