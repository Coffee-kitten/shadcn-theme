import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export const v2boardRequest = axios.create({
  baseURL: (window as any).config.host,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Language": window.localStorage.getItem("i18n"),
  },
  timeout: 10000,
});

const authUrls = [
  "/api/v1/passport/auth/login",
  "/api/v1/passport/auth/register",
];

v2boardRequest.interceptors.request.use((config) => {
  if (!authUrls.includes(config.url as string)) {
    config.headers.Authorization = window.localStorage.getItem("authorization");
  }

  return config;
});

v2boardRequest.interceptors.response.use(
  (request) => {
    if (authUrls.includes(request.config.url as string)) {
      window.localStorage.setItem("authorization", request.data.data.auth_data);
      window.location.assign("/dashboard");
    }

    return request;
  },
  (error) => {
    if (error.message.includes("timeout")) {
      return Promise.reject(error.response);
    }

    if (error.response.status == 403) {
      window.localStorage.removeItem("authorization");
      window.location.assign("/login");
    }

    return Promise.reject(error.response);
  }
);
