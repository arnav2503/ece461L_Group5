import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useResource } from "@/contexts/ResourceContext";
import ResourceForm from "@/components/resource-management/ResourceForm";
import { Database, Dot } from "lucide-react";

interface ResourceCardProps {
  id: string;
  className?: string;
  used: number;
}

function ResourceCard(props: ResourceCardProps) {
  const resource = useResource();
  resource.setResourceId(props.id);
  resource.setResourceUsed(props.used);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row align-baseline justify-center">
            <Database className="size-6 mr-3" />
            {resource.name}
          </div>
        </CardTitle>
        <CardDescription>
          <small>id: </small>hw-{resource.id}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <section className="flex flex-row justify-between w-5/6">
          <div className="flex flex-row">
            <Dot className=" dark:text-red-500 text-red-700" />
            Used:
          </div>
          <p>{resource.used}</p>
        </section>
        <section className="flex flex-row justify-between w-5/6">
          <div className="flex flex-row">
            <Dot className="dark:text-green-500 text-green-700" />
            Available:
          </div>
          <p>{resource.available}</p>
        </section>
        <section className="flex flex-row justify-between w-5/6">
          <div className="flex flex-row">
            <Dot className="dark:text-blue-500 text-blue-700" />
            Capacity:
          </div>
          <p>{resource.capacity}</p>
        </section>
        <ResourceForm />
      </CardContent>
    </Card>
  );
}

export default ResourceCard;
