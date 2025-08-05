import { v2boardRequest } from "@/utils/requests";

export const userNoticeFetchGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/notice/fetch",
    method: "get",
  });
};

export const userUpdatePost = (remind: any, update: number) => {
  return v2boardRequest({
    url: "/api/v1/user/update",
    method: "post",
    data: {
      [remind]: update,
    },
  });
};

export const changePasswordPost = (
  old_password: string,
  new_password: string
) => {
  return v2boardRequest({
    url: "/api/v1/user/changePassword",
    method: "post",
    data: {
      old_password,
      new_password,
    },
  });
};
