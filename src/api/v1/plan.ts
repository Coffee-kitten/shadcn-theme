import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";

export const planFetchGet = () => {
  const { data, error, isLoading } = useSWR<Record<string, any>>(
    `/api/v1/user/plan/fetch`,
    v2boardRequest
  );
  return { data, error, isLoading };
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
      period,
      plan_id,
      coupon_code,
    },
  });
};

// 验证优惠券
export const couponCheckPost = (code: string, plan_id: string) => {
  return v2boardRequest({
    url: "/api/v1/user/coupon/check",
    method: "post",
    data: {
      code,
      plan_id,
    },
  });
};
