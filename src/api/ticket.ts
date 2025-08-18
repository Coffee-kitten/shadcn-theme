import { v2boardRequest } from "@/utils/requests";

export const ticketFetchGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/ticket/fetch",
    method: "get",
  });
};

export const ticketFetchIdGet = (id: number) => {
  return v2boardRequest({
    url: "/api/v1/user/ticket/fetch",
    method: "get",
    params: {
      id,
    },
  });
};
