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
import { Textarea } from "@/components/ui/textarea";
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

interface ProjectDescriptionEditButtonProps {
  className?: string;
}

function ProjectDescriptionEditButton(
  props: ProjectDescriptionEditButtonProps
) {
  const project = useProject();
  const [projectDescription, setProjectDescription] = useState(
    project.description
  );

  const handleSubmit = () => {
    project.updateDescription(projectDescription);
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
            <p>Change the project's description.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit project description</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-name" className="text-right">
              Project Description
            </Label>
            <Textarea
              id="project-name"
              value={projectDescription}
              className="col-span-3"
              onChange={(e) => setProjectDescription(e.target.value)}
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

export default ProjectDescriptionEditButton;
