import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/app/App";
import "@/lib/theme/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
