import { DateRangeSelector } from "@/components/DateRangeSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProject } from "@/contexts/ProjectContext";
import { useState } from "react";
import { DateRange } from "react-day-picker";

function UpdateProjectForm() {
  const [input, setInput] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const project = useProject();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      dateRange === undefined ||
      dateRange.from === undefined ||
      dateRange.to === undefined
    ) {
      return;
    } else {
      project.updateStartDate(dateRange.from.toDateString());
      project.updateEndDate(dateRange.to.toDateString());
    }
  };

  return (
    <>
      <h2 className="text-2xl text-center font-bold mb-5">{project.name}</h2>
      <p className="text-center text-lg">{project.description}</p>
      <p className="text-center text-lg">{project.start_date}</p>
      <p className="text-center text-lg">{project.end_date}</p>

      <form onSubmit={handleSubmit}>
        <DateRangeSelector onDateChange={(d) => setDateRange(d)} />
        <Button type="submit">Update Project</Button>
      </form>
    </>
  );
}

export default UpdateProjectForm;
