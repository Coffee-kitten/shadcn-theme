import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";
//
import { Sidebar } from "@/views/home/sidebar";
//
import { SignIn } from "@/views/auth/sign-in";
import { SignUp } from "@/views/auth/sign-up";
import { FourZeroFour } from "@/views/fragments/404";
import { Tos } from "@/views/fragments/tos";
//
import { Dashboard } from "@/views/home/dashboard";
import { Announcements } from "@/views/home/announcements";
import { Knowledge } from "@/views/home/knowledge";
import { Server } from "@/views/home/server";
import { Order } from "@/views/home/order";
import { Plan } from "@/views/home/plan";
import { Payment } from "@/views/home/payment";
//

function ProtectedRoutes() {
  return <Outlet />;
}

const router = createHashRouter([
  {
    path: "tos",
    element: <Tos />,
  },
  {
    path: "404",
    element: <FourZeroFour />,
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "/",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "announcements",
            element: <Announcements />,
          },
          {
            path: "server",
            element: <Server />,
          },
          {
            path: "knowledge",
            element: <Knowledge />,
          },
          {
            path: "order",
            element: <Order />,
          },
          {
            path: "plan",
            element: <Plan />,
          },
          {
            path: "order/:id",
            element: <Payment />,
          },
        ],
      },
    ],
  },
]);

export function Routers() {
  return <RouterProvider router={router} />;
}
