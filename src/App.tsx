import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//
import "@/assets/index.css";
import "@/assets/main.css";
//
import "@/i18n/index";
//
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
//
import Routers from "@/routers/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routers />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
