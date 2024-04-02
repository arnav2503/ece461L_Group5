import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResource } from "@/contexts/ResourceContext";
import {
  ThickArrowDownIcon,
  ThickArrowUpIcon,
  MinusIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";

interface ResourceFormProps {
  className?: string;
  disabled?: boolean;
}

function ResourceForm(props: ResourceFormProps) {
  const resource = useResource();
  const [qty, setQty] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };
  const decreaseQty = () => {
    if (qty <= 0) return;
    setQty(qty - 1);
  };

  return (
    <>
      <form className={cn("mt-7", props.className)} onSubmit={handleSubmit}>
        <div className="flex flex-col items-center space-y-5">
          <div className="flex flex-row justify-center align-middle items-center gap-1 w-2/3">
            <Button
              onClick={decreaseQty}
              className="bg-red-700 dark:bg-red-500 flex-shrink-0"
              disabled={props.disabled}
            >
              <MinusIcon className="size-4" />
            </Button>
            <Input
              type="number"
              className="numeric-input text-center flex-shrink"
              value={qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
              disabled={props.disabled}
            />
            <Button
              onClick={increaseQty}
              className="bg-green-700 dark:bg-green-500 flex-shrink-0"
              disabled={props.disabled}
            >
              <PlusIcon className="size-4" />
            </Button>
          </div>
          <Slider
            className="my-5 w-3/4 mx-auto"
            value={[qty]}
            max={Math.max(resource.available, resource.used)}
            onValueChange={(value) => setQty(value[0])}
            disabled={props.disabled}
          />
          <div className="flex flex-row justify-center align-middle items-center gap-1 m-2">
            <Button
              type="submit"
              variant="default"
              onClick={() => resource.checkOutResource(qty)}
              className=""
              disabled={props.disabled}
            >
              <ThickArrowDownIcon className="mr-2" />
              Check Out
            </Button>
            <Button
              type="submit"
              variant="default"
              onClick={() => resource.checkInResource(qty)}
              disabled={props.disabled}
            >
              <ThickArrowUpIcon className="mr-2" />
              Check In
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ResourceForm;
