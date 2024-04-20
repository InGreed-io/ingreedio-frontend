import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { Landing } from "./screens/Landing";
import { ProductListing } from "./screens/ProductListing";
import { Layout } from "./screens/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/products",
        element: <ProductListing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  }
]);

export const App = () => {
  return (
      <RouterProvider router={router} />
  );
};

