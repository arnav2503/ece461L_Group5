import CreateProjectForm from "./CreateProjectForm";
import { Toaster } from "./ui/toaster";

function CreateProjectPage() {
  return (
    <>
      <CreateProjectForm className="p-10" />
      <Toaster />
    </>
  );
}

export default CreateProjectPage;
