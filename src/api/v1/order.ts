import useSWR from "swr";
import { v2boardRequest } from "@/utils/requests";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export const orderFetchGet = () => {
  const { data, error, isLoading, mutate } = useSWR<Record<string, any>>(
    `/api/v1/user/order/fetch`,
    v2boardRequest
  );
  return { data, error, isLoading, mutate };
};

export function useOrderSave() {
  const { t } = useTranslation();
  const saveOrder = async (
    period: string,
    plan_id: string,
    coupon_code?: string
  ) => {
    try {
      const result = await v2boardRequest({
        url: "/api/v1/user/order/save",
        method: "post",
        data: { period, plan_id, coupon_code },
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
  return { saveOrder };
}
export const useCouponCheckPost = () => {
  const { t } = useTranslation();
  const couponCheckPost = async (code: string, plan_id: string) => {
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
  return { couponCheckPost };
};
export const useOrderCancelPost = () => {
  const { t } = useTranslation();
  const orderCancelPost = async (trade_no: string) => {
    try {
      const result = await v2boardRequest({
        url: "/api/v1/user/order/cancel",
        method: "post",
        data: {
          trade_no,
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
  return { orderCancelPost };
};
