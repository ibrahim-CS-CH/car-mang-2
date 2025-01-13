import { Car, ChevronUp } from "lucide-react";
import { useState } from "react";

import MenuItem from "@/app/layout/sidebar/menu-item.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import { appRoutes } from "@/constants/app-routes.ts";

export default function DrawerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <div className="fixed bottom-1 inline-flex justify-center w-full">
          <ChevronUp
            className="w-8 h-8 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>

        <DrawerContent className="">
          <MenuItem
            to={appRoutes.car.root}
            title="Cars"
            icon={<Car />}
            onClick={() => setOpen(false)}
          />

          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
