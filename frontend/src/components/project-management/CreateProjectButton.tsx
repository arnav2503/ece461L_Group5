import project_management from "@/api/project_management";
import { useAuth } from "@/contexts/AuthContext";
import { DateRangeSelector } from "@/components/DateRangeSelector";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

import { FilePlusIcon, PlusIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";

interface CreateProjectFormProps {
  className?: string;
}

function CreateProjectButton(props: CreateProjectFormProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const auth = useAuth();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const start_date = dateRange?.from;
    const end_date = dateRange?.to;

    setIsLoading(true);
    try {
      await project_management.createProject(
        id,
        name,
        description,
        start_date,
        end_date
      );
      auth.refreshUser();
      toast({
        title: "Project Created",
        description: "The project has been created successfully.",
        variant: "default",
      });
      navigate(`/projects/project-${id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast({
            title: "Project Creation Failed",
            description: error.response.data.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Network Error",
            description: "Please try again.",
            variant: "destructive",
          });
        }
      } else {
        console.error("Unexpected error during project creation:", error);
        toast({
          title: "Project Creation Failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
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
            <PlusIcon className="mr-2" />
            Create New Project
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <h2 className="text-lg font-semibold">Create a new project</h2>
            </DialogHeader>
            <div className="flex flex-col w-full align-middle items-center justify-between">
              <Input
                placeholder="Project ID"
                type="number"
                inputMode="numeric"
                className={cn(
                  "w-full my-1 numeric-input",
                  isLoading && "cursor-not-allowed opacity-50"
                )}
                onChange={(event) => setId(event.target.value)}
                disabled={isLoading}
                required
              />
              <Input
                placeholder="Project Name"
                className={cn(
                  "w-full my-1",
                  isLoading && "cursor-not-allowed opacity-50"
                )}
                onChange={(event) => setName(event.target.value)}
                disabled={isLoading}
                required
              />
              <Textarea
                placeholder="Project Description"
                className={cn(
                  "w-full my-1",
                  isLoading && "cursor-not-allowed opacity-50"
                )}
                onChange={(event) => setDescription(event.target.value)}
                disabled={isLoading}
              />
              <DateRangeSelector
                onDateChange={(date) => setDateRange(date)}
                className={cn(
                  "w-full my-1",
                  isLoading && "cursor-not-allowed opacity-50"
                )}
                disabled={isLoading}
              />
            </div>
            <DialogFooter>
              <div className="flex flex-row-reverse justify-between w-full">
                <Button
                  type="submit"
                  className={cn(
                    "my-2",
                    isLoading && "cursor-not-allowed opacity-50"
                  )}
                  disabled={isLoading}
                >
                  <Spinner size={15} disabled={!isLoading} />
                  <FilePlusIcon className="mr-2" />
                  Create Project
                </Button>
                <DialogClose>
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

export default CreateProjectButton;
