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
import { Sidebar } from "@/views/home/Sidebar";
//
import { SignIn } from "@/views/auth/Sign-in";
import { SignUp } from "@/views/auth/Sign-up";
import { ForgotPwd } from "@/views/auth/Forgot-pwd";
import { FourZeroFour } from "@/views/fragments/404";
import { Tos } from "@/views/fragments/tos";
//
import { Dashboard } from "@/views/home/Dashboard";
import { Announcements } from "@/views/home/Announcements";
import { Knowledge } from "@/views/home/Knowledge";
import { Server } from "@/views/home/Server";
import { Order } from "@/views/home/Order";
import { Plan } from "@/views/home/Plan";
import { Payment } from "@/views/home/Payment";
import { User } from "@/views/home/User";
import { Invite } from "@/views/home/Invite";
import { Ticket } from "@/views/home/Ticket";
import { Layout } from "@/views/auth/layout";
//
function ProtectedRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    const isAuthPage =
      location.pathname == "/login" || location.pathname == "/register";

    // 如果已登录且访问认证页面，重定向到仪表盘
    if (token && isAuthPage) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, location.pathname]);

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
        path: "/",
        element: <Layout />,
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
            path: "forgot-password",
            element: <ForgotPwd />,
          },
        ],
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
            path: "store",
            element: <Plan />,
          },
          {
            path: "order/:id",
            element: <Payment />,
          },
          {
            path: "user",
            element: <User />,
          },
          {
            path: "invite",
            element: <Invite />,
          },
          {
            path: "ticket",
            element: <Ticket />,
          },
        ],
      },
    ],
  },
]);

export function Routers() {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}
