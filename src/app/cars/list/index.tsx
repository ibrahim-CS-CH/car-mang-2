import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/table/data-table";
import { appRoutes } from "@/constants/app-routes";
import { Link } from "react-router-dom";
import { CarsListColumns } from "./cars-columns";
import { useCars } from "@/lib/hooks/use-cars";

export function Component() {
  const { cars } = useCars();
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className={"text-2xl font-bold"}>Cars</p>
        <Link to={appRoutes.car.add}>
          <Button className="min-w-32">Add Car</Button>
        </Link>
      </div>

      <div className="container mx-auto py-10">
        <DataTable columns={CarsListColumns} data={cars} />
      </div>
    </section>
  );
}
