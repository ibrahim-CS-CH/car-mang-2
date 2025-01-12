import { Button } from "@/components/ui/button";
import { appRoutes } from "@/constants/app-routes";
import { Link } from "react-router-dom";

export function Component() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className={"text-2xl font-bold"}>Cars</p>
        <Link to={appRoutes.car.add}>
          <Button className="min-w-32">Add Car</Button>
        </Link>
      </div>
    </section>
  );
}
