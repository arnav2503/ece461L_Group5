import ProjectCard from "@/components/ProjectCard";

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
      owner: "Bob",
      description: "Data analysis and visualization.",
      startDate: "2023-11-18",
      endDate: "2023-12-31",
      resourcesUsed: 10,
      resourcesCapacity: 50,
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-6">
        {sampleProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default TestProjectCards;
