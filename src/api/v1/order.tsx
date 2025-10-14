import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";
import { toast } from "@/components/ui/use-toast";
export const orderFetchGet = () => {
  const { data, error, isLoading, mutate } = useSWR<Record<string, any>>(
    `/api/v1/user/order/fetch`,
    v2boardRequest
  );
  return { data, error, isLoading, mutate };
};

export const orderSavePost = async (
  t: (key: string) => string,
  period: string,
  plan_id: string,
  coupon_code?: string
) => {
  try {
    const result = await v2boardRequest({
      url: "/api/v1/user/order/save",
      method: "post",
      data: {
        period,
        plan_id,
        coupon_code,
      },
    });
    return result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: t("请求失败"),
      description: error?.data.message,
    });
    return null;
  }
};
export const couponCheckPost = async (
  t: (key: string) => string,
  code: string,
  plan_id: string
) => {
  try {
    const result = await v2boardRequest({
      url: "/api/v1/user/coupon/check",
      method: "post",
      data: {
        code,
        plan_id,
      },
    });
    return result;
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: t("请求失败"),
      description: error?.data.message,
    });
    return null;
  }
};
