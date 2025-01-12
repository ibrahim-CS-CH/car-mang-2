import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { BootstrapConfig } from "@/app-initialization/app-initialization.types.ts";

export default function BaseRouterProvider({ renderRoutes }: BootstrapConfig) {
  return (
    <RouterProvider
      router={createBrowserRouter(renderRoutes())}
      fallbackElement={<>LOADING...</>}
    />
  );
}
