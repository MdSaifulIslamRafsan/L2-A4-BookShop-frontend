import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
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