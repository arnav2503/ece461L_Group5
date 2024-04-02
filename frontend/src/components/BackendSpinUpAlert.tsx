import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import health from "@/api/health";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BackendSpinUpAlertProps {
  className?: string;
  onBackendActive?: () => void;
}

function BackendSpinUpAlert(props: BackendSpinUpAlertProps) {
  const [backendActive, setBackendActive] = useState(false);
  const [backendError, setBackendError] = useState(false);

  useEffect(() => {
    health
      .backendActive()
      .then((response) => {
        if (response.status === 200) {
          setBackendActive(true);
          if (props.onBackendActive) {
            props.onBackendActive();
          }
        }
      })
      .catch(() => {
        setBackendActive(false);
        setBackendError(true);
      });
  });

  if (backendActive) {
    return null;
  }

  if (backendError) {
    return (
      <Alert
        className={cn(
          "flex flex-row align-middle space-x-3 p-5",
          props.className
        )}
        variant={"destructive"}
      >
        <div className="items-center align-middle justify-center my-auto">
          <AlertTriangle className="size-6" />
        </div>
        <div className="">
          <AlertTitle className="font-bold justify-start text-left">
            Backend Not Started!
          </AlertTitle>
          <AlertDescription className="justify-start text-left">
            The backend is not starting up. Please let us know by raising an
            issue on GitHub.
          </AlertDescription>
        </div>
      </Alert>
    );
  }

  return (
    <Alert
      className={cn(
        "flex flex-row align-middle space-x-3 p-5",
        props.className
      )}
      variant={"destructive"}
    >
      <div className="items-center align-middle justify-center my-auto">
        <AlertTriangle className="size-6" />
      </div>
      <div className="">
        <AlertTitle className="font-bold justify-start text-left">
          Backend Not Started!
        </AlertTitle>
        <AlertDescription className="justify-start text-left">
          The backend is running on shared resources, and takes about one minute
          to spin up. Please wait until this alert disappears to continue.
        </AlertDescription>
      </div>
    </Alert>
  );
}

export default BackendSpinUpAlert;
