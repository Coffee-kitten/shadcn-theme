// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//
import "../node_modules/sonner/dist/styles.css";
import "@/assets/index.css";
import "@/assets/main.css";
//
import "@/i18n/index";
//
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://0551c31e4fe3f99ba3b5263497ae8d6c@o4510577514971136.ingest.us.sentry.io/4510577521721344",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

import { App } from "@/App";

createRoot(document.getElementById("root")!).render(<App />);
