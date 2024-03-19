import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface ChangeDisplayNameButtonProps {
  className?: string;
}

export function ChangeDisplayNameButton(props: ChangeDisplayNameButtonProps) {
  const auth = useAuth();
  const [displayName, setDisplayName] = useState(auth.displayName || "");

  const handleSubmit = () => {
    auth.updateDisplayName(displayName);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className={cn("p-3", props.className)}>
          <Pencil2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit display name</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="display-name" className="text-right">
              Display Name
            </Label>
            <Input
              id="display-name"
              defaultValue={auth.displayName || ""}
              className="col-span-3"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-between w-full">
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
