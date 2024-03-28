import { createContext, useContext, useEffect, useState } from "react";
import project_management from "@/api/project_management";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

interface ProjectContextType {
  id: string;
  name: string;
  owner: string;
  start_date: string;
  end_date: string;
  resources: JSON;
  users: string[];

  setProjectId: (project_id: string) => void;
  updateProject: () => void;

  loading: boolean;
}

const ProjectContext = createContext<ProjectContextType>({
  id: "",
  name: "",
  owner: "",
  start_date: "",
  end_date: "",
  resources: JSON.parse("{}"),
  users: [],

  setProjectId: () => {},
  updateProject: () => {},

  loading: false,
});

const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [project_id, setProjectId] = useState<string>("");
  const [project_name, setProjectName] = useState<string>("");
  const [project_owner, setProjectOwner] = useState<string>("");
  const [project_start_date, setProjectStartDate] = useState<string>("");
  const [project_end_date, setProjectEndDate] = useState<string>("");
  const [project_resources, setProjectResources] = useState(JSON.parse("{}"));
  const [project_users, setProjectUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project_id) {
      updateProject();
    }
  }, [project_id]);

  const updateProject = () => {
    setLoading(true);
    project_management
      .getProjectDetails(project_id)
      .then((project) => {
        setProjectName(project.name);
        setProjectOwner(project.owner);
        setProjectStartDate(project.start_date);
        setProjectEndDate(project.end_date);
        setProjectResources(project.hardware_list);
        setProjectUsers(project.users);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          toast({
            variant: "destructive",
            description: error.response?.data.error,
            title: "Error",
          });
        } else {
          toast({
            variant: "destructive",
            description: "An error occurred while fetching project details",
            title: "Error",
          });
          console.log(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ProjectContext.Provider
      value={{
        id: project_id,
        name: project_name,
        owner: project_owner,
        start_date: project_start_date,
        end_date: project_end_date,
        resources: project_resources,
        users: project_users,

        setProjectId,
        updateProject,

        loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

const useProject = () => {
  const project = useContext(ProjectContext);
  if (!project) {
    throw new Error("useProject must be used within a ProjectContextProvider");
  }
  return project;
};

export { ProjectContext, ProjectContextProvider, useProject };
