import { useState } from "react";
import { useProject } from "@/contexts/ProjectContext";

function ViewProjectDetails() {
  const project = useProject();
  const [currentProjectData, setCurrentProjectData] = useState();

  return (
    <div>
      <h1>project details here</h1>
    </div>
  );
}

export default ViewProjectDetails;