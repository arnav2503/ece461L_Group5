import ProjectCard from "@/components/project-management/ProjectCard";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectContextProvider } from "@/contexts/ProjectContext";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

import { useMediaQuery } from "react-responsive";

function ViewProjects() {
  const auth = useAuth();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 970px)" });

  return (
    <div className="container mx-auto my-5">
      {auth.project_list.length === 0 ? (
        <h1 className="text-2xl text-center text-foreground/50">
          No projects assigned.
        </h1>
      ) : (
        <div
          className={cn(
            "grid gap-2",
            isTabletOrMobile ? "grid-cols-1" : "md:grid-cols-3"
          )}
        >
          {auth.project_list.map((project) => (
            <ProjectContextProvider key={project}>
              <ProjectCard id={project} />
            </ProjectContextProvider>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewProjects;
