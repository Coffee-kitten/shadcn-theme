// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//
import "../node_modules/sonner/dist/styles.css";
import "@/assets/index.css";
import "@/assets/main.css";
//
import "@/i18n/index";

import { App } from "@/App";

createRoot(document.getElementById("root")!).render(<App />);
