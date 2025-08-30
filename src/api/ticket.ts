import { v2boardRequest } from "@/utils/requests";

export const ticketSavePost = (data: {
  subject: string;
  level: number;
  message: string;
}) => {
  return v2boardRequest({
    url: "/api/v1/user/ticket/save",
    method: "post",
    data,
  });
};

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

export const ticketReplyPost = (id: number, message: string) => {
  return v2boardRequest({
    url: "/api/v1/user/ticket/reply",
    method: "post",
    data: {
      id,
      message,
    },
  });
};

export const ticketClosePost = (id: number) => {
  return v2boardRequest({
    url: "/api/v1/user/ticket/close",
    method: "post",
    data: {
      id,
    },
  });
};
