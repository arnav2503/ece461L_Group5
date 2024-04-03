import { createContext, useContext, useEffect, useState } from "react";
import resource_management from "@/api/resource_management";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useProject } from "@/contexts/ProjectContext";

interface ResourceContextType {
  id: string;
  name: string;
  capacity: number;
  used: number;
  available: number;

  setResourceId: (resource_id: string) => void;
  setResourceUsed: (used: number) => void;
  updateResource: () => void;

  checkOutResource: (qty: number) => void;
  checkInResource: (qty: number) => void;

  loading: boolean;
}

const ResourceContext = createContext<ResourceContextType>({
  id: "",
  name: "",
  capacity: 0,
  used: 0,
  available: 0,

  setResourceId: () => {},
  setResourceUsed: () => {},
  updateResource: () => {},

  checkOutResource: () => {},
  checkInResource: () => {},

  loading: false,
});

const ResourceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const project = useProject();
  const [resource_id, setResourceId] = useState<string>("");
  const [resource_name, setResourceName] = useState<string>("");
  const [resource_capacity, setResourceCapacity] = useState<number>(0);
  const [resource_used, setResourceUsed] = useState<number>(0);
  const [resource_available, setResourceAvailable] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resource_id) {
      updateResource();
    }
  }, [resource_id]);

  const updateResource = () => {
    setLoading(true);
    resource_management
      .getResourceDetails(resource_id)
      .then((resource) => {
        setResourceName(resource.name);
        setResourceCapacity(resource.capacity);
        setResourceAvailable(resource.available);
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
            description: "An error occurred. Please try again.",
            title: "Error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const checkOutResource = (qty: number) => {
    setLoading(true);
    resource_management
      .checkoutResource(project.id, resource_id, qty)
      .then(() => {
        project.refreshProject();
        updateResource();
        setResourceUsed(resource_used + qty);
        toast({
          variant: "default",
          description: `${qty} checked out from ${project.name} successfully.`,
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
            description: "An error occurred while checking out resources",
            title: "Error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const checkInResource = (qty: number) => {
    setLoading(true);
    resource_management
      .checkinResource(project.id, resource_id, qty)
      .then(() => {
        project.refreshProject();
        updateResource();
        setResourceUsed(resource_used - qty);
        toast({
          variant: "default",
          description: `${qty} checked in to ${project.name} successfully.`,
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
            description: "An error occurred while checking in resources",
            title: "Error",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <ResourceContext.Provider
      value={{
        id: resource_id,
        name: resource_name,
        capacity: resource_capacity,
        used: resource_used,
        available: resource_available,

        setResourceId,
        setResourceUsed,
        updateResource,

        checkOutResource,
        checkInResource,

        loading,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

const useResource = () => {
  const resource = useContext(ResourceContext);
  if (!resource) {
    throw new Error(
      "useResource must be used within a ResourceContextProvider"
    );
  }
  return resource;
};

export { ResourceContext, ResourceContextProvider, useResource };
