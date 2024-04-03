import { useState } from "react";
import { useProject } from "@/contexts/ProjectContext";

function ViewProjectDetails() {
  // @ts-ignore // ! REMOVE THIS LINE ONCE IMPLEMENTED ! //
  const project = useProject();
  // @ts-ignore // ! REMOVE THIS LINE ONCE IMPLEMENTED ! // 
  const [currentProjectData, setCurrentProjectData] = useState();

  return (
    <div>
      <h1>project details here</h1>
    </div>
  );
}

export default ViewProjectDetails;
