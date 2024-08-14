import axios from "axios";
import { useNavigate } from "react-router-dom";

export const v2boardRequest = axios.create({
  baseURL: (window as any).config.host,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Language": window.localStorage.getItem("i18n"),
  },
  timeout: 10000,
});

v2boardRequest.interceptors.request.use((config) => {
  const authUrls = [
    "/api/v1/passport/auth/login",
    "/api/v1/passport/auth/register",
  ];

  if (!authUrls.includes(config.url as string)) {
    config.headers.Authorization = window.localStorage.getItem("authorization");
  }

  return config;
});

v2boardRequest.interceptors.response.use(
  (request) => {
    const authUrls = [
      "/api/v1/passport/auth/login",
      "/api/v1/passport/auth/register",
    ];

    if (authUrls.includes(request.config.url as string)) {
      window.localStorage.setItem("authorization", request.data.data.auth_data);
      useNavigate()("/dashboard");
    }

    return request;
  },
  (error) => {
    if (error.message.includes("timeout")) {
      return;
    }

    if (error.response?.status === 403) {
      window.localStorage.removeItem("authorization");
      useNavigate()("/sign-in");
      return;
    }

    return Promise.reject(error.response);
  }
);
