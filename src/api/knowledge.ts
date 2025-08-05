import { v2boardRequest } from "@/utils/requests";

export const knowledgeFetchGet = (language: string = "ja-JP") => {
  return v2boardRequest({
    url: "/api/v1/user/knowledge/fetch",
    method: "get",
    params: {
      language,
    },
  });
};

export const knowledgeFetchIDGet = (id: number, language: string = "ja-JP") => {
  return v2boardRequest({
    url: "/api/v1/user/knowledge/fetch",
    method: "get",
    params: {
      id,
      language,
    },
  });
};
