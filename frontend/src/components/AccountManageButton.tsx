import { useAuth } from "@/components/AuthContext";
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

function AccountManageButton() {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={cn("align-middle")} variant={"outline"}>
          <PersonIcon className="mr-2" />
          {auth.userID}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90 p-2 justify-center hover:cursor-pointer"
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
