import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { routerConfig } from "./routerConfig";

export const App = () => {
  const router = createBrowserRouter(routerConfig);

  return (
    <RouterProvider router={router} />
  );
};

