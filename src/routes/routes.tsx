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
import Dashboard from "../component/layout/Dashboard/Dashboard";
import CheckoutPage from "../pages/CheckOut";
import OrderVerifyPage from "../pages/OrderVerify";
import UserManagement from "../pages/admin/UserManagement";


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
          path: "/checkout",
          element: <CheckoutPage></CheckoutPage>,
        },
        {
          path: "/order/verify",
          element: <OrderVerifyPage></OrderVerifyPage>,
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
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: "user-management",
          element: <UserManagement/>,
        }
      ],
      
    },
  ]);