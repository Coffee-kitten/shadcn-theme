// src/lib/fetcher.ts
export const fetcher = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("authorization");

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Language": localStorage.getItem("i18n") || "en",
    ...(token ? { Authorization: token } : {}),
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 403) {
      localStorage.removeItem("authorization");
      window.location.assign("/#/login");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  // 登录注册逻辑
  if (
    url.includes("/passport/auth/login") ||
    url.includes("/passport/auth/register")
  ) {
    localStorage.setItem("authorization", data.data.auth_data);
    window.location.assign("/#/dashboard");
  }

  return data;
};
