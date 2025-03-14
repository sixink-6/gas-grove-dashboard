
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ReportDateRangePickerProps {
  dateRange: {
    from: Date;
    to: Date;
  };
  setDateRange: React.Dispatch<React.SetStateAction<{
    from: Date;
    to: Date;
  }>>;
}

const ReportDateRangePicker = ({ dateRange, setDateRange }: ReportDateRangePickerProps) => {
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date-from"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              format(dateRange.from, "MMM d, yyyy")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            selected={dateRange.from}
            onSelect={(date) => 
              date && setDateRange(prev => ({ ...prev, from: date }))
            }
            disabled={(date) => date > new Date() || date > dateRange.to}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date-to"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange.to && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.to ? (
              format(dateRange.to, "MMM d, yyyy")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="single"
            selected={dateRange.to}
            onSelect={(date) => 
              date && setDateRange(prev => ({ ...prev, to: date }))
            }
            disabled={(date) => date > new Date() || date < dateRange.from}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ReportDateRangePicker;
