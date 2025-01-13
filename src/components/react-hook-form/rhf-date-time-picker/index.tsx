import { format, getHours, getMinutes } from "date-fns";
import DatePickerProvider from "headless-react-datepicker";
import { CalendarIcon } from "lucide-react";
import { ChangeEventHandler, forwardRef, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import CustomDatePicker from "@/components/react-hook-form/rhf-date-time-picker/custom-date-picker.tsx";
import { getHijriDate } from "@/components/react-hook-form/rhf-date-time-picker/date-time-picker.utils.ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const RHFDateTimePicker = forwardRef<
  HTMLDivElement,
  UseFormRegisterReturn & {
    error?: string | null;
    label?: string;
    placeholder?: string;
    defaultValue?: string;
    required?: boolean;
    addTime?: boolean;
    isHijri?: boolean;
    datePickerProps?: React.ComponentProps<typeof DatePickerProvider>;
    className?: string;
    triggerClassName?: string;
  }
>(
  (
    {
      onChange,
      name,
      error,
      label,
      placeholder,
      defaultValue,
      datePickerProps,
      addTime = false,
      isHijri = false,
      required = false,
      disabled = false,
      className,
      triggerClassName,
    },
    ref
  ) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState<string>("00:00");

    const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const time = e.target.value;
      if (!date) {
        setTime(time);
        return;
      }
      const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
      const newSelectedDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hours,
        minutes
      );
      setDate(newSelectedDate);
      onChange({ target: { name, value: newSelectedDate.toISOString() } });
      setTime(time);
    };

    const handleDaySelect = (date: Date | undefined) => {
      if (!time || !date) {
        setDate(date);
        return;
      }
      const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hours,
        minutes
      );
      setDate(newDate);
      onChange({ target: { name, value: newDate.toISOString() } });
    };

    useEffect(() => {
      if (defaultValue) setDate(new Date(defaultValue));
    }, [defaultValue]);

    useEffect(() => {
      if (defaultValue) {
        const d = new Date(defaultValue);
        setTime(
          `${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(
            -2
          )}`
        );
      }
    }, [defaultValue]);

    return (
      <Popover>
        <div className={cn("w-full", className)}>
          {label && (
            <p
              className={cn(
                "pb-1 text-sm opacity-75",
                !!error && "text-destructive"
              )}>
              {label}
              <span className="text-destructive"> {required ? "*" : ""}</span>
            </p>
          )}
          <PopoverTrigger asChild>
            <button
              className={cn(
                "h-8 w-full",
                "flex items-center gap-3 rounded border border-border bg-input px-2 focus:ring-2 focus:ring-ring",
                !date && "text-muted-foreground",
                !!error && "border-destructive",
                disabled && "cursor-not-allowed opacity-50",
                triggerClassName
              )}
              disabled={disabled}>
              <CalendarIcon size={18} className="opacity-75 shrink-0" />
              {date ? (
                <span>
                  {isHijri ? getHijriDate("en-US")(date) : format(date, "PPpp")}
                </span>
              ) : (
                <span className="opacity-60">
                  {placeholder ?? label ?? "pick_date"}
                </span>
              )}
            </button>
          </PopoverTrigger>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
        <PopoverContent className="w-auto p-0" ref={ref}>
          <>
            <CustomDatePicker
              onChange={(d) => {
                handleDaySelect(d as Date);
              }}
              value={date ?? new Date()}
              {...datePickerProps}
              config={{
                locale: "en-US",
                ...(datePickerProps ? datePickerProps.config : {}),
              }}
            />
            {addTime && (
              <div className="flex items-center justify-center py-2">
                <input
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                  min={
                    datePickerProps?.config
                      ? datePickerProps.config.minDate
                        ? `${getHours(
                            datePickerProps.config.minDate
                          )}:${getMinutes(datePickerProps.config.minDate)}`
                        : undefined
                      : undefined
                  }
                  max={
                    datePickerProps?.config
                      ? datePickerProps.config.maxDate
                        ? `${getHours(
                            datePickerProps.config.maxDate
                          )}:${getMinutes(datePickerProps.config.maxDate)}`
                        : undefined
                      : undefined
                  }
                />
              </div>
            )}
          </>
        </PopoverContent>
      </Popover>
    );
  }
);
RHFDateTimePicker.displayName = "RHFDateTimePicker";
