import { v2boardRequest } from "@/utils/requests";

// 邀请详情
export const inviteDetailsGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/invite/details",
    method: "get",
  });
};

// 邀请数据
export const inviteFetchGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/invite/fetch",
    method: "get",
  });
};

// 生成邀请码
export const inviteSaveGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/invite/save",
    method: "get",
  });
};

// 提现信息
export const commConfigGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/comm/config",
    method: "get",
  });
};

// 佣金划转
export const userTransferPost = (transfer_amount: number) => {
  return v2boardRequest({
    url: "/api/v1/user/transfer",
    method: "post",
    data: {
      transfer_amount,
    },
  });
};

// 申请提现
export const ticketWithdrawPost = (
  withdraw_method: string,
  withdraw_account: string
) => {
  return v2boardRequest({
    url: "/api/v1/user/ticket/withdraw",
    method: "post",
    data: {
      withdraw_method,
      withdraw_account,
    },
  });
};
