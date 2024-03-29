import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { useProject } from "@/contexts/ProjectContext";
import { useState } from "react";

function UpdateProjectForm() {
  const project = useProject();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    project.updateStartDate(selectedDate!.toDateString());
    e.preventDefault();
  };

  return (
    <>
      <h2 className="text-2xl text-center font-bold mb-5">{project.name}</h2>
      <p className="text-center text-lg">{project.description}</p>
      <p className="text-center text-lg">{project.start_date}</p>
      <p className="text-center text-lg">{project.end_date}</p>

      <form onSubmit={handleSubmit}>
        <DatePicker onDateChange={handleDateChange} />
        <Button type="submit">Update Project</Button>
      </form>
    </>
  );
}

export default UpdateProjectForm;
