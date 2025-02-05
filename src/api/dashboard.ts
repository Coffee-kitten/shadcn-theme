import { v2boardRequest } from "@/utils/requests";

// 账户信息
export const infoGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/info",
    method: "get",
  });
};

// 订阅信息
export const subscribeGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/getSubscribe",
    method: "get",
  });
};

// 流量使用
export const trafficLogGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/stat/getTrafficLog",
    method: "get",
  });
};

// 节点信息
export const serverFetchGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/server/fetch",
    method: "get",
  });
};

export const resetSecurityGet = () => {
  return v2boardRequest({
    url: "/api/v1/user/resetSecurity",
    method: "get",
  });
};

export const orderSavePost = (
  period: string,
  plan_id: string,
  coupon_code?: string
) => {
  return v2boardRequest({
    url: "/api/v1/user/order/save",
    method: "post",
    data: {
      period: period,
      plan_id: plan_id,
      coupon_code: coupon_code,
    },
  });
};
