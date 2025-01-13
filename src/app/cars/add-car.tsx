import clsx from "clsx";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { RHFDateTimePicker } from "@/components/react-hook-form/rhf-date-time-picker";
import { RHFLabeledInput } from "@/components/react-hook-form/rhf-labeled-input";
import RHFSelect from "@/components/react-hook-form/rhf-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { appRoutes } from "@/constants/app-routes";
import { useCars } from "@/lib/hooks/use-cars";
import { carResolver, CarSchemaType } from "./car.schema";

export function Component() {
  const navigate = useNavigate();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<CarSchemaType>({
    mode: "onChange",
    resolver: carResolver,
  });

  const { addCar, addLoading } = useCars();

  const onSubmit = async (data: CarSchemaType) => {
    const generatedId = `${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}-${data.model}`;

    try {
      const status = await addCar({ ...data, id: generatedId });
      if (status === "success") {
        toast.success("Car added successfully!");
        navigate(appRoutes.car.root);
      } else {
        toast.error("Failed to add the car.");
      }
    } catch (error) {
      console.error("Error submitting car data:", error);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 lg:gap-8"
      onSubmit={handleSubmit(onSubmit)}>
      <Card className="flex flex-col gap-4 lg:gap-8 p-4 lg:p-6">
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
          />

          <RHFDateTimePicker
            {...register("manufactureDate")}
            error={errors.manufactureDate?.message}
            placeholder="Manufacture date"
            triggerClassName="text-xs h-7"
            disabled={addLoading}
          />
        </div>
      </Card>

      <div className="flex gap-2">
        <Button
          type="submit"
          variant="default"
          disabled={addLoading}
          className="flex-1 sm:flex-none min-w-36">
          Add
        </Button>
        <Link
          to={appRoutes.car.root}
          className={clsx("flex-1 sm:flex-none min-w-36", {
            "pointer-events-none": addLoading,
          })}>
          <Button
            variant="destructive"
            className="w-full"
            disabled={addLoading}>
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}

Component.displayName = "AddCar";
