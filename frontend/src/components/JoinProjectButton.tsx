import { useAuth } from "@/components/AuthContext";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { UsersIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface JoinProjectButtonProps {
  className?: string;
}

function JoinProjectButton(props: JoinProjectButtonProps) {
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    // TODO - Add logic to join project
    // (1): use `id` to locate and show confirmation message
    // (2): use `auth.update_user()` to update the user's project list
    // (3): use `toast()` to show a message if the project was not found or if the user was already in the project
    // -->  See the CreateProjectButton component for an example of how to use `auth.update_user()` and `toast()`
    setIsLoading(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn("align-middle", props.className)}
            variant={"outline"}
          >
            <UsersIcon className="size-3 mr-2" />
            Join Existing Project
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <h2 className="text-lg font-semibold">Join an existing project</h2>
          </DialogHeader>
          <div className="flex flex-col w-full align-middle items-center justify-between">
            <Input
              placeholder={"Project ID"}
              className={cn(
                "w-full my-1",
                isLoading && "cursor-not-allowed opacity-50"
              )}
              onChange={(event) => setId(event.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <DialogFooter>
            <div className="flex flex-row-reverse justify-between w-full">
              <Button
                type="submit"
                className={cn("", isLoading && "cursor-not-allowed opacity-50")}
                disabled={isLoading}
                onClick={handleSubmit}
              >
                <Spinner size={15} disabled={!isLoading} />
                <MagnifyingGlassIcon className="mr-2" />
                Find Project
              </Button>
              <DialogClose>
                <Button variant={"ghost"}>Cancel</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default JoinProjectButton;
