import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { Landing } from "./screens/Landing";
import { ProductListing } from "./screens/ProductListing";
import { Layout } from "./screens/Layout";
import { ProductScreen } from "./screens/ProductScreen";
import { Details } from "./screens/Details";
import { Navigate } from "react-router-dom";
import { PanelProductListing } from "./screens/PanelProductsListing";
import { FavoriteProductsListing } from "./screens/FavoriteProductsListing";

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
      {
        path: "/product/:productId",
        element: <ProductScreen />,
      },
      {
        path: "/details",
        element: <Details />,
      },
      {
        path: "/favorites",
        element: <FavoriteProductsListing />,
      },
      {
        path: "/panel",
        element: <Navigate to="/panel/products" />,
      },
      {
        path: "/panel/products",
        element: <PanelProductListing />
      },
    ],
  }
]);

