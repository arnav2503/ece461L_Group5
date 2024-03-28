import { createContext, useContext, useEffect, useState } from "react";
import project_management from "@/api/project_management";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { set } from "date-fns";

interface ProjectContextType {
  id: string;
  name: string;
  resources: any[];
  users: string[];

  setProjectId: (project_id: string) => void;
  updateProject: () => void;
  checkOutResource: (resourceId: string, qty: number) => void;
  checkInResource: (resourceId: string, qty: number) => void;

  loading: boolean;
}

const ProjectContext = createContext<ProjectContextType>({
  id: "",
  name: "",
  resources: [],
  users: [],

  setProjectId: () => {},
  updateProject: () => {},
  checkOutResource: () => {},
  checkInResource: () => {},

  loading: false,
});

const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [project_id, setProjectId] = useState<string>("");
  const [project_name, setProjectName] = useState<string>("");
  const [project_resources, setProjectResources] = useState<any[]>([]);
  const [project_users, setProjectUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updateProject();
  }, [project_id]);

  const updateProject = () => {
    setLoading(true);
    project_management
      .getProjectDetails(project_id)
      .then((project) => {
        setProjectName(project.name);
        setProjectResources(project.resources);
        setProjectUsers(project.users);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          toast({
            variant: "destructive",
            description: error.response?.data.message,
            title: "Error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const checkOutResource = (resourceId: string, qty: number) => {
    // Checkout resource
  };
  const checkInResource = (resourceId: string, qty: number) => {
    // Checkin resource
  };

  return (
    <ProjectContext.Provider
      value={{
        id: project_id,
        name: project_name,
        resources: project_resources,
        users: project_users,

        setProjectId,
        updateProject,
        checkOutResource,
        checkInResource,

        loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const project = useContext(ProjectContext);
  if (!project) {
    throw new Error("useProject must be used within a ProjectContextProvider");
  }
  return project;
};

export default { ProjectContext, ProjectContextProvider, useProject };
