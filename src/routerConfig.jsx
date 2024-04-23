import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { Landing } from "./screens/Landing";
import { ProductListing } from "./screens/ProductListing";
import { Layout } from "./screens/Layout";

export const routerConfig = ([
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

