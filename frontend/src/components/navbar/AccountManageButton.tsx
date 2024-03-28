import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { PersonIcon } from "@radix-ui/react-icons";
import { LogOut, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AccountManageButtonProps {
  className?: string;
}

function AccountManageButton(props: AccountManageButtonProps) {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("align-middle", props.className)}
          variant={"outline"}
        >
          <PersonIcon className="mr-2" />
          {auth.displayName || auth.userID}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuItem
          className="justify-center p-2 hover:cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <>
            <UserCog className="size-4 mr-2" />
            My Profile
          </>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="bg-destructive text-destructive-foreground p-2 justify-center hover:cursor-pointer border-destructive"
          onClick={auth.logout}
        >
          <LogOut className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountManageButton;
