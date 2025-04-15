import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/DatePicker/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/DatePicker/components/popover";
import { cn } from "@/lib/utils";

export function DatePicker({
  className,
  text,
  ...props
}: React.ComponentProps<"div"> & { text: string }) {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className={className} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] !px-2 justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: ru }) : <span>{text}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto !px-2 !py-4">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
}
