import {
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
import { ServerPage } from "@/views/home/Server";
import { Order } from "@/views/home/Order";
import { Plan } from "@/views/home/Plan";
import { Payment } from "@/views/home/Payment";
import { UserPage } from "@/views/home/User";
import { InvitePage } from "@/views/home/Invite";
import { TicketPage } from "@/views/home/Ticket";
import { Layout } from "@/views/auth/layout";
//
function ProtectedRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authorization");
    const currentPath = location.pathname;
    const isAuthPage =
      currentPath === "/login" ||
      currentPath === "/register" ||
      currentPath === "/forgot-password";

    // 如果已登录且访问认证页面，重定向到仪表盘
    if (token && isAuthPage) {
      navigate("/dashboard", { replace: true });
      return;
    }

    // 处理根路径访问
    if (currentPath === "/") {
      if (token) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
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
    path: "*",
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
            element: <ServerPage />,
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
            element: <UserPage />,
          },
          {
            path: "invite",
            element: <InvitePage />,
          },
          {
            path: "ticket",
            element: <TicketPage />,
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
