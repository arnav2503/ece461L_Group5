import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

interface DateRangeProps {
  className?: string;
  onDateChange: (date: DateRange | undefined) => void;
}
interface DateRangeSelectorState {
  date: DateRange | undefined;
}

export class DateRangeSelector extends React.Component<
  DateRangeProps,
  DateRangeSelectorState
> {
  constructor(props: DateRangeProps) {
    super(props);
    this.state = {
      date: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
    };
  }

  render() {
    const { className } = this.props; // Destructure props

    return (
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !this.state.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {this.state.date?.from ? (
                this.state.date.to ? (
                  <>
                    {format(this.state.date.from, "LLLL dd, y")} -{" "}
                    {format(this.state.date.to, "LLLL dd, y")}
                  </>
                ) : (
                  format(this.state.date.from, "LLLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={this.state.date?.from}
              selected={this.state.date}
              onSelect={this.handleDateSelect} // Change here
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  handleDateSelect = (date: DateRange | undefined) => {
    this.setState({ date });
    this.props.onDateChange(date);
  };
}
