import { v2boardRequest } from "@/utils/requests";

export const planFetchGet = () => {
  return v2boardRequest({
    url: "api/v1/user/plan/fetch",
    method: "get",
  });
};
