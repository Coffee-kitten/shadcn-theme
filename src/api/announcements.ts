import { v2boardRequest } from "@/utils/requests";

export const noticeFetchGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/notice/fetch",
    method: "get",
  });
};
