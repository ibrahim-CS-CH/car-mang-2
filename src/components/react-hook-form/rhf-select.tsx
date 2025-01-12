import { forwardRef, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const RHFSelect = forwardRef<
  HTMLDivElement,
  {
    data: { value: string; label: string }[];
    registration: UseFormRegisterReturn;
    title?: string;
    placeholder?: string;
    defaultValue?: string | null;
    error?: string;
    disabled?: boolean;
    isItemDisabled?: (item: { label: string; value: string }) => boolean;
    required?: boolean;
    hasEmptyValue?: boolean;
    reactiveValue?: any;
    labelClasses?: string;
    onSelect?: (value: string) => void;
  }
>(
  (
    {
      title,
      placeholder,
      data,
      registration,
      defaultValue,
      error,
      disabled = false,
      isItemDisabled,
      required = false,
      hasEmptyValue = false,
      reactiveValue,
      labelClasses,
      onSelect,
    },
    forwardedRef
  ) => {
    const [value, setValue] = useState<string | undefined>(undefined);

    useEffect(() => {
      setValue(reactiveValue);
    }, [reactiveValue]);

    useEffect(() => {
      if (defaultValue) setValue(defaultValue);
    }, [defaultValue]);

    return (
      <div
        className="flex w-full flex-col items-start gap-1"
        ref={forwardedRef}>
        {title && (
          <label
            className={cn("text-sm", labelClasses, {
              "text-destructive": error,
            })}>
            {title}
            <span className="text-destructive"> {required ? "*" : ""}</span>
          </label>
        )}
        <Select
          onValueChange={(key) => {
            const newValue = key !== "none" ? key : "";
            registration.onChange({
              target: { name: registration.name, value: newValue },
            });
            setValue(newValue);
            onSelect?.(newValue);
          }}
          value={value}
          disabled={disabled}>
          <SelectTrigger
            className={cn("min-h-10", {
              "border border-destructive focus:ring-2 focus:ring-destructive focus:ring-offset-2":
                error,
            })}>
            <SelectValue placeholder={placeholder ?? title} />
          </SelectTrigger>
          <SelectContent>
            {hasEmptyValue && (
              <SelectItem value="none" className="opacity-75">
                {"N/A"}
              </SelectItem>
            )}
            {data.map(({ label, value }) => (
              <SelectItem
                key={value}
                value={value + ""}
                disabled={isItemDisabled?.({ value, label })}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);
RHFSelect.displayName = "RHFSelect";

export default RHFSelect;
