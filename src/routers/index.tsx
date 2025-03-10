import {
  createBrowserRouter,
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
//

function ProtectedRoutes() {
  return <Outlet />;
}

const router = createBrowserRouter([
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
        element: <Sidebar />, // 父路由组件
        children: [
          {
            path: "dashboard", // 完整路径将是 /home/dashboard
            element: <Dashboard />,
          },
          {
            path: "announcements", // 完整路径将是 /home/announcements
            element: <Announcements />,
          },
          {
            path: "server", // 完整路径将是 /home/server
            element: <Server />,
          },
          {
            path: "knowledge", // 完整路径将是 /home/knowledge
            element: <Knowledge />,
          },
          {
            path: "order", // 完整路径将是 /home/order
            element: <Order />,
          },
        ],
      },
    ],
  },
]);

export function Routers() {
  return <RouterProvider router={router} />;
}
