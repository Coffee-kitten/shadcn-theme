import { createHashRouter, RouterProvider } from "react-router-dom";

import SignIn from "@/views/auth/Sign-in";
import SignUp from "@/views/auth/Sign-up";
import FourZeroFour from "@/views/404";
import Tos from "@/views/tos";
//
import { Dashboard } from "@/views/home/Dashboard";
//

const router = createHashRouter([
  {
    path: "login",
    element: <SignIn />,
  },
  {
    path: "register",
    element: <SignUp />,
  },
  {
    path: "tos",
    element: <Tos />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "404",
    element: <FourZeroFour />,
  },
]);

export default function Routers() {
  return <RouterProvider router={router} />;
}
