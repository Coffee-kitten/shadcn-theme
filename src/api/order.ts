import { v2boardRequest } from "@/utils/requests";

export const orderFetchGet = () => {
  return v2boardRequest({
    url: "api/v1/user/order/fetch",
    method: "get",
  });
};
