import { DatePicker } from "@/components/DatePicker";
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
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProject } from "@/contexts/ProjectContext";
import { cn } from "@/lib/utils";

import { Pencil2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

interface ProjectEndDateEditButtonProps {
  className?: string;
}

function ProjectEndDateEditButton(props: ProjectEndDateEditButtonProps) {
  const project = useProject();
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(project.end_date)
  );

  const handleSubmit = () => {
    if (endDate) {
      project.updateEndDate(endDate.toDateString());
    }
  };

  return (
    <Dialog>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger>
            <DialogTrigger asChild>
              <Button variant="ghost" className={cn("p-3", props.className)}>
                <Pencil2Icon />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change the project's end date.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit project end date</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-name" className="text-right">
              Project End Date
            </Label>
            <DatePicker
              id="project-name"
              className="col-span-3"
              onDateChange={setEndDate}
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

export default ProjectEndDateEditButton;
