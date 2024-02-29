import ProjectCard from "@/components/ProjectCard";

const TestProjectCards = () => {
  const sampleProjects = [
    {
      id: "project-01",
      owner: "Alice",
      description: "A collaborative web development project.",
      startDate: "2023-12-05",
      endDate: "2024-03-20",
      isCurrentUserOwner: true,
      resourcesUsed: 35,
      resourcesCapacity: 100,
    },
    {
      id: "project-02",
      owner: "Bob",
      description: "Data analysis and visualization.",
      startDate: "2023-11-18",
      endDate: "2023-12-31",
      isCurrentUserOwner: false,
      resourcesUsed: 10,
      resourcesCapacity: 50,
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-6">
        {sampleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onDelete={() => console.log("Delete:", project.id)}
            onUnassign={() => console.log("Manage:", project.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestProjectCards;
