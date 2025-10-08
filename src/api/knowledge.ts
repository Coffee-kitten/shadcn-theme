import { v2boardRequest } from "@/utils/requests";

export const knowledgeFetchGet = (
  language: string = localStorage.getItem("i18n") || "zh-CN"
) => {
  return v2boardRequest({
    url: "/api/v1/user/knowledge/fetch",
    method: "get",
    params: {
      language,
    },
  });
};

export const knowledgeFetchIDGet = (
  id: number,
  language: string = localStorage.getItem("i18n") || "zh-CN"
) => {
  return v2boardRequest({
    url: "/api/v1/user/knowledge/fetch",
    method: "get",
    params: {
      id,
      language,
    },
  });
};
