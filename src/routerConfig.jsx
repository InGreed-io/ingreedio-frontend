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
import TermsAndConditions from "./screens/TermsAndConditions";
import Pricing from "./screens/Pricing";
import AboutUs from "./screens/AboutUs";
import { PanelReviewsListing } from "./screens/PanelReviewsListing";
import {PanelUsersListing} from "./screens/PanelUsersListing";
import { PanelLayout } from "./screens/PanelLayout";
import { UserLayout } from "./screens/UserLayout";

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
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/tos",
        element: <TermsAndConditions />,
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
    ],
  },
  {
    element: <UserLayout />,
    path: "user",
    children: [
      {
        path: "details",
        element: <Details />,
      },
      {
        path: "favorites",
        element: <FavoriteProductsListing />,
      },
    ],
  },
  {
    element: <PanelLayout />,
    path: "panel",
    children: [
      {
        path: "",
        element: <Navigate to="/panel/products" />,
      },
      {
        path: "products",
        element: <PanelProductListing />
      },
      {
        path: "reported",
        element: <PanelReviewsListing />
      },
      {
        path: "users",
        element: <PanelUsersListing />
      },
    ],
  }
]);

