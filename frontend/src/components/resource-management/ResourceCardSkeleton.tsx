import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database, Dot } from "lucide-react";
import ResourceForm from "@/components/resource-management/ResourceForm";

function ResourceCardSkeleton() {
  return (
    <Skeleton>
      <Card className="opacity-0 select-none">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row align-baseline justify-center ">
              <Database className="size-6 mr-3 opacity-0 select-none" />
              {"loading"}
            </div>
          </CardTitle>
          <CardDescription className="opacity-0 select-none">
            <small>id: </small>hw-{0}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center opacity-0 select-none">
          <section className="flex flex-row justify-between w-5/6">
            <div className="flex flex-row">
              <Dot className=" dark:text-red-500 text-red-700" />
              Used:
            </div>
            <p>{"loading"}</p>
          </section>
          <section className="flex flex-row justify-between w-5/6">
            <div className="flex flex-row">
              <Dot className="dark:text-green-500 text-green-700" />
              Available:
            </div>
            <p>{"loading"}</p>
          </section>
          <section className="flex flex-row justify-between w-5/6">
            <div className="flex flex-row">
              <Dot className="dark:text-blue-500 text-blue-700" />
              Capacity:
            </div>
            <p>{"loading"}</p>
          </section>
          <ResourceForm className="opacity-0 select-none" disabled />
        </CardContent>
      </Card>
    </Skeleton>
  );
}

export default ResourceCardSkeleton;
