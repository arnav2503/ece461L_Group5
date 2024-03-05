import CreateProjectForm from "@/components/CreateProjectForm";
import { Toaster } from "@/components/ui/toaster";
import PageHeader from "./PageHeader";

function CreateProjectPage() {
  return (
    <>
      <PageHeader em="Create Project" />
      <CreateProjectForm className="p-10" />
      <Toaster />
    </>
  );
}

export default CreateProjectPage;
