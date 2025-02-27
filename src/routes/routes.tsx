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
import Orders from "../pages/user/Orders";
import AdminProtectedRoute from "../component/layout/AdminProtectedRoute";
import ProtectedRoute from "../component/layout/ProtectedRoute";
import UpdatePassword from "../pages/user/UpdatePassword";
import OrderManagement from "../pages/admin/OrderManagement";
import ProductManagement from "../pages/admin/ProductManagement";
import CreateProduct from './../pages/admin/CreateUpdate';


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
          element: <ProtectedRoute><CheckoutPage></CheckoutPage></ProtectedRoute> ,
        },
        {
          path: "/order/verify",
          element: <ProtectedRoute><OrderVerifyPage></OrderVerifyPage></ProtectedRoute>,
        },
        {
          path: "/Products/:id",
          element: <ProductDetails></ProductDetails>,
        },
        
      ],
    },
    {
      path: "/sign-in",
      element: <Signin></Signin>,
    },
    {
      path: "/sign-up",
      element: <Signup></Signup>,
    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: "user-management",
          element: <AdminProtectedRoute><UserManagement/></AdminProtectedRoute>,
        },
        {
          path: "order-management",
          element: <AdminProtectedRoute><OrderManagement/></AdminProtectedRoute>,
        },
        {
          path: "product-management",
          element: <AdminProtectedRoute><ProductManagement/></AdminProtectedRoute>,
        },
        {
          path: "create-product",
          element: <AdminProtectedRoute><CreateProduct/></AdminProtectedRoute>,
        },

        // user routes
        {
          path: "order-history",
          element: <ProtectedRoute><Orders/></ProtectedRoute>,
        },
        {
          path: "update-password",
          element: <ProtectedRoute><UpdatePassword/></ProtectedRoute>,
        },
      ],
      
    },
  ]);