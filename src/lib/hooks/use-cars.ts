import { useContext } from "react";

import { CarContext } from "@/lib/contexts/cars-context";

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) throw new Error("useCars must be used within CarsProvider");
  return context;
};
