import { useProject } from "@/contexts/ProjectContext";
import { ResourceContextProvider } from "@/contexts/ResourceContext";
import ResourceCard from "@/components/resource-management/ResourceCard";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";

interface ResourceManagerProps {
  className?: string;
}

function ResourceManager(props: ResourceManagerProps) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 970px)" });
  const project = useProject();

  return (
    <div
      className={cn(
        "grid p-5 border rounded-2xl grid-cols-1",
        props.className,
        isTabletOrMobile ? "grid-cols-1 gap-2 " : "md:grid-cols-2 w-1/2 gap-5"
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
