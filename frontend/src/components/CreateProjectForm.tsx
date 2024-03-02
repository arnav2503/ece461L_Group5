import project_management from "@/api/project_management";
import { DateRangeSelector } from "@/components/DateRangeSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

import axios from "axios";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface CreateProjectFormProps {
  className?: string;
}

function CreateProjectForm(props: CreateProjectFormProps) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
      toast({
        title: "Project Created",
        description: "The project has been created successfully.",
        variant: "default",
      });
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
      <div
        className={cn(
          "container flex flex-col items-center justify-center",
          props.className
        )}
      >
        <h2 className="text-2xl font-bold mb-4">Create Project</h2>
        <form onSubmit={handleSubmit} className="">
          <Input
            placeholder="Project ID"
            className={cn(
              "mb-4 w-full",
              isLoading && "cursor-not-allowed opacity-50"
            )}
            onChange={(event) => setId(event.target.value)}
            required
          />
          <Input
            placeholder="Project Name"
            className={cn(
              "mb-4 w-full",
              isLoading && "cursor-not-allowed opacity-50"
            )}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <Textarea
            placeholder="Project Description"
            className={cn(
              "mb-4 w-full",
              isLoading && "cursor-not-allowed opacity-50"
            )}
            onChange={(event) => setDescription(event.target.value)}
          />
          <DateRangeSelector
            onDateChange={(date) => setDateRange(date)}
            className={cn(
              "mb-4 w-full",
              isLoading && "cursor-not-allowed opacity-50"
            )}
          />
          <Button
            type="submit"
            className={cn(
              "mb-4 w-full",
              isLoading && "cursor-not-allowed opacity-50"
            )}
          >
            Create Project
          </Button>
        </form>
      </div>
    </>
  );
}

export default CreateProjectForm;
