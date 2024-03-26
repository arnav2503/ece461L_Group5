import AccountManageButton from "@/components/AccountManageButton";
import CreateProjectButton from "@/components/CreateProjectButton";
import HomeButton from "@/components/HomeButton";
import JoinProjectButton from "@/components/JoinProjectButton";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "react-responsive";

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
          <DropdownMenuContent className="flex flex-col p-0">
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
