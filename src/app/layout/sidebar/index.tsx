import { clsx } from "clsx";
import { Car } from "lucide-react";
import { Link } from "react-router-dom";

import MenuItem from "@/app/layout/sidebar/menu-item.tsx";
import { appRoutes } from "@/constants/app-routes.ts";

export default function Sidebar() {
  return (
    <aside
      className={clsx([
        "bg-secondary text-secondary-foreground basis-60 min-h-screen",
        "hidden md:block",
      ])}>
      <div className="sticky top-0">
        <div className="flex flex-col gap-4 h-full overflow-auto">
          <Link
            to={appRoutes.root}
            className="flex justify-center items-center h-14">
            <img src="/Logo.svg" />
          </Link>

          <nav className="flex flex-col">
            <MenuItem to={appRoutes.car.root} title="Cars" icon={<Car />} />
          </nav>
        </div>
      </div>
    </aside>
  );
}
