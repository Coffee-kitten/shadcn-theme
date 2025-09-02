import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//
import "../node_modules/sonner/dist/styles.css";
import "@/assets/index.css";
import "@/assets/main.css";
//
import "@/i18n/index";
//
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "@/components/ui/sonner";

//
import { Routers } from "@/routers/index.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Routers />
    <Toaster />
    <StrictMode></StrictMode>
    <ToastContainer position="top-center" closeButton richColors />
  </ThemeProvider>
);
