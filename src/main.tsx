import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/index.css";

//
import { createHashRouter, RouterProvider } from "react-router-dom";
//
import { ThemeProvider } from "@/components/theme-provider";

//
import App from "@/App.tsx";
import SignIn from "@/views/auth/Sign-in";
//

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "login",
    element: <SignIn />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
