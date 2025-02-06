import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import NotFound from "../pages/NotFound";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <NotFound></NotFound>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/about",
          element: <About></About>,
        },
        {
          path: "/Products",
          element: <Products></Products>,
        },
        {
          path: "/Products/:id",
          element: <ProductDetails></ProductDetails>,
        },
        {
          path: "/sign-in",
          element: <Signin></Signin>,
        },
        {
          path: "/sign-up",
          element: <Signup></Signup>,
        },
        
      ],
    },
  ]);