import { DateRangeSelector } from "@/components/DateRangeSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

interface CreateProjectFormProps {
  className?: string;
}

function CreateProjectForm(props: CreateProjectFormProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!dateRange) {
      toast({
        title: "Create Project Failed",
        description: "Please select the dates the project will be active",
        variant: "destructive",
      });
      return;
    }
    // TODO: Handle form submission
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
          <Input placeholder="Project Name" className="mb-4 w-full" required />
          <DateRangeSelector
            onDateChange={(date) => setDateRange(date)}
            className="mb-4 w-full"
          />
          <Button type="submit" className="w-full">
            Create Project
          </Button>
        </form>
      </div>
    </>
  );
}

export default CreateProjectForm;
