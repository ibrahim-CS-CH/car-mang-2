import { Toaster } from "sonner";

import { CarProvider } from "@/lib/contexts/cars-context";
import ThemeProvider from "@/lib/theme/theme-provider";

export default function AppInitialization({
  children,
}: React.PropsWithChildren) {
  return (
    <ThemeProvider>
      <CarProvider>
        {children}
        <Toaster richColors />
      </CarProvider>
    </ThemeProvider>
  );
}
