import { v2boardRequest } from "@/utils/requests";

export const serverFetchGet = (): Promise<any> => {
  return v2boardRequest({
    url: "/api/v1/user/server/fetch",
    method: "get",
  });
};
