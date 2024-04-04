import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { Pencil2Icon } from "@radix-ui/react-icons";

interface ProjectOwnerEditButtonProps {
  disabled?: boolean;
  className?: string;
}

function ProjectOwnerEditButton(props: ProjectOwnerEditButtonProps) {
  return (
    <>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger>
            <div className="p-3">
              <Pencil2Icon
                className={cn(
                  props.disabled ? "opacity-25" : "",
                  props.className
                )}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>The project owner can't be changed.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}

export default ProjectOwnerEditButton;
