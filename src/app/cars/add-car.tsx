import RHFSelect from "@/components/react-hook-form/rhf-select";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { carResolver, CarSchemaType } from "./car.schema";
import { RHFLabeledInput } from "@/components/react-hook-form/rhf-labeled-input";
import { RHFDateTimePicker } from "@/components/react-hook-form/rhf-date-time-picker";

export function Component() {
  // const navigate = useNavigate();
  const {
    formState: { errors },
    register,
  } = useForm<CarSchemaType>({
    mode: "onChange",
    resolver: carResolver,
  });

  return (
    <>
      <Card className="flex flex-col gap-4 lg:gap-8 p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <RHFLabeledInput
            {...register("carModel")}
            label="Car model"
            placeholder="Car model"
            error={errors.carModel?.message}
          />
          <RHFLabeledInput
            {...register("price")}
            label="Price"
            placeholder="Price"
            error={errors.price?.message}
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
            // disabled={!selectedVehicle || mutation.isPending}
            // defaultValue={watch("from")}
            // triggerClassName="text-xs h-7"
          />
        </div>
      </Card>
    </>
  );
}

Component.displayName = "AddCar";
