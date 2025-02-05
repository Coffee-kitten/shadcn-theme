import { createHashRouter, RouterProvider } from "react-router-dom";

import { SignIn } from "@/views/auth/sign-in";
import { SignUp } from "@/views/auth/sign-up";
import { FourZeroFour } from "@/views/fragments/404";
import { Tos } from "@/views/fragments/tos";
//
import { Dashboard } from "@/views/home/dashboard";
import { Announcements } from "@/views/home/announcements";
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
    path: "announcements",
    element: <Announcements />,
  },
  {
    path: "404",
    element: <FourZeroFour />,
  },
]);

export default function Routers() {
  return <RouterProvider router={router} />;
}
