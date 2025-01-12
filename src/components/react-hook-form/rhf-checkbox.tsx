"use client";

import { forwardRef, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";

const RHFCheckbox = forwardRef<
  HTMLButtonElement,
  Omit<React.HTMLAttributes<HTMLButtonElement>, "defaultValue"> &
    Omit<UseFormRegisterReturn, "ref"> & {
      label: string;
      labelClasses?: string;
      defaultValue?: boolean | null;
    }
>(({ name, label, labelClasses, defaultValue, onChange, ...props }, ref) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(!!defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex items-center gap-1">
      <Checkbox
        ref={ref}
        id={name}
        checked={checked}
        onCheckedChange={(v) => {
          onChange({ target: { name, value: v } });
          setChecked(v as boolean);
        }}
        {...props}
      />
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
    </div>
  );
});
RHFCheckbox.displayName = "RHFCheckbox";

export default RHFCheckbox;
