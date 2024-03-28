import { useProject } from "@/contexts/ProjectContext";
import { ResourceContextProvider } from "@/contexts/ResourceContext";
import ResourceCard from "./ResourceCard";
import { cn } from "@/lib/utils";

interface ResourceManagerProps {
  className?: string;
}

function ResourceManager(props: ResourceManagerProps) {
  const project = useProject();

  return (
    <div
      className={cn(
        "grid grid-cols-2 w-1/2 p-5 m-5 gap-5 border rounded-2xl",
        props.className
      )}
    >
      {Object.entries(project.resources).map(([key, value]) => (
        <ResourceContextProvider>
          <ResourceCard id={key} used={value} />
        </ResourceContextProvider>
      ))}
    </div>
  );
}

export default ResourceManager;
