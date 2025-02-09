import { v2boardRequest } from "@/utils/requests";

export const knowledgeFetchGet = () => {
  return v2boardRequest({
    url: "api/v1/user/knowledge/fetch?language=" + "ja-JP",
    method: "get",
  });
};

export const subscribeGet = () => {
  return v2boardRequest({
    url: "api/v1/user/getSubscribe",
    method: "get",
  });
};

export const knowledgeFetchIDGet = (id: number) => {
  return v2boardRequest({
    url: "api/v1/user/knowledge/fetch?id=" + id + "&language=" + "ja-JP",
    method: "get",
  });
};
