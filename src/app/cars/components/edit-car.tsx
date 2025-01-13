import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { RHFDateTimePicker } from "@/components/react-hook-form/rhf-date-time-picker";
import { RHFLabeledInput } from "@/components/react-hook-form/rhf-labeled-input";
import RHFSelect from "@/components/react-hook-form/rhf-select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { carResolver, CarSchemaType } from "../car.schema";
import { useCars } from "@/lib/hooks/use-cars";
import { toast } from "sonner";

export function EditCar({
  open,
  setOpen,
  car,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  car: Car;
}) {
  const { updateCar, updateLoading } = useCars();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<CarSchemaType>({
    mode: "onChange",
    resolver: carResolver,
    values: car
      ? {
          color: car.color,
          price: car.price,
          model: car.model,
          manufactureDate: car.manufactureDate,
        }
      : undefined,
  });

  const onSubmit = async (data: CarSchemaType) => {
    if (data) {
      const update = await updateCar(car.id, data);
      if (update === "success") {
        toast.success("Updated successfuly!");
        setOpen(!open);
      } else {
        toast.error("Oops!. Error");
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="">Edit Car "{car.model}"</DialogTitle>
          <DialogDescription>
            Make changes to your car here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row gap-4">
            <RHFLabeledInput
              {...register("model")}
              label="Car model"
              placeholder="Car model"
              error={errors.model?.message}
            />
            <RHFLabeledInput
              {...register("price", {
                setValueAs: (value) => (value ? +value : undefined),
              })}
              label="Price"
              placeholder="Price"
              error={errors.price?.message}
              type="number"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <RHFSelect
              data={[
                { label: "White", value: "White" },
                { label: "Black", value: "Black" },
                { label: "Red", value: "Red" },
                { label: "Blue", value: "Blue" },
              ]}
              placeholder="Color"
              registration={{ ...register("color") }}
              error={errors.color?.message}
              defaultValue={car?.color}
            />

            <RHFDateTimePicker
              {...register("manufactureDate")}
              error={errors.manufactureDate?.message}
              placeholder="Manufacture date"
              triggerClassName="text-xs h-7"
              defaultValue={car?.manufactureDate}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!isDirty || updateLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
