import { v2boardRequest } from "@/utils/requests";

export const planFetchGet = () => {
  return v2boardRequest({
    url: "api/v1/user/plan/fetch",
    method: "get",
  });
};

export const orderSavePost = (
  period: string,
  plan_id: string,
  coupon_code?: string
) => {
  return v2boardRequest({
    url: "api/v1/user/order/save",
    method: "post",
    data: {
      period: period,
      plan_id: plan_id,
      coupon_code: coupon_code,
    },
  });
};

// 验证优惠券
export const couponCheckPost = (code: string, plan_id: string) => {
  return v2boardRequest({
    url: "api/v1/user/coupon/check",
    method: "post",
    data: {
      code: code,
      plan_id: plan_id,
    },
  });
};
