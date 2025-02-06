import { v2boardRequest } from "@/utils/requests";

export const knowledgeFetchGet = (i18: string) => {
  return v2boardRequest({
    url: "api/v1/user/knowledge/fetch?language=" + i18,
    method: "get",
  });
};

export const subscribeGet = () => {
  return v2boardRequest({
    url: "api/v1/user/getSubscribe",
    method: "get",
  });
};

export const knowledgeFetchIDGet = (id: string, i18: string) => {
  return v2boardRequest({
    url: "api/v1/user/knowledge/fetch?id=" + id + "&language=" + i18,
    method: "get",
  });
};
