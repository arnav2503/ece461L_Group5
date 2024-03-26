import project_management from "@/api/project_management";
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
import axios from "axios";
import { UsersIcon } from "lucide-react";
import { useState } from "react";

interface JoinProjectButtonProps {
  className?: string;
}

function JoinProjectButton(props: JoinProjectButtonProps) {
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    project_management
      .assignProject(id)
      .then(() => {
        auth.update_user();
        toast({
          variant: "default",
          description: "Project joined successfully.",
          title: "Success",
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          toast({
            variant: "destructive",
            description: error.response?.data.error,
            title: "Error",
          });
        } else {
          toast({
            variant: "destructive",
            description: "An error occurred. Please try again.",
            title: "Error",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <h2 className="text-lg font-semibold">
                Join an existing project
              </h2>
            </DialogHeader>

            <div className="flex flex-col w-full align-middle items-center justify-between">
              <Input
                placeholder={"Project ID"}
                className={cn(
                  "w-full my-2",
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
                  className={cn(
                    "",
                    isLoading && "cursor-not-allowed opacity-50"
                  )}
                  disabled={isLoading}
                >
                  <Spinner size={15} disabled={!isLoading} />
                  <MagnifyingGlassIcon className="mr-2" />
                  Find Project
                </Button>
                <DialogClose asChild>
                  <Button variant={"ghost"}>Cancel</Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default JoinProjectButton;
