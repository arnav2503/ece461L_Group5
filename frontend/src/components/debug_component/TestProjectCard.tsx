import ProjectCard from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

import { useMediaQuery } from "react-responsive";

const TestProjectCards = () => {
  const sampleProjects = [
    {
      id: "project-01",
      name: "Web Development",
      owner: "armaan",
      description: "A collaborative web development project.",
      startDate: "2023-12-05",
      endDate: "2024-03-20",
      resourcesUsed: 35,
      resourcesCapacity: 100,
    },
    {
      id: "project-02",
      name: "Data Analysis",
      owner: "arnav",
      description: "Data analysis and visualization.",
      startDate: "2023-11-18",
      endDate: "2023-12-31",
      resourcesUsed: 10,
      resourcesCapacity: 50,
    },
    {
      id: "project-03",
      name: "Machine Learning",
      owner: "wasay",
      description: "A machine learning project.",
      startDate: "2024-02-01",
      endDate: "2026-12-31",
      resourcesUsed: 20,
      resourcesCapacity: 100,
    },
    {
      id: "project-04",
      name: "Mobile App Development",
      owner: "fahim",
      description: "A mobile app development project.",
      startDate: "2023-12-01",
      endDate: "2024-06-30",
      resourcesUsed: 40,
      resourcesCapacity: 100,
    },
  ];

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 970px)" });

  return (
    <div className="container mx-auto my-5">
      <div
        className={cn(
          "grid gap-2",
          isTabletOrMobile ? "grid-cols-1" : "md:grid-cols-3"
        )}
      >
        {sampleProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default TestProjectCards;
