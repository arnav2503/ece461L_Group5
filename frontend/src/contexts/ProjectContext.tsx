import { createContext, useContext, useEffect, useState } from "react";
import project_management from "@/api/project_management";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

interface ProjectContextType {
  id: string;
  name: string;
  owner: string;
  description: string;
  start_date: string;
  end_date: string;
  hardware_list: JSON;
  resources_used: number;
  resources_capacity: number;
  users: string[];

  project_found: boolean;

  setProjectId: (project_id: string) => void;
  refreshProject: () => void;
  assignUser: () => void;
  unassignUser: () => void;
  deleteProject: () => void;

  updateName: (name: string) => void;
  updateDescription: (description: string) => void;
  updateStartDate: (start_date: string) => void;
  updateEndDate: (end_date: string) => void;

  loading: boolean;
}

const ProjectContext = createContext<ProjectContextType>({
  id: "",
  name: "",
  owner: "",
  description: "",
  start_date: "",
  end_date: "",
  hardware_list: JSON.parse("{}"),
  resources_used: 0,
  resources_capacity: 0,
  users: [],

  project_found: false,

  setProjectId: () => {},
  refreshProject: () => {},
  assignUser: () => {},
  unassignUser: () => {},
  deleteProject: () => {},

  updateName: () => {},
  updateDescription: () => {},
  updateStartDate: () => {},
  updateEndDate: () => {},

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
  const [project_description, setProjectDescription] = useState<string>("");
  const [project_start_date, setProjectStartDate] = useState<string>("");
  const [project_end_date, setProjectEndDate] = useState<string>("");
  const [project_resources, setProjectResources] = useState(JSON.parse("{}"));
  const [project_resources_used, setProjectResourcesUsed] = useState(0);
  const [project_resources_capacity, setProjectResourcesCapacity] = useState(0);
  const [project_users, setProjectUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [project_found, setProjectFound] = useState(false);

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
        setProjectDescription(project.description);
        setProjectStartDate(project.start_date);
        setProjectEndDate(project.end_date);
        setProjectResources(project.hardware_list);
        setProjectResourcesUsed(project.resources_used);
        setProjectResourcesCapacity(project.resources_capacity);
        setProjectUsers(project.users);
        setProjectFound(true);
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

  const assignUser = () => {
    setLoading(true);
    project_management
      .assignProject(project_id)
      .then(() => {
        updateProject();
        toast({
          variant: "default",
          description: "User assigned successfully.",
          title: "Success",
        });
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
            description: "An error occurred while assigning the user",
            title: "Error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const unassignUser = () => {
    setLoading(true);
    project_management
      .unassignProject(project_id)
      .then(() => {
        updateProject();
        toast({
          variant: "default",
          description: "User unassigned successfully.",
          title: "Success",
        });
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
            description: "An error occurred while unassigning the user",
            title: "Error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteProject = () => {
    setLoading(true);
    project_management
      .deleteProject(project_id)
      .then(() => {
        toast({
          variant: "default",
          description: "Project deleted successfully.",
          title: "Success",
        });
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
            description: "An error occurred while deleting the project",
            title: "Error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateName = (name: string) => {
    setLoading(true);
    project_management
      .updateName(project_id, name)
      .then(() => {
        updateProject();
        toast({
          variant: "default",
          description: "Project name updated successfully.",
          title: "Success",
        });
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
            description: "An error occurred while updating the project name",
            title: "Error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateDescription = (description: string) => {
    setLoading(true);
    project_management
      .updateDescription(project_id, description)
      .then(() => {
        updateProject();
        toast({
          variant: "default",
          description: "Project description updated successfully.",
          title: "Success",
        });
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
            description:
              "An error occurred while updating the project description",
            title: "Error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateStartDate = (start_date: string) => {
    setLoading(true);
    project_management
      .updateStartDate(project_id, new Date(start_date))
      .then(() => {
        updateProject();
        toast({
          variant: "default",
          description: "Project start date updated successfully.",
          title: "Success",
        });
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
            description:
              "An error occurred while updating the project start date",
            title: "Error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateEndDate = (end_date: string) => {
    setLoading(true);
    project_management
      .updateEndDate(project_id, new Date(end_date))
      .then(() => {
        updateProject();
        toast({
          variant: "default",
          description: "Project end date updated successfully.",
          title: "Success",
        });
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
            description:
              "An error occurred while updating the project end date",
            title: "Error",
          });
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
        description: project_description,
        start_date: project_start_date,
        end_date: project_end_date,
        hardware_list: project_resources,
        resources_used: project_resources_used,
        resources_capacity: project_resources_capacity,
        users: project_users,

        project_found: project_found,

        setProjectId,
        refreshProject: updateProject,
        assignUser,
        unassignUser,
        deleteProject,

        updateName,
        updateDescription,
        updateStartDate,
        updateEndDate,

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
