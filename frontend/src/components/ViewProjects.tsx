import ProjectCard from "@/components/ProjectCard";
import { cn } from "@/lib/utils";
import getAssignedProjects from "@/api/project_management";

import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

interface Project {
  _id: string;
  name: string;
  owner: string;
  description: string;
  start_date: string;
  end_date: string;
  resourcesUsed: number;
  resourcesCapacity: number;
}

function ViewProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 970px)" });

  const loadProjects = () => {
    setLoading(true);
    getAssignedProjects.getAssignedProjects().then((projects) => {
      setProjects(projects);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto my-5">
      {projects.length === 0 ? (
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
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              id={"project-" + project._id}
              name={project.name}
              owner={project.owner}
              description={project.description}
              startDate={project.start_date}
              endDate={project.end_date}
              resourcesUsed={project.resourcesUsed}
              resourcesCapacity={project.resourcesCapacity}
              reloadProjects={loadProjects}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewProjects;
