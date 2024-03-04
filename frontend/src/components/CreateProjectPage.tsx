import CreateProjectForm from "@/components/CreateProjectForm";
import { Toaster } from "@/components/ui/toaster";

function CreateProjectPage() {
  return (
    <>
      <CreateProjectForm className="p-10" />
      <Toaster />
    </>
  );
}

export default CreateProjectPage;
